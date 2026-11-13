// Main Application Logic for Tiếng Anh 1 - Global Success

class App {
  constructor() {
    this.currentUnitId = 1;
    this.currentTab = 'read';
    this.stars = parseInt(localStorage.getItem('sgk1_stars') || '15', 10);
    this.canvasInstance = null;
    this.currentQuizIndex = 0;
    this.quizScore = 0;
    this.currentTraceItem = 'B';
    this.isChantPlaying = false;
    this.chantTimer = null;
    this.bookViewerPageIndex = 6; // Bắt đầu ở trang 7 (Unit 1 Lesson 1)
    this.currentSpeakingTarget = "";

    this.init();
  }

  init() {
    this.renderHeader();
    this.renderUnitNav();
    this.setupEventListeners();
    this.switchTab('read');
    this.updateStarsDisplay();
    this.updateVoiceUI();
  }

  openVoiceModal() {
    if (window.soundFx) window.soundFx.playPop();
    const modal = document.getElementById('voice-modal');
    if (modal) {
      modal.classList.remove('hidden');
      this.updateVoiceUI();
    }
  }

  closeVoiceModal() {
    if (window.soundFx) window.soundFx.playPop();
    const modal = document.getElementById('voice-modal');
    if (modal) modal.classList.add('hidden');
  }

  selectVoice(mode) {
    if (window.soundFx) window.soundFx.playPop();
    window.speech.setVoiceMode(mode, true);
    this.updateVoiceUI();
  }

  selectSpeed(rate) {
    if (window.soundFx) window.soundFx.playPop();
    window.speech.setSpeechRate(rate);
    this.updateVoiceUI();
    window.speech.speak(`Speed: ${rate === 0.75 ? 'slow' : (rate === 1.0 ? 'normal' : 'medium')}`);
  }

  updateVoiceUI() {
    const curMode = window.speech.voiceMode;
    const curRate = window.speech.speechRate;
    const profile = window.speech.getCurrentProfile();

    // Update Header button
    const hIcon = document.getElementById('header-voice-icon');
    const hLabel = document.getElementById('header-voice-label');
    if (hIcon) hIcon.textContent = profile.icon;
    if (hLabel) {
      if (curMode === 'female') hLabel.textContent = 'Cô giáo (Nữ)';
      else if (curMode === 'male') hLabel.textContent = 'Thầy giáo (Nam)';
      else if (curMode === 'kid') hLabel.textContent = 'Bạn nhỏ (Bé)';
      else hLabel.textContent = 'Robot';
    }

    // Update Modal Cards
    document.querySelectorAll('.voice-opt-btn').forEach(btn => {
      const v = btn.dataset.voice;
      const checkBadge = btn.querySelector('.voice-check-badge');
      if (v === curMode) {
        btn.classList.add('border-purple-600', 'bg-purple-50', 'shadow-md');
        btn.classList.remove('border-gray-200', 'bg-white');
        if (checkBadge) checkBadge.classList.remove('hidden');
      } else {
        btn.classList.remove('border-purple-600', 'bg-purple-50', 'shadow-md');
        btn.classList.add('border-gray-200', 'bg-white');
        if (checkBadge) checkBadge.classList.add('hidden');
      }
    });

    // Update Speed Buttons
    document.querySelectorAll('.speed-opt-btn').forEach(btn => {
      const s = parseFloat(btn.dataset.speed);
      if (Math.abs(s - curRate) < 0.05) {
        btn.classList.add('bg-purple-600', 'text-white', 'border-purple-600', 'shadow-sm');
        btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
      } else {
        btn.classList.remove('bg-purple-600', 'text-white', 'border-purple-600', 'shadow-sm');
        btn.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
      }
    });

    const speedLabel = document.getElementById('speed-label');
    if (speedLabel) {
      if (curRate <= 0.75) speedLabel.textContent = 'Chậm rãi (0.75x)';
      else if (curRate >= 1.0) speedLabel.textContent = 'Chuẩn tốc (1.0x)';
      else speedLabel.textContent = 'Vừa phải (0.85x)';
    }
  }

  testAudio() {
    window.soundFx.playPop();
    window.soundFx.playCorrect();
    window.speech.speak("Hello! Ball, bike, book. Tiếng Anh lớp một!", () => {
      this.updateStars(1);
    });
  }

  openMobileModal() {
    window.soundFx.playPop();
    const modal = document.getElementById('mobile-qr-modal');
    if (modal) {
      modal.classList.remove('hidden');
      const host = window.location.hostname;
      const targetUrl = (host && host !== 'localhost' && host !== '127.0.0.1')
        ? `${window.location.protocol}//${window.location.host}/`
        : `http://192.168.1.13:8085/`;
      
      const linkEl = document.getElementById('mobile-target-url');
      const qrEl = document.getElementById('mobile-qr-img');
      if (linkEl) linkEl.textContent = targetUrl;
      if (qrEl) qrEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(targetUrl)}`;
    }
  }

  closeMobileModal() {
    window.soundFx.playPop();
    const modal = document.getElementById('mobile-qr-modal');
    if (modal) modal.classList.add('hidden');
  }

  copyMobileLink() {
    const linkEl = document.getElementById('mobile-target-url');
    if (linkEl) {
      const text = linkEl.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        window.soundFx.playCorrect();
        alert("Đã sao chép đường link: " + text);
      }).catch(() => {
        alert("Đường link: " + text);
      });
    }
  }

  getCurrentUnit() {
    return UNITS_DATA.find(u => u.id === this.currentUnitId) || UNITS_DATA[0];
  }

  updateStars(amount = 1) {
    this.stars += amount;
    localStorage.setItem('sgk1_stars', this.stars.toString());
    this.updateStarsDisplay();
    window.soundFx.playStar();
    this.launchConfetti();
  }

  updateStarsDisplay() {
    const starEl = document.getElementById('star-count');
    if (starEl) {
      starEl.textContent = this.stars;
    }
  }

  launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    for (let i = 0; i < 60; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height * 0.5,
        w: Math.random() * 12 + 6,
        h: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 3,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 8
      });
    }

    let frames = 0;
    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frames++;
      if (frames < 90) {
        requestAnimationFrame(anim);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    anim();
  }

  renderHeader() {
    const unit = this.getCurrentUnit();
    const titleEl = document.getElementById('header-unit-title');
    const titleViEl = document.getElementById('header-unit-subtitle');
    if (titleEl) titleEl.textContent = unit.title;
    if (titleViEl) titleViEl.textContent = unit.titleVi;
  }

  renderUnitNav() {
    const container = document.getElementById('unit-list-container');
    if (!container) return;

    let html = '';
    // Học kỳ 1
    html += `<div class="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider bg-amber-50 rounded-lg mb-2">Học Kỳ 1 (Unit 1 - 8)</div>`;
    UNITS_DATA.filter(u => u.semester === 1).forEach(u => {
      const active = u.id === this.currentUnitId;
      html += `
        <button onclick="app.selectUnit(${u.id})" class="w-full text-left px-3 py-2.5 rounded-xl mb-1.5 flex items-center justify-between transition-all ${active ? 'bg-orange-500 text-white font-bold shadow-md scale-[1.02]' : 'hover:bg-orange-100 text-gray-700 font-medium'}">
          <div class="flex items-center gap-2.5 truncate">
            <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${active ? 'bg-white text-orange-600' : 'bg-orange-200 text-orange-800'}">${u.id}</span>
            <span class="truncate text-sm">${u.title}</span>
          </div>
          <span class="text-xs px-2 py-0.5 rounded-full ${active ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600'}">${u.phonics.letter}</span>
        </button>
      `;
    });

    // Học kỳ 2
    html += `<div class="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider bg-blue-50 rounded-lg mt-4 mb-2">Học Kỳ 2 (Unit 9 - 16)</div>`;
    UNITS_DATA.filter(u => u.semester === 2).forEach(u => {
      const active = u.id === this.currentUnitId;
      html += `
        <button onclick="app.selectUnit(${u.id})" class="w-full text-left px-3 py-2.5 rounded-xl mb-1.5 flex items-center justify-between transition-all ${active ? 'bg-blue-600 text-white font-bold shadow-md scale-[1.02]' : 'hover:bg-blue-100 text-gray-700 font-medium'}">
          <div class="flex items-center gap-2.5 truncate">
            <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${active ? 'bg-white text-blue-700' : 'bg-blue-200 text-blue-800'}">${u.id}</span>
            <span class="truncate text-sm">${u.title}</span>
          </div>
          <span class="text-xs px-2 py-0.5 rounded-full ${active ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600'}">${u.phonics.letter}</span>
        </button>
      `;
    });

    // Phần ôn tập
    html += `<div class="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider bg-purple-50 rounded-lg mt-4 mb-2">Ôn tập & Trò chơi</div>`;
    EXTRA_SECTIONS.forEach(ext => {
      html += `
        <button onclick="app.openBookAtPage(${ext.pageIndices[0]})" class="w-full text-left px-3 py-2 rounded-xl mb-1 flex items-center justify-between text-xs text-purple-700 hover:bg-purple-100 font-medium">
          <span>${ext.title} (${ext.titleVi})</span>
          <span class="text-[10px] bg-purple-200 px-1.5 py-0.5 rounded">Trang ${ext.pages[0]}</span>
        </button>
      `;
    });

    container.innerHTML = html;
  }

  selectUnit(unitId) {
    this.currentUnitId = unitId;
    window.soundFx.playPop();
    this.renderHeader();
    this.renderUnitNav();
    this.currentQuizIndex = 0;
    this.quizScore = 0;
    
    // Đặt trang sách tương ứng với Unit
    const unit = this.getCurrentUnit();
    this.bookViewerPageIndex = unit.pageIndices[0];

    // Cập nhật tab hiện tại
    this.refreshCurrentTab();

    // Đóng drawer trên màn hình điện thoại nếu mở
    const sidebar = document.getElementById('sidebar');
    if (sidebar && !sidebar.classList.contains('hidden') && window.innerWidth < 1024) {
      this.toggleSidebar();
    }
  }

  prevUnit() {
    if (this.currentUnitId > 1) {
      this.selectUnit(this.currentUnitId - 1);
    }
  }

  nextUnit() {
    if (this.currentUnitId < UNITS_DATA.length) {
      this.selectUnit(this.currentUnitId + 1);
    }
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    window.soundFx.playPop();

    // Cập nhật giao diện tab bar
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const isCurrent = btn.dataset.tab === tabName;
      if (isCurrent) {
        btn.classList.add('bg-white', 'text-orange-600', 'shadow-sm', 'font-bold');
        btn.classList.remove('text-gray-600', 'hover:bg-white/60');
      } else {
        btn.classList.remove('bg-white', 'text-orange-600', 'shadow-sm', 'font-bold');
        btn.classList.add('text-gray-600', 'hover:bg-white/60');
      }
    });

    this.refreshCurrentTab();
  }

  refreshCurrentTab() {
    const mainContent = document.getElementById('main-tab-content');
    if (!mainContent) return;

    if (this.currentTab === 'read') {
      this.renderReadTab(mainContent);
    } else if (this.currentTab === 'listen') {
      this.renderListenTab(mainContent);
    } else if (this.currentTab === 'speak') {
      this.renderSpeakTab(mainContent);
    } else if (this.currentTab === 'write') {
      this.renderWriteTab(mainContent);
    } else if (this.currentTab === 'game') {
      this.renderGameTab(mainContent);
    } else if (this.currentTab === 'book') {
      this.renderBookTab(mainContent);
    }
  }

  // TAB 1: ĐỌC & TỪ VỰNG (Phonics & Vocabulary Flashcards)
  renderReadTab(container) {
    const unit = this.getCurrentUnit();
    let html = `
      <div class="space-y-6">
        <!-- Banner Ngữ âm Phonics (Lesson 1) -->
        <div class="bg-gradient-to-r ${unit.bgGradient} rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-5">
              <button onclick="window.speech.speakPhonics('${unit.phonics.letter}')" class="btn-bounce w-20 h-20 bg-white text-orange-600 rounded-2xl flex flex-col items-center justify-center shadow-lg font-black text-3xl hover:scale-105">
                <span>${unit.phonics.letter}</span>
                <span class="text-xs text-orange-500 font-semibold">${unit.phonics.sound}</span>
              </button>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">Ngữ âm trọng tâm</span>
                  <span class="text-sm font-semibold opacity-90">Lesson 1 - Hoạt động 1</span>
                </div>
                <h2 class="text-2xl font-black">Chữ cái và Âm: ${unit.phonics.letter}</h2>
                <p class="text-sm opacity-90 mt-1 max-w-xl">${unit.phonics.guide}</p>
              </div>
            </div>
            <button onclick="window.speech.speakPhonics('${unit.phonics.letter}')" class="btn-bounce bg-white/25 hover:bg-white/40 text-white font-bold px-5 py-3 rounded-2xl flex items-center gap-2 text-sm shadow">
              <span>🔊 Nghe phát âm mẫu</span>
            </button>
          </div>
        </div>

        <!-- Danh sách Thẻ Từ vựng (Vocabulary Cards) -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-xl font-black text-gray-800">Từ vựng trọng tâm trong bài</h3>
              <p class="text-xs text-gray-500">Chạm vào thẻ để nghe phát âm và lật xem nghĩa tiếng Việt</p>
            </div>
            <button onclick="app.speakAllWords()" class="btn-bounce bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5">
              <span>📢 Đọc tất cả từ</span>
            </button>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    `;

    unit.vocabulary.forEach((v, idx) => {
      html += `
        <div class="vocab-card-box perspective-1000 h-64 select-none" data-word="${v.word}">
          <div class="card-inner shadow-md hover:shadow-xl rounded-3xl border-2 border-orange-100 transition-all">
            <!-- Mặt trước: Chạm bất kỳ đâu để nghe phát âm ngay lập tức -->
            <div class="card-front bg-white p-4 flex flex-col items-center justify-between cursor-pointer" onclick="app.speakWord('${v.word}', this)">
              <div class="w-full flex justify-between items-center text-xs text-gray-400">
                <span class="bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full">#${idx + 1}</span>
                <button type="button" onclick="event.stopPropagation(); app.flipCard(this);" class="text-orange-600 font-black text-[11px] bg-orange-100/90 hover:bg-orange-200 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <span>Nghĩa TV</span> <span>↻</span>
                </button>
              </div>
              <div class="text-6xl my-2 filter drop-shadow-sm transition-transform hover:scale-110 active:scale-95">${v.icon}</div>
              <div class="text-center">
                <h4 class="text-2xl font-black text-gray-800">${v.word}</h4>
                <p class="text-xs text-gray-400 font-mono">${v.ipa}</p>
              </div>
              <div class="btn-bounce w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm">
                <span>🔊 Bấm nghe: "${v.word}"</span>
              </div>
            </div>
            <!-- Mặt sau: Nghĩa tiếng Việt và ví dụ, nút lật lại -->
            <div class="card-back bg-gradient-to-br from-amber-50 to-orange-100 p-5 flex flex-col items-center justify-between text-center border-2 border-orange-300">
              <div class="w-full flex justify-between items-center">
                <span class="text-xs text-orange-700 font-bold uppercase tracking-wide">Nghĩa tiếng Việt</span>
                <button type="button" onclick="event.stopPropagation(); app.flipCard(this);" class="text-xs bg-white text-orange-700 font-bold px-2.5 py-0.5 rounded-full border border-orange-200">
                  Quay lại ↻
                </button>
              </div>
              <div>
                <div class="text-4xl mb-1">${v.icon}</div>
                <h4 class="text-xl font-black text-orange-950">${v.vi}</h4>
                <p class="text-xs text-gray-600 mt-1.5 italic bg-white/80 px-3 py-1.5 rounded-lg border border-orange-100">"${v.example}"</p>
              </div>
              <div class="w-full grid grid-cols-2 gap-2">
                <button type="button" onclick="event.stopPropagation(); app.speakWord('${v.word}', this);" class="btn-bounce bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded-xl text-xs flex items-center justify-center gap-1 shadow-sm">
                  <span>🔊 Nghe</span>
                </button>
                <button type="button" onclick="event.stopPropagation(); app.startSpeakingPractice('${v.word}');" class="btn-bounce bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-2 rounded-xl text-xs flex items-center justify-center gap-1 shadow-sm">
                  <span>🎤 Tập nói</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    html += `
          </div>
        </div>

        <!-- Mẫu câu giao tiếp (Sentence Patterns - Lesson 3) -->
        <div class="bg-white rounded-3xl p-6 shadow-md border-2 border-orange-100">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">💬</span>
            <div>
              <h3 class="text-lg font-black text-gray-800">Mẫu câu giao tiếp (Sentence Patterns)</h3>
              <p class="text-xs text-gray-500">Lesson 3 - Hoạt động 6 & 7: Nghe và lặp lại mẫu câu</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    `;

    unit.sentences.forEach(s => {
      html += `
        <div class="p-4 rounded-2xl bg-orange-50/70 border border-orange-100 flex items-center justify-between hover:bg-orange-100/70 transition-all">
          <div>
            <p class="text-base font-black text-gray-800">${s.en}</p>
            <p class="text-xs text-gray-600 mt-0.5">${s.vi}</p>
          </div>
          <button onclick="window.speech.speak('${s.en}'); window.soundFx.playPop();" class="btn-bounce w-10 h-10 rounded-xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-sm">
            <span>🔊</span>
          </button>
        </div>
      `;
    });

    html += `
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  speakWord(word, el) {
    if (window.soundFx) window.soundFx.playPop();
    window.speech.speak(word);

    // Hiệu ứng nhấp nháy phát sáng thẻ đang phát âm
    const cardBox = el ? (el.closest ? el.closest('.vocab-card-box') : null) : null;
    if (cardBox) {
      document.querySelectorAll('.vocab-card-box').forEach(c => c.classList.remove('speaking-card-active'));
      cardBox.classList.add('speaking-card-active');
      setTimeout(() => {
        cardBox.classList.remove('speaking-card-active');
      }, 500);
    }
  }

  flipCard(target) {
    if (!target) return;
    const cardBox = target.closest ? target.closest('.vocab-card-box') : target;
    const inner = cardBox ? cardBox.querySelector('.card-inner') : null;
    if (inner) {
      inner.classList.toggle('flipped');
      if (window.soundFx) window.soundFx.playPop();
    }
  }

  startSpeakingPractice(word) {
    this.currentSpeakingTarget = word;
    this.switchTab('speak');
    setTimeout(() => {
      window.speech.speak(word);
    }, 250);
  }

  speakAllWords() {
    const unit = this.getCurrentUnit();
    const words = unit.vocabulary.map(v => v.word);
    let i = 0;
    const speakNext = () => {
      if (i < words.length) {
        window.speech.speak(words[i], () => {
          i++;
          setTimeout(speakNext, 400);
        });
      }
    };
    speakNext();
  }

  // TAB 2: NGHE (Listening, Chant & Listen & Tick Quiz)
  renderListenTab(container) {
    const unit = this.getCurrentUnit();
    let html = `
      <div class="space-y-6">
        <!-- Bài Vè Tiếng Anh (Chant - Lesson 2 Activity 3) -->
        <div class="bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl p-6 text-white shadow-lg">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div class="flex items-center gap-3">
              <span class="w-12 h-12 rounded-2xl bg-white/20 text-2xl flex items-center justify-center">🎶</span>
              <div>
                <div class="text-xs font-bold uppercase tracking-wider text-amber-100">Lesson 2 - Hoạt động 3</div>
                <h3 class="text-2xl font-black">${unit.chant.title}</h3>
              </div>
            </div>
            <button onclick="app.playChantKaraoke()" id="chant-play-btn" class="btn-bounce bg-white text-orange-600 hover:bg-amber-50 font-black px-6 py-3 rounded-2xl flex items-center gap-2 shadow-md">
              <span id="chant-btn-icon">▶️</span>
              <span id="chant-btn-text">Bật đọc nhịp điệu (Chant)</span>
            </button>
          </div>

          <!-- Lời bài Chant có highlight từng dòng -->
          <div class="bg-white text-gray-800 rounded-2xl p-5 shadow-inner space-y-2" id="chant-lines-box">
    `;

    unit.chant.lines.forEach((line, idx) => {
      html += `
        <div id="chant-line-${idx}" class="p-3 rounded-xl transition-all flex items-center justify-between hover:bg-orange-50 cursor-pointer" onclick="window.speech.speak('${line}')">
          <span class="text-lg font-bold text-gray-800">${line}</span>
          <button class="text-orange-500 text-sm hover:scale-110">🔊</button>
        </div>
      `;
    });

    html += `
          </div>
        </div>

        <!-- Bài tập Nghe và Chọn (Listen and Tick - Lesson 2 Activity 4) -->
        <div class="bg-white rounded-3xl p-6 shadow-md border-2 border-orange-100">
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">✅</span>
              <div>
                <div class="text-xs font-bold text-emerald-600 uppercase">Lesson 2 - Hoạt động 4</div>
                <h3 class="text-xl font-black text-gray-800">Listen and Tick (Nghe và chọn hình đúng)</h3>
              </div>
            </div>
            <div class="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              Câu hỏi ${this.currentQuizIndex + 1} / ${unit.quizzes.length}
            </div>
          </div>
    `;

    const quiz = unit.quizzes[this.currentQuizIndex] || unit.quizzes[0];
    html += `
          <div class="text-center py-2">
            <p class="text-sm text-gray-600 mb-3">${quiz.question}</p>
            <button onclick="window.speech.speak('${quiz.audioText}'); window.soundFx.playPop();" class="btn-bounce bg-orange-500 hover:bg-orange-600 text-white font-black px-6 py-3 rounded-2xl inline-flex items-center gap-2 shadow-md mb-6">
              <span class="text-xl">🔊</span>
              <span>Bấm để nghe âm thanh gợi ý</span>
            </button>

            <!-- 2 Lựa chọn a và b -->
            <div class="grid grid-cols-2 gap-6 max-w-md mx-auto">
    `;

    quiz.options.forEach(opt => {
      html += `
        <button onclick="app.submitQuizAnswer('${opt.id}')" class="btn-bounce bg-gradient-to-b from-gray-50 to-white hover:border-orange-500 border-4 border-gray-200 rounded-3xl p-5 flex flex-col items-center justify-center shadow-sm hover:shadow-lg transition-all group">
          <span class="text-xs font-black uppercase text-gray-400 group-hover:text-orange-500 mb-2">Đáp án (${opt.id.toUpperCase()})</span>
          <span class="text-6xl my-2 group-hover:scale-110 transition-transform">${opt.icon}</span>
          <span class="text-base font-bold text-gray-700 group-hover:text-orange-600 mt-2">${opt.text}</span>
        </button>
      `;
    });

    html += `
            </div>
            <div id="quiz-feedback" class="mt-4 min-h-[30px] font-bold text-sm"></div>
          </div>
        </div>

        <!-- Bài hát vui nhộn (Let's Sing - Lesson 3 Activity 8) -->
        <div class="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <span class="w-12 h-12 rounded-2xl bg-white/20 text-2xl flex items-center justify-center">🎤</span>
              <div>
                <div class="text-xs font-bold uppercase tracking-wider text-purple-200">Lesson 3 - Hoạt động 8</div>
                <h3 class="text-2xl font-black">${unit.song.title}</h3>
              </div>
            </div>
            <button onclick="app.playSongKaraoke()" class="btn-bounce bg-white text-purple-700 hover:bg-purple-50 font-black px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow text-sm">
              <span>🎵 Hát theo mẫu</span>
            </button>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-5 space-y-2 border border-white/20">
    `;

    unit.song.lines.forEach((line, idx) => {
      html += `
        <div class="p-2 rounded-lg font-bold text-lg text-purple-50 flex items-center justify-between hover:bg-white/10 cursor-pointer" onclick="window.speech.speak('${line}')">
          <span>${line}</span>
          <span class="text-sm opacity-70">🔊</span>
        </div>
      `;
    });

    html += `
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  playChantKaraoke() {
    const unit = this.getCurrentUnit();
    const lines = unit.chant.lines;
    const btnText = document.getElementById('chant-btn-text');
    const btnIcon = document.getElementById('chant-btn-icon');

    if (this.isChantPlaying) {
      this.isChantPlaying = false;
      window.speech.stop();
      if (btnText) btnText.textContent = "Bật đọc nhịp điệu (Chant)";
      if (btnIcon) btnIcon.textContent = "▶️";
      document.querySelectorAll('#chant-lines-box > div').forEach(el => el.classList.remove('chant-active-line'));
      return;
    }

    this.isChantPlaying = true;
    if (btnText) btnText.textContent = "Dừng đọc";
    if (btnIcon) btnIcon.textContent = "⏹️";

    let idx = 0;
    const playLine = () => {
      if (!this.isChantPlaying || idx >= lines.length) {
        this.isChantPlaying = false;
        if (btnText) btnText.textContent = "Bật đọc nhịp điệu (Chant)";
        if (btnIcon) btnIcon.textContent = "▶️";
        document.querySelectorAll('#chant-lines-box > div').forEach(el => el.classList.remove('chant-active-line'));
        window.soundFx.playCorrect();
        this.updateStars(1);
        return;
      }

      document.querySelectorAll('#chant-lines-box > div').forEach(el => el.classList.remove('chant-active-line'));
      const activeEl = document.getElementById(`chant-line-${idx}`);
      if (activeEl) activeEl.classList.add('chant-active-line');

      window.speech.speak(lines[idx], () => {
        idx++;
        setTimeout(playLine, 500);
      }, 0.85);
    };

    playLine();
  }

  playSongKaraoke() {
    const unit = this.getCurrentUnit();
    const lines = unit.song.lines;
    let idx = 0;
    const playNext = () => {
      if (idx < lines.length) {
        window.speech.speak(lines[idx], () => {
          idx++;
          setTimeout(playNext, 400);
        }, 0.88);
      } else {
        window.soundFx.playCorrect();
        this.updateStars(1);
      }
    };
    playNext();
  }

  submitQuizAnswer(selectedId) {
    const unit = this.getCurrentUnit();
    const quiz = unit.quizzes[this.currentQuizIndex] || unit.quizzes[0];
    const fbEl = document.getElementById('quiz-feedback');

    if (selectedId === quiz.answer) {
      window.soundFx.playCorrect();
      this.updateStars(2);
      if (fbEl) {
        fbEl.innerHTML = `<span class="text-emerald-600 font-black text-lg">🎉 Hoan hô! Bé chọn rất chính xác! (+2 ⭐)</span>`;
      }
      setTimeout(() => {
        if (this.currentQuizIndex < unit.quizzes.length - 1) {
          this.currentQuizIndex++;
          this.refreshCurrentTab();
        } else {
          window.soundFx.playFanfare();
          if (fbEl) {
            fbEl.innerHTML = `<span class="text-orange-600 font-black text-xl">🏆 Xuất sắc! Bé đã hoàn thành xuất sắc bài nghe!</span>`;
          }
        }
      }, 1200);
    } else {
      window.soundFx.playTryAgain();
      if (fbEl) {
        fbEl.innerHTML = `<span class="text-rose-500 font-bold">Bé hãy bấm nghe lại và chọn thử lại nhé! Cố lên! 💪</span>`;
      }
    }
  }

  // TAB 3: LUYỆN NÓI (Speaking Studio: Point and Say & Let's Talk)
  renderSpeakTab(container) {
    const unit = this.getCurrentUnit();
    let html = `
      <div class="space-y-6">
        <!-- Phòng Luyện Nói Tương Tác với Micro -->
        <div class="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg text-center relative overflow-hidden">
          <span class="inline-block bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">Phòng Thu Giọng Bé Lớp 1</span>
          <h2 class="text-3xl font-black mb-1">Bé Tập Nói Tiếng Anh Chuẩn Bản Xứ</h2>
          <p class="text-sm opacity-90 max-w-lg mx-auto mb-6">Bé chọn một từ hoặc câu bên dưới, bấm micro và đọc to rõ ràng nhé!</p>

          <div class="bg-white rounded-3xl p-6 max-w-md mx-auto text-gray-800 shadow-xl border-4 border-emerald-200">
            <div class="text-xs text-gray-400 font-semibold mb-1">Mục tiêu phát âm:</div>
            <div id="target-speaking-word" class="text-3xl font-black text-emerald-700 mb-1">
              ${this.currentSpeakingTarget || unit.vocabulary[0].word}
            </div>
            <div id="target-speaking-guide" class="text-sm text-gray-500 italic mb-6">
              "${unit.vocabulary[0].vi}"
            </div>

            <!-- Nút Micro to tròn -->
            <div class="flex flex-col items-center justify-center gap-3">
              <button onclick="app.toggleMic()" id="mic-btn" class="btn-bounce w-24 h-24 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center text-4xl shadow-lg border-4 border-white transition-all">
                <span>🎤</span>
              </button>
              <span id="mic-status-label" class="text-xs font-bold text-gray-600">Bấm micro để bắt đầu nói</span>

              <!-- Âm thanh mẫu -->
              <div class="flex items-center gap-2 mt-2">
                <button onclick="window.speech.speak(document.getElementById('target-speaking-word').textContent); window.soundFx.playPop();" class="btn-bounce bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
                  <span>🔊 Nghe cô đọc mẫu</span>
                </button>
                <button onclick="app.fallbackSpeakingSuccess()" class="btn-bounce bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1" title="Dành cho thiết bị không có micro">
                  <span>⭐ Bé đã đọc xong!</span>
                </button>
              </div>
            </div>

            <div id="speaking-result-box" class="mt-4 min-h-[40px] text-sm font-bold"></div>
          </div>
        </div>

        <!-- Danh sách Từ và Câu để chọn luyện nói (Point and Say) -->
        <div class="bg-white rounded-3xl p-6 shadow-md border-2 border-orange-100">
          <div class="flex items-center justify-between mb-4">
            <div>
              <div class="text-xs font-bold text-orange-600 uppercase">Lesson 1 - Hoạt động 2</div>
              <h3 class="text-xl font-black text-gray-800">Point and Say (Chỉ vào hình và đọc to)</h3>
            </div>
            <span class="text-xs text-gray-400">Chọn mục để đưa lên micro</span>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
    `;

    unit.vocabulary.forEach(v => {
      html += `
        <button onclick="app.setSpeakingTarget('${v.word}', '${v.vi}')" class="btn-bounce p-3 rounded-2xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-left flex items-center gap-3">
          <span class="text-3xl">${v.icon}</span>
          <div class="truncate">
            <div class="font-black text-gray-800 truncate">${v.word}</div>
            <div class="text-xs text-gray-500 truncate">${v.vi}</div>
          </div>
        </button>
      `;
    });

    html += `
          </div>

          <!-- Mẫu câu Let's Talk (Lesson 3 Hoạt động 7) -->
          <div class="border-t border-gray-100 pt-4">
            <div class="text-xs font-bold text-orange-600 uppercase mb-2">Lesson 3 - Hoạt động 7: Let's talk</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    `;

    unit.sentences.forEach(s => {
      html += `
        <button onclick="app.setSpeakingTarget('${s.en}', '${s.vi}')" class="btn-bounce p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-left flex items-center justify-between">
          <div>
            <div class="font-black text-gray-800">${s.en}</div>
            <div class="text-xs text-gray-600">${s.vi}</div>
          </div>
          <span class="text-xs bg-amber-200 text-amber-800 font-bold px-2 py-1 rounded-lg">Luyện câu 💬</span>
        </button>
      `;
    });

    html += `
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  setSpeakingTarget(word, vi) {
    this.currentSpeakingTarget = word;
    const wordEl = document.getElementById('target-speaking-word');
    const guideEl = document.getElementById('target-speaking-guide');
    if (wordEl) wordEl.textContent = word;
    if (guideEl) guideEl.textContent = `"${vi}"`;
    window.soundFx.playPop();
    window.speech.speak(word);
  }

  toggleMic() {
    const micBtn = document.getElementById('mic-btn');
    const label = document.getElementById('mic-status-label');
    const word = document.getElementById('target-speaking-word').textContent.trim();
    const resBox = document.getElementById('speaking-result-box');

    if (window.voiceRecognizer.isListening) {
      window.voiceRecognizer.stopListening();
      if (micBtn) micBtn.classList.remove('mic-recording');
      if (label) label.textContent = "Bấm micro để bắt đầu nói";
      return;
    }

    if (resBox) resBox.innerHTML = "";

    window.voiceRecognizer.startListening(
      word,
      () => {
        // onStart
        if (micBtn) micBtn.classList.add('mic-recording');
        if (label) label.textContent = "Đang lắng nghe... Bé nói to lên nhé! 👂";
      },
      (res) => {
        // onResult
        if (micBtn) micBtn.classList.remove('mic-recording');
        if (label) label.textContent = "Bấm micro để nói lại";

        if (res.isSuccess) {
          window.soundFx.playCorrect();
          this.updateStars(res.stars);
          if (resBox) {
            resBox.innerHTML = `
              <div class="text-emerald-600">
                <div>${res.message}</div>
                <div class="text-xs text-gray-500 mt-1">Bé đã nói: <span class="font-bold">"${res.spoken}"</span> (+${res.stars} ⭐)</div>
              </div>
            `;
          }
        } else {
          window.soundFx.playTryAgain();
          if (resBox) {
            resBox.innerHTML = `
              <div class="text-amber-600">
                <div>${res.message}</div>
                <div class="text-xs text-gray-500 mt-1">Bé đã nói: "${res.spoken || '...'}"</div>
              </div>
            `;
          }
        }
      },
      (err) => {
        // onError
        if (micBtn) micBtn.classList.remove('mic-recording');
        if (label) label.textContent = "Bấm micro để nói";
        if (resBox) {
          resBox.innerHTML = `
            <div class="text-gray-500 text-xs">
              Trình duyệt chưa bật mic, bé có thể bấm nút <span class="text-amber-600 font-bold">"Bé đã đọc xong!"</span> để nhận sao nhé!
            </div>
          `;
        }
      },
      () => {
        // onEnd
        if (micBtn) micBtn.classList.remove('mic-recording');
        if (label) label.textContent = "Bấm micro để nói lại";
      }
    );
  }

  fallbackSpeakingSuccess() {
    window.soundFx.playCorrect();
    this.updateStars(3);
    const resBox = document.getElementById('speaking-result-box');
    if (resBox) {
      resBox.innerHTML = `<span class="text-emerald-600 font-black">🌟 Bé giỏi lắm! Đã đọc to rõ ràng! (+3 ⭐)</span>`;
    }
  }

  // TAB 4: TẬP VIẾT & TÔ CHỮ (Writing & Tracing Canvas - Vở kẻ ô ly)
  renderWriteTab(container) {
    const unit = this.getCurrentUnit();
    let html = `
      <div class="space-y-6">
        <!-- Vở Kẻ Ô Ly Tập Viết (Lesson 2 Activity 5: Look and Trace / Write) -->
        <div class="bg-white rounded-3xl p-6 shadow-md border-2 border-orange-100">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div class="flex items-center gap-3">
              <span class="w-12 h-12 rounded-2xl bg-orange-100 text-2xl flex items-center justify-center">✍️</span>
              <div>
                <div class="text-xs font-bold text-orange-600 uppercase">Lesson 2 - Hoạt động 5</div>
                <h3 class="text-xl font-black text-gray-800">Look and Trace (Nhìn và tập tô chữ nét đứt)</h3>
                <p class="text-xs text-gray-500">Trang vở kẻ ô ly chuẩn tiểu học giúp bé rèn chữ đẹp</p>
              </div>
            </div>

            <!-- Chọn Chữ cái / Từ để tô -->
            <div class="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <span class="text-xs font-bold text-gray-500 shrink-0">Chọn chữ:</span>
    `;

    unit.traceLetters.forEach(item => {
      const active = item === this.currentTraceItem;
      html += `
        <button onclick="app.setTraceLetter('${item}')" class="btn-bounce px-3 py-1.5 rounded-xl text-sm font-black transition-all shrink-0 ${active ? 'bg-orange-500 text-white shadow' : 'bg-gray-100 hover:bg-orange-100 text-gray-700'}">
          ${item}
        </button>
      `;
    });

    html += `
            </div>
          </div>

          <!-- Bảng điều khiển màu bút & công cụ vẽ -->
          <div class="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 rounded-2xl mb-4">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-gray-500">Màu mực:</span>
              <button onclick="app.setCanvasColor('#1e3a8a')" class="w-8 h-8 rounded-full bg-blue-900 border-2 border-white shadow hover:scale-110 transition-transform" title="Xanh mực"></button>
              <button onclick="app.setCanvasColor('#dc2626')" class="w-8 h-8 rounded-full bg-red-600 border-2 border-white shadow hover:scale-110 transition-transform" title="Đỏ"></button>
              <button onclick="app.setCanvasColor('#15803d')" class="w-8 h-8 rounded-full bg-green-700 border-2 border-white shadow hover:scale-110 transition-transform" title="Xanh lá"></button>
              <button onclick="app.setCanvasColor('#ea580c')" class="w-8 h-8 rounded-full bg-orange-600 border-2 border-white shadow hover:scale-110 transition-transform" title="Cam"></button>
              <button onclick="app.setCanvasColor('#7c3aed')" class="w-8 h-8 rounded-full bg-purple-600 border-2 border-white shadow hover:scale-110 transition-transform" title="Tím"></button>
              <button onclick="app.setCanvasColor('#1f2937')" class="w-8 h-8 rounded-full bg-gray-800 border-2 border-white shadow hover:scale-110 transition-transform" title="Bút chì đen"></button>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="app.toggleEraser()" id="eraser-btn" class="btn-bounce px-3 py-1.5 rounded-xl bg-white border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-1">
                <span>🧹 Cục tẩy</span>
              </button>
              <button onclick="app.undoCanvas()" class="btn-bounce px-3 py-1.5 rounded-xl bg-white border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-1">
                <span>↩️ Hoàn tác</span>
              </button>
              <button onclick="app.clearCanvas()" class="btn-bounce px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 hover:bg-rose-100 flex items-center gap-1">
                <span>🗑️ Làm sạch</span>
              </button>
              <button onclick="app.gradeWriting()" class="btn-bounce px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-xs font-black text-white shadow-md flex items-center gap-1.5">
                <span>⭐ Chấm điểm 10!</span>
              </button>
            </div>
          </div>

          <!-- Khung Canvas Vở Ô Ly -->
          <div class="w-full h-80 relative canvas-paper overflow-hidden">
            <canvas id="trace-canvas" class="w-full h-full cursor-crosshair"></canvas>
            <div id="writing-stamp" class="absolute top-6 right-6 pointer-events-none transform rotate-12 scale-0 transition-transform duration-300">
              <div class="border-4 border-red-500 bg-red-50/90 text-red-600 font-black px-4 py-2 rounded-2xl text-2xl shadow-xl flex items-center gap-2">
                <span>💮</span>
                <span>ĐIỂM 10!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Khởi tạo Canvas instance
    setTimeout(() => {
      const canvasEl = document.getElementById('trace-canvas');
      if (canvasEl) {
        this.canvasInstance = new TraceCanvas(canvasEl, {
          text: this.currentTraceItem,
          color: '#1e3a8a',
          width: 8
        });
      }
    }, 50);
  }

  setTraceLetter(item) {
    this.currentTraceItem = item;
    if (this.canvasInstance) {
      this.canvasInstance.setText(item);
    }
    window.soundFx.playPop();
    window.speech.speak(item);
    this.refreshCurrentTab();
  }

  setCanvasColor(color) {
    if (this.canvasInstance) {
      this.canvasInstance.setColor(color);
    }
    window.soundFx.playPop();
    const eraserBtn = document.getElementById('eraser-btn');
    if (eraserBtn) eraserBtn.classList.remove('bg-gray-300');
  }

  toggleEraser() {
    if (!this.canvasInstance) return;
    const isE = !this.canvasInstance.isEraser;
    this.canvasInstance.setEraser(isE);
    const eraserBtn = document.getElementById('eraser-btn');
    if (eraserBtn) {
      if (isE) eraserBtn.classList.add('bg-gray-300');
      else eraserBtn.classList.remove('bg-gray-300');
    }
    window.soundFx.playPop();
  }

  undoCanvas() {
    if (this.canvasInstance) {
      this.canvasInstance.undo();
      window.soundFx.playPop();
    }
  }

  clearCanvas() {
    if (this.canvasInstance) {
      this.canvasInstance.clear();
      window.soundFx.playPop();
    }
    const stamp = document.getElementById('writing-stamp');
    if (stamp) stamp.classList.add('scale-0');
  }

  gradeWriting() {
    window.soundFx.playFanfare();
    this.updateStars(3);
    const stamp = document.getElementById('writing-stamp');
    if (stamp) {
      stamp.classList.remove('scale-0');
      stamp.classList.add('scale-100');
    }
  }

  // TAB 5: TRÒ CHƠI ÔN TẬP (Fun Time & Games)
  renderGameTab(container) {
    const unit = this.getCurrentUnit();
    let html = `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">Fun Time Mini Games</span>
            <h2 class="text-3xl font-black mt-2">Trò Chơi Ghép Thẻ Nhớ Từ Vựng</h2>
            <p class="text-sm opacity-90 mt-1">Bé hãy lật 2 thẻ giống nhau để ghi điểm và nhận sao nhé!</p>
          </div>
          <button onclick="app.initMemoryGame()" class="btn-bounce bg-white text-rose-600 hover:bg-rose-50 font-black px-5 py-3 rounded-2xl shadow">
            <span>🔄 Chơi lại</span>
          </button>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-md border-2 border-orange-100">
          <div id="memory-game-board" class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"></div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.initMemoryGame();
  }

  initMemoryGame() {
    const unit = this.getCurrentUnit();
    const board = document.getElementById('memory-game-board');
    if (!board) return;

    // Lấy 4 từ vựng và tạo cặp (1 từ tiếng Anh, 1 hình ảnh)
    const items = unit.vocabulary.slice(0, 4);
    let cards = [];
    items.forEach((item, idx) => {
      cards.push({ id: idx, type: 'word', content: item.word, matchKey: idx });
      cards.push({ id: idx, type: 'icon', content: item.icon, matchKey: idx });
    });

    // Trộn ngẫu nhiên
    cards.sort(() => Math.random() - 0.5);

    let html = '';
    cards.forEach((card, index) => {
      html += `
        <div class="memory-card h-28 cursor-pointer rounded-2xl bg-orange-100 border-2 border-orange-300 flex items-center justify-center text-3xl font-black text-orange-600 transition-all shadow-sm hover:scale-105" data-index="${index}" data-match="${card.matchKey}" data-content="${card.content}" onclick="app.flipMemoryCard(this)">
          <span class="card-question">❓</span>
          <span class="card-revealed hidden">${card.content}</span>
        </div>
      `;
    });

    board.innerHTML = html;
    this.flippedCards = [];
    this.matchedCount = 0;
  }

  flipMemoryCard(cardEl) {
    if (this.flippedCards.length >= 2 || cardEl.classList.contains('matched') || cardEl.classList.contains('active-flipped')) return;

    window.soundFx.playPop();
    cardEl.classList.add('active-flipped', 'bg-white', 'border-orange-500');
    cardEl.querySelector('.card-question').classList.add('hidden');
    cardEl.querySelector('.card-revealed').classList.remove('hidden');

    this.flippedCards.push(cardEl);

    if (this.flippedCards.length === 2) {
      const [c1, c2] = this.flippedCards;
      if (c1.dataset.match === c2.dataset.match) {
        // Đúng cặp!
        window.soundFx.playCorrect();
        this.updateStars(1);
        c1.classList.add('matched', 'bg-emerald-100', 'border-emerald-500', 'text-emerald-700');
        c2.classList.add('matched', 'bg-emerald-100', 'border-emerald-500', 'text-emerald-700');
        this.flippedCards = [];
        this.matchedCount += 2;
        if (this.matchedCount >= 8) {
          setTimeout(() => {
            window.soundFx.playFanfare();
            alert("🎉 Hoan hô! Bé đã chiến thắng trò chơi ghép thẻ!");
          }, 400);
        }
      } else {
        // Sai cặp
        setTimeout(() => {
          c1.classList.remove('active-flipped', 'bg-white', 'border-orange-500');
          c1.querySelector('.card-question').classList.remove('hidden');
          c1.querySelector('.card-revealed').classList.add('hidden');

          c2.classList.remove('active-flipped', 'bg-white', 'border-orange-500');
          c2.querySelector('.card-question').classList.remove('hidden');
          c2.querySelector('.card-revealed').classList.add('hidden');

          this.flippedCards = [];
        }, 800);
      }
    }
  }

  // TAB 6: SÁCH GIÁO KHOA GỐC (Official 78-page high-resolution reader)
  renderBookTab(container) {
    const pageUrl = BOOK_PAGE_URLS[this.bookViewerPageIndex] || BOOK_PAGE_URLS[0];
    const pageNum = this.bookViewerPageIndex + 1;

    let html = `
      <div class="space-y-4">
        <!-- Thanh điều khiển trang sách -->
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <span class="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">📖</span>
            <div>
              <h3 class="font-black text-gray-800 text-base">Sách Giáo Khoa Gốc: Tiếng Anh 1 - Global Success</h3>
              <p class="text-xs text-gray-500">NXB Giáo Dục Việt Nam • 78 Trang đầy đủ</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="app.prevBookPage()" class="btn-bounce px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700">
              ◀ Trang trước
            </button>
            <div class="flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
              <span>Trang</span>
              <input type="number" min="1" max="78" value="${pageNum}" onchange="app.goToBookPage(this.value)" class="w-12 text-center bg-white border border-gray-300 rounded font-black text-orange-600 py-0.5">
              <span>/ 78</span>
            </div>
            <button onclick="app.nextBookPage()" class="btn-bounce px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700">
              Trang sau ▶
            </button>
          </div>
        </div>

        <!-- Khung ảnh trang sách sắc nét -->
        <div class="bg-gray-100 rounded-3xl p-4 md:p-8 flex justify-center items-center shadow-inner overflow-auto min-h-[500px]">
          <div class="bg-white rounded-2xl shadow-2xl p-2 max-w-3xl w-full border-4 border-white transition-all">
            <img src="${pageUrl}" alt="SGK Tiếng Anh 1 Trang ${pageNum}" class="w-full h-auto rounded-xl object-contain mx-auto" loading="lazy">
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  prevBookPage() {
    if (this.bookViewerPageIndex > 0) {
      this.bookViewerPageIndex--;
      window.soundFx.playPop();
      this.renderBookTab(document.getElementById('main-tab-content'));
    }
  }

  nextBookPage() {
    if (this.bookViewerPageIndex < BOOK_PAGE_URLS.length - 1) {
      this.bookViewerPageIndex++;
      window.soundFx.playPop();
      this.renderBookTab(document.getElementById('main-tab-content'));
    }
  }

  goToBookPage(val) {
    const p = parseInt(val, 10);
    if (!isNaN(p) && p >= 1 && p <= 78) {
      this.bookViewerPageIndex = p - 1;
      this.renderBookTab(document.getElementById('main-tab-content'));
    }
  }

  openBookAtPage(pageIndex) {
    this.bookViewerPageIndex = pageIndex;
    this.switchTab('book');
  }

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('hidden');
    }
  }

  setupEventListeners() {
    // Menu mobile toggle
    const toggleBtn = document.getElementById('mobile-menu-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleSidebar());
    }
  }
}

// Khởi chạy ứng dụng khi DOM tải xong
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
