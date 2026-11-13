// Audio Controller & Speech Engine (Đa giọng đọc: Cô giáo Nữ, Thầy giáo Nam, Bé nhỏ, Robot)
// Tối ưu đặc biệt cho điện thoại di động (iPhone / Android) và máy tính

const VOICE_PROFILES = {
  female: {
    id: 'female',
    name: 'Cô giáo (Giọng Nữ)',
    icon: '👩',
    desc: 'Dịu dàng, trong trẻo, chuẩn bản xứ',
    pitch: 1.08,
    rateFactor: 1.0,
    preview: 'Hello! I am your teacher. Welcome to English one!',
    match: ['zira', 'samantha', 'jenny', 'aria', 'ava', 'victoria', 'karen', 'catherine', 'hazel', 'susan', 'female', 'woman', 'girl']
  },
  male: {
    id: 'male',
    name: 'Thầy giáo (Giọng Nam)',
    icon: '👨',
    desc: 'Trầm ấm, rõ ràng, dứt khoát',
    pitch: 0.88,
    rateFactor: 0.98,
    preview: 'Hello! I am your teacher. Let\'s practice speaking!',
    match: ['david', 'mark', 'george', 'guy', 'aaron', 'arthur', 'richard', 'daniel', 'oliver', 'male', 'man', 'boy', 'alex', 'fred']
  },
  kid: {
    id: 'kid',
    name: 'Bạn nhỏ (Giọng Bé)',
    icon: '🧒',
    desc: 'Nhí nhảnh, vui tươi, gần gũi với bé lớp 1',
    pitch: 1.40,
    rateFactor: 1.06,
    preview: 'Hi my friend! Learning English is super fun!',
    match: ['samantha', 'ava', 'jenny', 'female', 'girl']
  },
  robot: {
    id: 'robot',
    name: 'Bạn Robot (Ngộ nghĩnh)',
    icon: '🤖',
    desc: 'Hài hước, vui tai, tạo hứng thú cho bé',
    pitch: 0.58,
    rateFactor: 0.88,
    preview: 'Beep boop! Hello little student! Let\'s learn words!',
    match: ['david', 'alex', 'fred', 'male']
  }
};

class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  playCorrect() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.22, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.22);
      });
    } catch (e) {}
  }

  playTryAgain() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [440, 370];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);
        gain.gain.setValueAtTime(0.15, now + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.15 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.15);
        osc.stop(now + idx * 0.15 + 0.25);
      });
    } catch (e) {}
  }

  playFanfare() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const melody = [
        { f: 523.25, d: 0.12 },
        { f: 523.25, d: 0.12 },
        { f: 523.25, d: 0.12 },
        { f: 659.25, d: 0.25 },
        { f: 783.99, d: 0.2 },
        { f: 1046.5, d: 0.45 }
      ];
      let offset = 0;
      melody.forEach((note) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, now + offset);
        gain.gain.setValueAtTime(0.25, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + note.d + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + note.d + 0.05);
        offset += note.d + 0.04;
      });
    } catch (e) {}
  }

  playStar() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [659.25, 830.61, 987.77, 1318.5];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.2, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.3);
      });
    } catch (e) {}
  }
}

class SpeechController {
  constructor() {
    this.synth = window.speechSynthesis;
    this.currentAudio = null;
    this.voices = [];
    this.speaking = false;
    this.requestId = 0;

    // Giọng đọc lưu trong bộ nhớ trình duyệt
    this.voiceMode = localStorage.getItem('sgk1_voice_mode') || 'female'; // 'female', 'male', 'kid', 'robot'
    this.speechRate = parseFloat(localStorage.getItem('sgk1_voice_rate') || '0.85');

    this.initVoices();
    this.setupAudioUnlock();
  }

  setupAudioUnlock() {
    const unlock = () => {
      if (this.synth) {
        try { this.synth.resume(); } catch (e) {}
      }
      if (window.soundFx) {
        window.soundFx.init();
      }
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('click', unlock);
    };
    window.addEventListener('touchstart', unlock, { passive: true });
    window.addEventListener('click', unlock, { passive: true });
  }

  initVoices() {
    if (!this.synth) return;
    const loadVoices = () => {
      try {
        const vList = this.synth.getVoices() || [];
        if (vList.length > 0) {
          this.voices = vList;
        }
      } catch (e) {}
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  getVoiceForProfile(profileId) {
    const profile = VOICE_PROFILES[profileId] || VOICE_PROFILES.female;
    if (!this.voices || this.voices.length === 0) return null;

    const enVoices = this.voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
    const pool = enVoices.length > 0 ? enVoices : this.voices;

    // 1. Tìm theo từ khóa nhận diện giọng
    for (const kw of profile.match) {
      const match = pool.find(v => v.name.toLowerCase().includes(kw));
      if (match) return match;
    }

    // 2. Dự phòng thông minh cho giọng Nam
    if (profileId === 'male') {
      const nonFemale = pool.find(v => !VOICE_PROFILES.female.match.some(f => v.name.toLowerCase().includes(f)));
      if (nonFemale) return nonFemale;
    }

    return pool[0] || null;
  }

  setVoiceMode(mode, playPreview = true) {
    if (!VOICE_PROFILES[mode]) return;
    this.voiceMode = mode;
    localStorage.setItem('sgk1_voice_mode', mode);

    if (window.app && window.app.updateVoiceUI) {
      window.app.updateVoiceUI();
    }

    if (playPreview) {
      const profile = VOICE_PROFILES[mode];
      this.speak(profile.preview);
    }
  }

  setSpeechRate(rate) {
    this.speechRate = parseFloat(rate);
    localStorage.setItem('sgk1_voice_rate', this.speechRate.toString());
  }

  getCurrentProfile() {
    return VOICE_PROFILES[this.voiceMode] || VOICE_PROFILES.female;
  }

  stop() {
    this.requestId++;
    this.stopPlayback();
    this.speaking = false;
    this.hideSpeakingVisual();
  }

  stopPlayback() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.src = "";
        this.currentAudio.onended = null;
        this.currentAudio.onerror = null;
        this.currentAudio.onplay = null;
      } catch (e) {}
      this.currentAudio = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
        if (this.synth.resume) this.synth.resume();
      } catch (e) {}
    }
  }

  speak(text, onEndCallback = null, customRate = null) {
    const cleanText = (text || '').trim();
    if (!cleanText) {
      if (onEndCallback) onEndCallback();
      return;
    }

    const reqId = ++this.requestId;
    this.stopPlayback();

    this.speaking = true;
    this.showSpeakingVisual(cleanText);

    // Ưu tiên Web Speech API nội bộ của máy/điện thoại (0ms delay)
    if (this.synth && 'SpeechSynthesisUtterance' in window) {
      const isOk = this.speakBrowser(cleanText, reqId, onEndCallback, customRate);
      if (isOk) return;
    }

    // Dự phòng trực tuyến
    this.playOnlineTTS(cleanText, reqId, onEndCallback, customRate);
  }

  speakBrowser(text, reqId, onEndCallback, customRate = null) {
    try {
      this.synth.cancel();
      if (this.synth.resume) this.synth.resume();

      const profile = this.getCurrentProfile();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';

      const voice = this.getVoiceForProfile(this.voiceMode);
      if (voice) {
        utterance.voice = voice;
      }

      // Áp dụng cao độ & tốc độ theo giọng đọc đang chọn
      utterance.pitch = profile.pitch;
      const baseRate = customRate !== null ? customRate : this.speechRate;
      utterance.rate = baseRate * profile.rateFactor;

      window._activeUtterance = utterance;

      let started = false;

      utterance.onstart = () => {
        if (reqId !== this.requestId) {
          try { this.synth.cancel(); } catch (e) {}
          return;
        }
        started = true;
        this.speaking = true;
      };

      utterance.onend = () => {
        if (reqId !== this.requestId) return;
        this.speaking = false;
        window._activeUtterance = null;
        this.hideSpeakingVisual();
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        if (reqId !== this.requestId) return;
        if (!started) {
          this.playOnlineTTS(text, reqId, onEndCallback, customRate);
        } else {
          this.speaking = false;
          window._activeUtterance = null;
          this.hideSpeakingVisual();
          if (onEndCallback) onEndCallback();
        }
      };

      this.synth.speak(utterance);
      return true;
    } catch (e) {
      return false;
    }
  }

  playOnlineTTS(text, reqId, onEndCallback, customRate = null) {
    if (reqId !== this.requestId) return;

    try {
      const encoded = encodeURIComponent(text);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encoded}`;

      const audio = new Audio();
      this.currentAudio = audio;
      audio.crossOrigin = "anonymous";
      
      const profile = this.getCurrentProfile();
      const baseRate = customRate !== null ? customRate : this.speechRate;
      audio.playbackRate = Math.max(0.75, Math.min(1.2, baseRate * profile.rateFactor));

      audio.onended = () => {
        if (reqId !== this.requestId) return;
        this.currentAudio = null;
        this.speaking = false;
        this.hideSpeakingVisual();
        if (onEndCallback) onEndCallback();
      };

      audio.onerror = () => {
        if (reqId !== this.requestId) return;
        this.currentAudio = null;
        this.speaking = false;
        this.hideSpeakingVisual();
        if (onEndCallback) onEndCallback();
      };

      audio.src = url;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (reqId !== this.requestId) return;
          this.currentAudio = null;
          this.speaking = false;
          this.hideSpeakingVisual();
        });
      }
    } catch (err) {
      this.speaking = false;
      this.hideSpeakingVisual();
    }
  }

  speakPhonics(letter) {
    const phonicsMap = {
      'Bb': 'b, ball',
      'Cc': 'c, cake',
      'Aa': 'a, apple',
      'Dd': 'd, dog',
      'Ii': 'i, fish',
      'Ee': 'e, pen',
      'Gg': 'g, goat',
      'Hh': 'h, horse',
      'Oo': 'o, clocks',
      'Mm': 'm, monkey',
      'Uu': 'u, sun',
      'Ll': 'l, lemons',
      'Nn': 'n, noodles',
      'Tt': 't, tiger',
      'Ff': 'f, football',
      'Ww': 'w, window'
    };
    const text = phonicsMap[letter] || letter;
    this.speak(text);
  }

  showSpeakingVisual(text) {
    document.body.classList.add('is-speaking');
    const badge = document.getElementById('audio-indicator-badge');
    if (badge) {
      badge.classList.remove('hidden');
      const txt = badge.querySelector('#audio-indicator-text');
      if (txt) {
        const profile = this.getCurrentProfile();
        txt.textContent = `${profile.icon} Đang đọc: "${text}"`;
      }
    }
  }

  hideSpeakingVisual() {
    document.body.classList.remove('is-speaking');
    const badge = document.getElementById('audio-indicator-badge');
    if (badge) {
      badge.classList.add('hidden');
    }
  }
}

window.VOICE_PROFILES = VOICE_PROFILES;
window.soundFx = new SoundEffects();
window.speech = new SpeechController();
