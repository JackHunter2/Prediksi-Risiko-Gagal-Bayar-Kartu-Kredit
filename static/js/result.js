// =========================================================
// Prediksi Risiko Kredit - Result Page JavaScript
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================================
    // Animasi Progress Circle
    // =====================================================
    const progressCircle = document.querySelector('.progress-circle-fill');
    const progressText = document.querySelector('.progress-text');
    const probabilityElement = document.querySelector('.prob-value');
    
    if (progressCircle && probabilityElement) {
        const probability = parseFloat(probabilityElement.textContent.replace('%', ''));
        
        // Set CSS variable untuk animasi
        document.documentElement.style.setProperty('--progress', probability);
        
        // Animasi angka
        animateNumber(0, probability, 1500, (value) => {
            if (progressText) {
                progressText.textContent = Math.round(value) + '%';
            }
        });
    }
    
    // =====================================================
    // Konfeti untuk Risiko Rendah
    // =====================================================
    const riskBadge = document.querySelector('.risk-badge');
    if (riskBadge && riskBadge.classList.contains('risk-rendah')) {
        setTimeout(() => {
            createConfetti();
        }, 500);
    }
    
    // =====================================================
    // Shake animation untuk Risiko Tinggi
    // =====================================================
    if (riskBadge && riskBadge.classList.contains('risk-tinggi')) {
        setTimeout(() => {
            riskBadge.style.animation = 'shake 0.5s';
        }, 500);
    }
    
    // =====================================================
    // Print Functionality
    // =====================================================
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    }
    
    // =====================================================
    // Copy Result to Clipboard
    // =====================================================
    const resultBox = document.querySelector('.result-box');
    if (resultBox) {
        // Tambahkan tombol copy (opsional)
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn-copy';
        copyBtn.innerHTML = '📋 Copy Hasil';
        copyBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            padding: 8px 16px;
            background: rgba(102, 126, 234, 0.1);
            border: 2px solid #667eea;
            color: #667eea;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
        `;
        
        resultBox.style.position = 'relative';
        resultBox.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', function() {
            const resultText = extractResultText();
            copyToClipboard(resultText);
            
            // Feedback visual
            this.innerHTML = '✅ Tersalin!';
            this.style.background = 'rgba(46, 125, 50, 0.1)';
            this.style.borderColor = '#2e7d32';
            this.style.color = '#2e7d32';
            
            setTimeout(() => {
                this.innerHTML = '📋 Copy Hasil';
                this.style.background = 'rgba(102, 126, 234, 0.1)';
                this.style.borderColor = '#667eea';
                this.style.color = '#667eea';
            }, 2000);
        });
    }
    
    // =====================================================
    // Share Result (Web Share API)
    // =====================================================
    if (navigator.share) {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'btn-share';
        shareBtn.innerHTML = '🔗 Share';
        shareBtn.style.cssText = `
            margin-left: 10px;
            padding: 14px 28px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            font-weight: 700;
            font-size: 15px;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        `;
        
        const buttonGroup = document.querySelector('.button-group');
        if (buttonGroup) {
            buttonGroup.appendChild(shareBtn);
            
            shareBtn.addEventListener('click', async function() {
                const resultText = extractResultText();
                
                try {
                    await navigator.share({
                        title: 'Hasil Prediksi Risiko Kredit',
                        text: resultText,
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Share cancelled or failed:', err);
                }
            });
        }
    }
    
    // =====================================================
    // Keyboard Shortcuts
    // =====================================================
    document.addEventListener('keydown', function(e) {
        // P = Print
        if (e.key === 'p' || e.key === 'P') {
            e.preventDefault();
            window.print();
        }
        
        // C = Copy
        if (e.key === 'c' || e.key === 'C') {
            if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                const copyBtn = document.querySelector('.btn-copy');
                if (copyBtn) copyBtn.click();
            }
        }
        
        // Backspace atau Escape = Kembali
        if (e.key === 'Backspace' || e.key === 'Escape') {
            const backBtn = document.querySelector('.btn-back');
            if (backBtn) backBtn.click();
        }
    });
    
    // =====================================================
    // Parallax Effect pada Mouse Move
    // =====================================================
    const resultBox = document.querySelector('.result-box');
    if (resultBox) {
        document.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            
            resultBox.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        document.addEventListener('mouseleave', function() {
            resultBox.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
    }
    
    // =====================================================
    // Auto-redirect dengan countdown (opsional)
    // =====================================================
    let countdown = 30; // detik
    let countdownInterval;
    
    // Tambahkan countdown display (komentar jika tidak diperlukan)
    /*
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown';
    countdownElement.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        z-index: 1000;
    `;
    document.body.appendChild(countdownElement);
    
    countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = `Kembali otomatis dalam ${countdown} detik...`;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            window.location.href = '/';
        }
    }, 1000);
    
    // Stop countdown jika user berinteraksi
    document.addEventListener('click', () => {
        clearInterval(countdownInterval);
        countdownElement.remove();
    });
    */
    
});

// =========================================================
// Utility Functions
// =========================================================

// Animasi angka (counting animation)
function animateNumber(start, end, duration, callback) {
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const value = start + (end - start) * easeOut;
        
        callback(value);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Konfeti animation
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#43a047', '#66bb6a', '#f093fb', '#4facfe'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.position = 'fixed';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.zIndex = '10000';
        
        const duration = Math.random() * 3 + 2;
        confetti.style.animation = `confetti-fall ${duration}s linear forwards`;
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), (duration + 0.5) * 1000);
    }
}

// Extract result text untuk copy/share
function extractResultText() {
    const title = document.querySelector('h2')?.textContent || '';
    const riskLevel = document.querySelector('.risk-badge')?.textContent || '';
    const probability = document.querySelector('.prob-value')?.textContent || '';
    const info = document.querySelector('.info-text')?.textContent || '';
    
    return `
HASIL PREDIKSI RISIKO KREDIT
============================

${title}
Status: ${riskLevel}
Probabilitas Gagal Bayar: ${probability}

${info}

---
Generated by Sistem Prediksi Risiko Kredit
    `.trim();
}

// Copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Hasil berhasil disalin ke clipboard!', 'success');
        }).catch(err => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

// Fallback copy method
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showToast('Hasil berhasil disalin!', 'success');
    } catch (err) {
        showToast('Gagal menyalin hasil', 'error');
    }
    
    document.body.removeChild(textarea);
}

// Toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: ${type === 'success' ? '#43a047' : type === 'error' ? '#e53935' : '#667eea'};
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transition: transform 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(toast);
    
    // Slide in
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Download result as image (html2canvas - perlu library tambahan)
function downloadResultAsImage() {
    // Implementasi memerlukan library html2canvas
    // html2canvas(document.querySelector('.result-box')).then(canvas => {
    //     const link = document.createElement('a');
    //     link.download = 'hasil-prediksi-kredit.png';
    //     link.href = canvas.toDataURL();
    //     link.click();
    // });
}

