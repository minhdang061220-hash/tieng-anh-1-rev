// Writing & Tracing Canvas (Vở kẻ ô ly & Tập tô chữ cho học sinh lớp 1)

class TraceCanvas {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.isDrawing = false;
    this.strokeColor = options.color || '#2b580c';
    this.strokeWidth = options.width || 8;
    this.isEraser = false;
    this.history = [];
    this.currentText = options.text || 'B';
    this.showGrid = true;
    this.showDotted = true;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.bindEvents();
    this.render();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = (rect.width || 600) * dpr;
    this.canvas.height = (rect.height || 360) * dpr;
    this.canvas.style.width = `${rect.width || 600}px`;
    this.canvas.style.height = `${rect.height || 360}px`;
    this.ctx.scale(dpr, dpr);
    this.render();
  }

  bindEvents() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const startDraw = (e) => {
      e.preventDefault();
      this.isDrawing = true;
      const pos = getPos(e);
      this.lastPos = pos;
      this.saveState();
      this.drawDot(pos.x, pos.y);
    };

    const drawMove = (e) => {
      if (!this.isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);

      this.ctx.beginPath();
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.lineWidth = this.strokeWidth;
      
      if (this.isEraser) {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.lineWidth = this.strokeWidth * 2.5;
      } else {
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.strokeStyle = this.strokeColor;
      }

      this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
      this.ctx.closePath();

      this.lastPos = pos;
    };

    const stopDraw = () => {
      if (this.isDrawing) {
        this.isDrawing = false;
      }
    };

    this.canvas.addEventListener('mousedown', startDraw);
    this.canvas.addEventListener('mousemove', drawMove);
    window.addEventListener('mouseup', stopDraw);

    this.canvas.addEventListener('touchstart', startDraw, { passive: false });
    this.canvas.addEventListener('touchmove', drawMove, { passive: false });
    window.addEventListener('touchend', stopDraw);
  }

  drawDot(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.strokeWidth / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = this.isEraser ? '#ffffff' : this.strokeColor;
    if (this.isEraser) {
      this.ctx.globalCompositeOperation = 'destination-out';
    } else {
      this.ctx.globalCompositeOperation = 'source-over';
    }
    this.ctx.fill();
    this.ctx.closePath();
  }

  saveState() {
    if (this.history.length > 25) {
      this.history.shift();
    }
    const dpr = window.devicePixelRatio || 1;
    this.history.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
  }

  undo() {
    if (this.history.length > 0) {
      const state = this.history.pop();
      this.ctx.putImageData(state, 0, 0);
    } else {
      this.clear();
    }
  }

  clear() {
    this.history = [];
    const dpr = window.devicePixelRatio || 1;
    this.ctx.clearRect(0, 0, this.canvas.width / dpr, this.canvas.height / dpr);
    this.render();
  }

  // Vẽ lưới ô ly chuẩn học sinh tiểu học Việt Nam
  drawGrid() {
    const width = parseFloat(this.canvas.style.width);
    const height = parseFloat(this.canvas.style.height);

    this.ctx.save();
    this.ctx.globalCompositeOperation = 'destination-over';

    // Nền trắng tinh
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, width, height);

    // Kẻ lưới ô vuông 20px x 20px
    const gridSize = 24;
    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = '#e2e8f0'; // Đường mờ

    for (let x = 0; x < width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
      this.ctx.stroke();
    }

    for (let y = 0; y < height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();
    }

    // Đường kẻ đậm hơn chia dòng ô ly lớn (4 ô nhỏ = 1 dòng)
    this.ctx.lineWidth = 1.2;
    this.ctx.strokeStyle = '#cbd5e1';
    for (let y = 0; y < height; y += gridSize * 4) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  // Vẽ chữ mẫu nét đứt (Dotted / Tracing guide)
  drawDottedLetter() {
    if (!this.showDotted || !this.currentText) return;

    const width = parseFloat(this.canvas.style.width);
    const height = parseFloat(this.canvas.style.height);

    this.ctx.save();
    this.ctx.globalCompositeOperation = 'destination-over';

    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    // Tính kích cỡ font theo chiều dài từ
    let fontSize = 160;
    if (this.currentText.length > 2) {
      fontSize = Math.min(100, Math.floor(width / (this.currentText.length * 0.75)));
    }

    this.ctx.font = `bold ${fontSize}px 'Quicksand', 'Nunito', sans-serif`;

    // Vẽ nét đứt hướng dẫn
    this.ctx.strokeStyle = '#94a3b8';
    this.ctx.lineWidth = 4;
    this.ctx.setLineDash([8, 8]);
    this.ctx.strokeText(this.currentText, width / 2, height / 2);

    // Vẽ màu mờ bên trong làm mẫu
    this.ctx.fillStyle = 'rgba(226, 232, 240, 0.6)';
    this.ctx.fillText(this.currentText, width / 2, height / 2);

    this.ctx.restore();
  }

  render() {
    this.drawGrid();
    this.drawDottedLetter();
  }

  setText(text) {
    this.currentText = text;
    this.clear();
  }

  setColor(color) {
    this.strokeColor = color;
    this.isEraser = false;
  }

  setEraser(active) {
    this.isEraser = active;
  }

  setWidth(width) {
    this.strokeWidth = width;
  }
}

window.TraceCanvas = TraceCanvas;
