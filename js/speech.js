// Speech Recognition & Speaking Practice Controller

class VoiceRecognizer {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.targetText = "";
    this.onResultCallback = null;
    this.onErrorCallback = null;
    this.init();
  }

  init() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 3;

      this.recognition.onstart = () => {
        this.isListening = true;
        if (this.onStartCallback) this.onStartCallback();
      };

      this.recognition.onresult = (event) => {
        this.isListening = false;
        let transcript = "";
        const results = [];
        for (let i = 0; i < event.results[0].length; i++) {
          results.push(event.results[0][i].transcript.toLowerCase().trim());
        }
        transcript = results[0] || "";
        this.evaluateSpeech(transcript, results);
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        console.warn("Speech recognition error:", event.error);
        if (this.onErrorCallback) {
          this.onErrorCallback(event.error);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.onEndCallback) this.onEndCallback();
      };
    }
  }

  isSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  startListening(targetText, onStart, onResult, onError, onEnd) {
    this.targetText = targetText.toLowerCase().trim();
    this.onStartCallback = onStart;
    this.onResultCallback = onResult;
    this.onErrorCallback = onError;
    this.onEndCallback = onEnd;

    if (!this.recognition) {
      if (onError) onError("NOT_SUPPORTED");
      return;
    }

    try {
      if (this.isListening) {
        this.recognition.stop();
      }
      this.recognition.start();
    } catch (e) {
      console.warn("Speech recognition start failed:", e);
      if (onError) onError(e.message);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // So sánh giọng bé với từ mẫu (cho phép học sinh lớp 1 phát âm gần đúng)
  evaluateSpeech(spoken, alternatives = []) {
    const cleanTarget = this.targetText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim().toLowerCase();
    
    // Kiểm tra trực tiếp
    const isMatch = alternatives.some(alt => {
      const cleanAlt = alt.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim().toLowerCase();
      return cleanAlt.includes(cleanTarget) || cleanTarget.includes(cleanAlt);
    });

    // Tính độ tương đồng đơn giản
    let stars = 0;
    let message = "";
    if (isMatch) {
      stars = 3;
      message = "Tuyệt vời! Bé phát âm rất chuẩn! 🌟🌟🌟";
    } else {
      // Kiểm tra âm đầu hoặc chữ cái
      const firstTargetChar = cleanTarget.charAt(0);
      const matchedFirstChar = alternatives.some(alt => alt.startsWith(firstTargetChar));
      if (matchedFirstChar) {
        stars = 2;
        message = "Rất tốt! Bé phát âm gần đúng rồi, thử lại nhé! 🌟🌟";
      } else {
        stars = 1;
        message = "Bé cố lên nào! Hãy nghe lại và đọc to rõ ràng nhé! 🌟";
      }
    }

    if (this.onResultCallback) {
      this.onResultCallback({
        spoken: spoken,
        target: this.targetText,
        isSuccess: stars >= 2,
        stars: stars,
        message: message
      });
    }
  }
}

window.voiceRecognizer = new VoiceRecognizer();
