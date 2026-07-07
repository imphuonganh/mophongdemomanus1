// Canvas setup
const container = document.getElementById('canvas-container');
const canvas = document.createElement('canvas');
container.appendChild(canvas);
const ctx = canvas.getContext('2d');

// UI Elements
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const resetBtn = document.getElementById('resetBtn');
const progressSlider = document.getElementById('progressSlider');
const progressText = document.getElementById('progressText');
const explanationText = document.getElementById('explanationText');
const distanceInfo = document.getElementById('distanceInfo');
const stepButtons = document.querySelectorAll('.step-btn');

// State
let width, height;
let animationId;
let isPlaying = false;
let progress = 0; // 0 to 100
let atom1, atom2;
let electrons = [];

// Stages: 0%, 25%, 50%, 75%, 100%
const stages = [0, 25, 50, 75, 100];

class Atom {
    constructor(x, y, label, color) {
        this.label = label;
        this.color = color;
        this.radius = 35;
        this.orbitRadius = 80;
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.electronAngle = Math.random() * Math.PI * 2;
    }

    updatePosition(progress) {
        // Atoms move closer as progress increases
        const startDist = width * 0.5;
        const endDist = 120;
        const currentDist = startDist - (startDist - endDist) * (progress / 100);
        
        const centerX = width / 2;
        if (this.label === 'H1') {
            this.x = centerX - currentDist / 2;
        } else {
            this.x = centerX + currentDist / 2;
        }
        this.y = height / 2;
    }

    draw(progress) {
        // Draw nucleus with glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Draw nucleus label
        ctx.fillStyle = 'white';
        ctx.font = 'bold 22px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.label, this.x, this.y);

        // Draw orbit path (dashed circle)
        if (progress < 80) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.orbitRadius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.setLineDash([5, 5]);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }
}

class Electron {
    constructor(atomId, startAngle) {
        this.atomId = atomId;
        this.angle = startAngle;
        this.radius = 6;
        this.speed = 0.04;
    }

    update(progress, atom1, atom2) {
        this.angle += this.speed;

        if (progress < 40) {
            // Normal orbiting around own atom
            const atom = this.atomId === 1 ? atom1 : atom2;
            this.x = atom.x + Math.cos(this.angle) * atom.orbitRadius;
            this.y = atom.y + Math.sin(this.angle) * atom.orbitRadius;
        } else if (progress < 80) {
            // Transitioning to center
            const t = (progress - 40) / 40;
            const atom = this.atomId === 1 ? atom1 : atom2;
            const centerX = (atom1.x + atom2.x) / 2;
            const centerY = (atom1.y + atom2.y) / 2;
            
            const orbitRadius = atom.orbitRadius * (1 - t * 0.4);
            const baseX = atom.x + Math.cos(this.angle) * orbitRadius;
            const baseY = atom.y + Math.sin(this.angle) * orbitRadius;
            
            this.x = baseX + (centerX - baseX) * t;
            this.y = baseY + (centerY - baseY) * t;
        } else {
            // Bonded: Shared orbital around both nuclei
            const centerX = (atom1.x + atom2.x) / 2;
            const centerY = (atom1.y + atom2.y) / 2;
            
            if (this.atomId === 1) {
                this.x = centerX + Math.cos(this.angle) * 40;
                this.y = centerY + Math.sin(this.angle) * 25;
            } else {
                this.x = centerX + Math.cos(this.angle + Math.PI) * 40;
                this.y = centerY + Math.sin(this.angle + Math.PI) * 25;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffeb3b';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#ffeb3b';
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function init() {
    resize();
    
    // Create atoms
    atom1 = new Atom(width * 0.25, height / 2, 'H1', '#4a90e2');
    atom2 = new Atom(width * 0.75, height / 2, 'H2', '#4a90e2');
    
    // Create electrons
    electrons = [
        new Electron(1, 0),
        new Electron(2, Math.PI)
    ];
    
    progress = 0;
    updateUI();
    updateExplanation();
}

function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);

function update() {
    if (isPlaying && progress < 100) {
        progress += 0.5;
        if (progress > 100) progress = 100;
        updateUI();
    }
    
    // Update atom positions
    atom1.updatePosition(progress);
    atom2.updatePosition(progress);
    
    // Update electrons
    electrons.forEach(e => e.update(progress, atom1, atom2));
    
    updateExplanation();
}

function updateUI() {
    progressSlider.value = progress;
    progressText.innerText = `${Math.round(progress)}%`;
    
    // Update distance info
    const distance = Math.abs(atom2.x - atom1.x);
    if (distance > 250) {
        distanceInfo.innerText = 'Rất xa';
    } else if (distance > 150) {
        distanceInfo.innerText = 'Xa';
    } else if (distance > 100) {
        distanceInfo.innerText = 'Gần';
    } else {
        distanceInfo.innerText = 'Rất gần';
    }
    
    // Update step buttons
    stepButtons.forEach((btn, idx) => {
        const stageProgress = stages[idx];
        if (Math.abs(progress - stageProgress) < 5) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateExplanation() {
    if (progress < 20) {
        explanationText.innerText = "Hai nguyên tử Hydrogen đang ở khoảng cách xa, mỗi nguyên tử có 1 electron ở lớp vỏ K.";
    } else if (progress < 40) {
        explanationText.innerText = "Khi tiến lại gần, lực hút giữa hạt nhân nguyên tử này với electron của nguyên tử kia bắt đầu xuất hiện.";
    } else if (progress < 60) {
        explanationText.innerText = "Các electron bắt đầu di chuyển vào vùng không gian giữa hai hạt nhân. Chúng bị hút bởi cả hai hạt nhân.";
    } else if (progress < 85) {
        explanationText.innerText = "Hai electron được dùng chung, tạo thành cặp electron liên kết. Mật độ electron tăng ở giữa hai hạt nhân.";
    } else {
        explanationText.innerText = "Liên kết cộng hóa trị đã hình thành! Phân tử H₂ được tạo ra với cấu hình electron bền vững như khí hiếm Helium.";
    }
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw bonding cloud if progress is high
    if (progress > 70) {
        const t = (progress - 70) / 30;
        const centerX = (atom1.x + atom2.x) / 2;
        const centerY = (atom1.y + atom2.y) / 2;
        
        // Electron density cloud
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 90 * t, 55 * t, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 144, 226, ${0.15 * t})`;
        ctx.fill();
        
        // Connection line
        ctx.beginPath();
        ctx.moveTo(atom1.x, atom1.y);
        ctx.lineTo(atom2.x, atom2.y);
        ctx.strokeStyle = `rgba(74, 144, 226, ${0.3 * t})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Draw atoms
    atom1.draw(progress);
    atom2.draw(progress);
    
    // Draw electrons
    electrons.forEach(e => e.draw());
    
    update();
    animationId = requestAnimationFrame(draw);
}

// Event Listeners
playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
});

resetBtn.addEventListener('click', () => {
    progress = 0;
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    init();
    updateUI();
});

// Step buttons - jump to stages
stepButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        progress = stages[idx];
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        updateUI();
        updateExplanation();
    });
});

// Progress slider - seekable
progressSlider.addEventListener('input', (e) => {
    progress = parseFloat(e.target.value);
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    updateUI();
    updateExplanation();
});

// Start
init();
draw();
