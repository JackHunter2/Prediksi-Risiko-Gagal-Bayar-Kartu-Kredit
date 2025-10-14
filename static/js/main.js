// =========================================================
// Prediksi Risiko Kredit - Main JavaScript
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================================
    // Form Elements
    // =====================================================
    const form = document.getElementById('predictionForm');
    const submitBtn = document.getElementById('submitBtn');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const progressBar = document.getElementById('progressBar');
    
    // =====================================================
    // Input Validation & Real-time Feedback
    // =====================================================
    const inputs = document.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        // Validasi saat user mengetik
        input.addEventListener('input', function() {
            validateInput(this);
            updateProgress();
        });
        
        // Validasi saat kehilangan fokus
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        // Animasi fokus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('bounce-in');
        });
    });
    
    // Fungsi validasi input
    function validateInput(input) {
        const value = input.value.trim();
        const errorMsg = input.parentElement.querySelector('.error-message');
        
        // Hapus class error/success sebelumnya
        input.classList.remove('error', 'success');
        
        if (value === '') {
            if (errorMsg) errorMsg.classList.remove('show');
            return false;
        }
        
        // Validasi berdasarkan tipe input
        let isValid = true;
        let errorText = '';
        
        if (input.type === 'number') {
            const numValue = parseFloat(value);
            
            // Validasi limit kredit
            if (input.name === 'limit_bal') {
                if (numValue < 0) {
                    isValid = false;
                    errorText = 'Limit kredit tidak boleh negatif';
                } else if (numValue < 10000) {
                    isValid = false;
                    errorText = 'Limit kredit minimal Rp 10.000';
                }
            }
            
            // Validasi usia
            if (input.name === 'age') {
                if (numValue < 18 || numValue > 100) {
                    isValid = false;
                    errorText = 'Usia harus antara 18-100 tahun';
                }
            }
            
            // Validasi status pembayaran
            if (input.name.includes('payment_status')) {
                if (numValue < -2 || numValue > 8) {
                    isValid = false;
                    errorText = 'Status pembayaran harus antara -2 sampai 8';
                }
            }
            
            // Validasi tagihan dan pembayaran
            if (input.name.includes('bill_statement') || input.name.includes('previous_payment')) {
                if (numValue < 0) {
                    isValid = false;
                    errorText = 'Jumlah tidak boleh negatif';
                }
            }
        }
        
        // Update UI berdasarkan validasi
        if (isValid) {
            input.classList.add('success');
            if (errorMsg) errorMsg.classList.remove('show');
        } else {
            input.classList.add('error');
            if (errorMsg) {
                errorMsg.textContent = errorText;
                errorMsg.classList.add('show');
            }
        }
        
        return isValid;
    }
    
    // =====================================================
    // Progress Bar
    // =====================================================
    function updateProgress() {
        const totalFields = inputs.length;
        let filledFields = 0;
        
        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                filledFields++;
            }
        });
        
        const progress = (filledFields / totalFields) * 100;
        progressBar.style.width = progress + '%';
    }
    
    // =====================================================
    // Currency Formatting
    // =====================================================
    const currencyInputs = document.querySelectorAll('input[name*="bill_statement"], input[name*="previous_payment"], input[name="limit_bal"]');
    
    currencyInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value) {
                // Format angka dengan pemisah ribuan
                const value = parseFloat(this.value.replace(/,/g, ''));
                if (!isNaN(value)) {
                    this.value = value.toLocaleString('id-ID');
                }
            }
        });
        
        input.addEventListener('focus', function() {
            // Hapus format saat fokus untuk editing
            this.value = this.value.replace(/,/g, '');
        });
    });
    
    // =====================================================
    // Auto-save ke LocalStorage
    // =====================================================
    const STORAGE_KEY = 'creditPredictionForm';
    
    // Load data dari localStorage saat halaman dimuat
    function loadFormData() {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            const formData = JSON.parse(savedData);
            Object.keys(formData).forEach(key => {
                const input = document.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = formData[key];
                }
            });
            updateProgress();
            showNotification('Data sebelumnya berhasil dimuat', 'info');
        }
    }
    
    // Save data ke localStorage
    function saveFormData() {
        const formData = {};
        inputs.forEach(input => {
            formData[input.name] = input.value;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
    
    // Auto-save setiap 3 detik setelah perubahan
    let saveTimeout;
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(saveFormData, 3000);
        });
    });
    
    // =====================================================
    // Form Submission
    // =====================================================
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validasi semua input
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input) || input.value.trim() === '') {
                isValid = false;
                input.classList.add('error');
            }
        });
        
        if (!isValid) {
            showNotification('Mohon lengkapi semua field dengan benar!', 'error');
            // Scroll ke field pertama yang error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }
        
        // Tampilkan loading
        showLoading();
        
        // Hapus format currency sebelum submit
        currencyInputs.forEach(input => {
            input.value = input.value.replace(/,/g, '');
        });
        
        // Submit form
        setTimeout(() => {
            form.submit();
            // Hapus saved data setelah submit
            localStorage.removeItem(STORAGE_KEY);
        }, 1000);
    });
    
    // =====================================================
    // Loading Overlay
    // =====================================================
    function showLoading() {
        loadingOverlay.classList.add('active');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    }
    
    // =====================================================
    // Notification System
    // =====================================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animasi masuk
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Hapus setelah 3 detik
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    function getNotificationIcon(type) {
        const icons = {
            'info': 'ℹ️',
            'success': '✅',
            'error': '❌',
            'warning': '⚠️'
        };
        return icons[type] || icons.info;
    }
    
    // =====================================================
    // Floating Action Buttons
    // =====================================================
    const fabReset = document.getElementById('fabReset');
    const fabHelp = document.getElementById('fabHelp');
    const fabExample = document.getElementById('fabExample');
    
    if (fabReset) {
        fabReset.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin mereset semua data?')) {
                form.reset();
                localStorage.removeItem(STORAGE_KEY);
                updateProgress();
                showNotification('Form berhasil direset!', 'success');
            }
        });
    }
    
    if (fabHelp) {
        fabHelp.addEventListener('click', function() {
            showHelpModal();
        });
    }
    
    if (fabExample) {
        fabExample.addEventListener('click', function() {
            showExampleModal();
        });
    }
    
    // =====================================================
    // Help Modal
    // =====================================================
    function showHelpModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>📚 Panduan Pengisian Form</h3>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="help-section">
                        <h4>💳 Status Pembayaran</h4>
                        <ul>
                            <li><strong>-2, -1:</strong> Bayar tepat waktu (semakin negatif semakin baik)</li>
                            <li><strong>0:</strong> Tidak ada transaksi</li>
                            <li><strong>1-8:</strong> Keterlambatan 1-8 bulan</li>
                        </ul>
                    </div>
                    <div class="help-section">
                        <h4>📊 Tagihan & Pembayaran</h4>
                        <ul>
                            <li>Masukkan jumlah dalam Rupiah (Rp)</li>
                            <li>Sistem akan memformat angka otomatis</li>
                            <li>Nilai 0 = tidak ada tagihan/pembayaran</li>
                        </ul>
                    </div>
                    <div class="help-section">
                        <h4>💡 Tips</h4>
                        <ul>
                            <li>Data akan tersimpan otomatis setiap 3 detik</li>
                            <li>Pastikan semua data terisi dengan benar</li>
                            <li>Gunakan tombol reset untuk mengulang</li>
                            <li><strong>Coba fitur contoh data (📋)</strong> untuk demo cepat!</li>
                        </ul>
                    </div>
                    <div class="help-section">
                        <h4>⌨️ Shortcut Keyboard</h4>
                        <ul>
                            <li><strong>F2:</strong> Buka contoh data</li>
                            <li><strong>F1:</strong> Buka bantuan</li>
                            <li><strong>Ctrl+Enter:</strong> Submit form</li>
                            <li><strong>Ctrl+R:</strong> Reset form</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 100);
        
        // Close modal
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        });
    }
    
    // =====================================================
    // Example Data Modal
    // =====================================================
    function showExampleModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>📝 Pilih Contoh Data</h3>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <p style="margin-bottom: 20px; color: #666;">
                        Pilih salah satu contoh data di bawah untuk mengisi form secara otomatis:
                    </p>
                    
                    <div class="example-card" id="exampleLow" style="margin-bottom: 15px; padding: 20px; border: 2px solid #4caf50; border-radius: 10px; cursor: pointer; transition: all 0.3s;">
                        <h4 style="color: #2e7d32; margin-bottom: 10px;">✅ Contoh Risiko Rendah</h4>
                        <p style="color: #666; font-size: 14px;">
                            Nasabah dengan riwayat pembayaran baik, limit kredit tinggi, dan selalu bayar tepat waktu.
                        </p>
                        <ul style="margin-top: 10px; color: #555; font-size: 13px; list-style: none; padding: 0;">
                            <li>• Limit: Rp 500.000</li>
                            <li>• Usia: 35 tahun</li>
                            <li>• Pendidikan: University</li>
                            <li>• Status: Selalu bayar tepat waktu</li>
                        </ul>
                    </div>
                    
                    <div class="example-card" id="exampleHigh" style="padding: 20px; border: 2px solid #f44336; border-radius: 10px; cursor: pointer; transition: all 0.3s;">
                        <h4 style="color: #c62828; margin-bottom: 10px;">⚠️ Contoh Risiko Tinggi</h4>
                        <p style="color: #666; font-size: 14px;">
                            Nasabah dengan riwayat pembayaran buruk, sering terlambat, dan tagihan tinggi.
                        </p>
                        <ul style="margin-top: 10px; color: #555; font-size: 13px; list-style: none; padding: 0;">
                            <li>• Limit: Rp 50.000</li>
                            <li>• Usia: 28 tahun</li>
                            <li>• Pendidikan: High School</li>
                            <li>• Status: Sering terlambat 2-3 bulan</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 100);
        
        // Hover effects
        const cards = modal.querySelectorAll('.example-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
        
        // Fill example data - Low Risk
        document.getElementById('exampleLow').addEventListener('click', () => {
            fillExampleData('low');
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
            showNotification('Data contoh risiko rendah berhasil dimuat!', 'success');
        });
        
        // Fill example data - High Risk
        document.getElementById('exampleHigh').addEventListener('click', () => {
            fillExampleData('high');
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
            showNotification('Data contoh risiko tinggi berhasil dimuat!', 'warning');
        });
        
        // Close modal
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        });
    }
    
    // =====================================================
    // Fill Example Data
    // =====================================================
    function fillExampleData(type) {
        const exampleData = {
            low: {
                // Data risiko rendah - nasabah dengan profil baik
                limit_bal: 500000,
                age: 35,
                sex: 1,  // Laki-laki
                education: 2,  // University
                marriage: 1,  // Menikah
                payment_status_sep: -1,  // Bayar tepat waktu
                payment_status_aug: -1,
                payment_status_jul: -1,
                payment_status_jun: -1,
                payment_status_may: -1,
                payment_status_apr: -1,
                bill_statement_sep: 45000,
                bill_statement_aug: 38000,
                bill_statement_jul: 42000,
                bill_statement_jun: 35000,
                bill_statement_may: 40000,
                bill_statement_apr: 38000,
                previous_payment_sep: 45000,  // Selalu bayar penuh
                previous_payment_aug: 38000,
                previous_payment_jul: 42000,
                previous_payment_jun: 35000,
                previous_payment_may: 40000,
                previous_payment_apr: 38000
            },
            high: {
                // Data risiko tinggi - nasabah dengan profil buruk
                limit_bal: 50000,
                age: 28,
                sex: 2,  // Perempuan
                education: 3,  // High School
                marriage: 2,  // Lajang
                payment_status_sep: 2,  // Terlambat 2 bulan
                payment_status_aug: 3,  // Terlambat 3 bulan
                payment_status_jul: 2,
                payment_status_jun: 1,  // Terlambat 1 bulan
                payment_status_may: 2,
                payment_status_apr: 0,
                bill_statement_sep: 48000,
                bill_statement_aug: 49500,
                bill_statement_jul: 47000,
                bill_statement_jun: 45000,
                bill_statement_may: 42000,
                bill_statement_apr: 40000,
                previous_payment_sep: 5000,  // Bayar sangat sedikit
                previous_payment_aug: 3000,
                previous_payment_jul: 4000,
                previous_payment_jun: 10000,
                previous_payment_may: 8000,
                previous_payment_apr: 15000
            }
        };
        
        const data = exampleData[type];
        
        // Fill form with animation
        Object.keys(data).forEach((key, index) => {
            setTimeout(() => {
                const input = document.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = data[key];
                    input.dispatchEvent(new Event('input'));
                    input.classList.add('bounce-in');
                    setTimeout(() => input.classList.remove('bounce-in'), 600);
                }
            }, index * 50);  // Stagger animation
        });
        
        // Update progress after all fields filled
        setTimeout(() => {
            updateProgress();
        }, Object.keys(data).length * 50 + 100);
    }
    
    // =====================================================
    // Keyboard Shortcuts
    // =====================================================
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter = Submit
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            submitBtn.click();
        }
        
        // Ctrl/Cmd + R = Reset (override default)
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            if (fabReset) fabReset.click();
        }
        
        // F1 = Help
        if (e.key === 'F1') {
            e.preventDefault();
            showHelpModal();
        }
        
        // F2 = Example Data
        if (e.key === 'F2') {
            e.preventDefault();
            showExampleModal();
        }
    });
    
    // =====================================================
    // Smooth Scroll untuk Form Sections
    // =====================================================
    const formSections = document.querySelectorAll('.form-section');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    formSections.forEach(section => observer.observe(section));
    
    // =====================================================
    // Inisialisasi
    // =====================================================
    loadFormData();
    updateProgress();
    
    // Welcome message
    setTimeout(() => {
        showNotification('Selamat datang! Klik tombol 📋 untuk mengisi contoh data otomatis.', 'info');
    }, 500);
    
});

// =========================================================
// Utility Functions
// =========================================================

// Format currency untuk tampilan
function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value);
}

// Debounce function untuk optimasi performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Animasi konfeti untuk hasil sukses (opsional)
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

