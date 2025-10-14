# 🏦 Sistem Prediksi Risiko Gagal Bayar Kartu Kredit

[![Python](https://img.shields.io/badge/Python-3.10-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)](https://flask.palletsprojects.com/)
[![Machine Learning](https://img.shields.io/badge/ML-Logistic_Regression-orange.svg)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Aplikasi web berbasis Machine Learning untuk memprediksi risiko gagal bayar kartu kredit menggunakan Logistic Regression. Sistem ini membantu institusi keuangan dalam menilai kelayakan kredit nasabah.

## ✨ Fitur Utama

### 🎨 **Interface Modern & Interaktif**
- ✅ Desain modern dengan animasi smooth
- ✅ Validasi input real-time
- ✅ Progress bar dinamis
- ✅ Auto-save form (localStorage)
- ✅ Tooltips informatif
- ✅ Dark/Light gradient theme

### 🚀 **Fitur Produktivitas**
- 📋 **Pengisian Contoh Data Otomatis** - Demo cepat dengan 1 klik (F2)
- 💾 **Auto-save** - Data tersimpan otomatis setiap 3 detik
- ⌨️ **Keyboard Shortcuts** - Navigasi cepat untuk power users
- 🎯 **Loading States** - Feedback visual untuk setiap aksi

### 📊 **Hasil Prediksi Lengkap**
- Progress circle animasi
- Rekomendasi aksi berdasarkan risiko
- Print & share functionality
- Copy hasil ke clipboard
- Konfeti animation untuk hasil positif

### 🛠️ **Developer-Friendly**
- CSS & JS terpisah dari HTML
- Struktur folder terorganisir
- Well-documented code
- Responsive design
- No external dependencies (pure vanilla JS)

## 📂 Struktur Folder

```
Prediksi-Risiko-Gagal-Bayar-Kartu-Kredit/
│
├── 📁 app.py                    # Main Flask application
├── 📁 requirements.txt          # Python dependencies
├── 📁 runtime.txt              # Python version untuk deployment
├── 📁 Procfile                 # Heroku deployment config
├── 📁 test_app.py              # Unit tests
│
├── 📂 data/                    # Dataset
│   └── credit_card_default.csv
│
├── 📂 models/                  # Machine Learning models
│   ├── logreg_credit_model.pkl
│   └── scaler_credit.pkl
│
├── 📂 notebooks/               # Jupyter notebooks
│   └── train.ipynb             # Model training notebook
│
├── 📂 templates/               # HTML templates
│   ├── index.html              # Halaman utama (form input)
│   └── result.html             # Halaman hasil prediksi
│
├── 📂 static/                  # Static assets
│   ├── 📂 css/
│   │   ├── styles.css          # Main page styles
│   │   └── result.css          # Result page styles
│   └── 📂 js/
│       ├── main.js             # Main page interactivity
│       ├── result.js           # Result page interactivity
│       └── test-interactive.js # Testing script
│
└── 📂 docs/                    # Dokumentasi lengkap
    ├── FITUR_BARU_CONTOH_DATA.txt
    ├── RINGKASAN_PERBAIKAN.txt
    └── RINGKASAN_UPDATE.txt
```

## 🚀 Quick Start

### Prerequisites
- Python 3.10 atau lebih tinggi
- pip (Python package manager)

### Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/your-username/Prediksi-Risiko-Gagal-Bayar-Kartu-Kredit.git
   cd Prediksi-Risiko-Gagal-Bayar-Kartu-Kredit
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Jalankan aplikasi**
   ```bash
   python app.py
   ```

4. **Buka browser**
   ```
   http://localhost:5000
   ```

## 💡 Cara Menggunakan

### 1. Pengisian Manual
1. Buka aplikasi di browser
2. Isi semua field yang diperlukan
3. Data akan auto-save setiap 3 detik
4. Klik tombol "Prediksi Risiko Sekarang"
5. Lihat hasil prediksi

### 2. Pengisian Otomatis (Untuk Demo/Testing)
1. Klik tombol **📋** di kanan bawah (atau tekan `F2`)
2. Pilih contoh data:
   - ✅ **Risiko Rendah** - Nasabah dengan profil baik
   - ⚠️ **Risiko Tinggi** - Nasabah dengan profil bermasalah
3. Form terisi otomatis dalam 2 detik
4. Submit dan lihat hasil

### 3. Keyboard Shortcuts
**Halaman Utama:**
- `F2` - Isi contoh data otomatis
- `F1` - Buka bantuan
- `Ctrl + Enter` - Submit form
- `Ctrl + R` - Reset form

**Halaman Hasil:**
- `P` - Print hasil
- `C` - Copy hasil
- `Backspace/Escape` - Kembali

## 📊 Fitur Input

### Data yang Diperlukan:
1. **Data Pribadi**
   - Limit Kredit (Rp)
   - Usia (tahun)
   - Jenis Kelamin
   - Pendidikan
   - Status Pernikahan

2. **Status Pembayaran** (6 bulan terakhir)
   - -2/-1 = Bayar tepat waktu
   - 0 = Tidak ada transaksi
   - 1-8 = Terlambat 1-8 bulan

3. **Jumlah Tagihan** (6 bulan terakhir)
   - Dalam Rupiah (Rp)

4. **Jumlah Pembayaran** (6 bulan terakhir)
   - Dalam Rupiah (Rp)

## 🎯 Output Prediksi

### Risiko Rendah ✅
- Probabilitas < 50%
- Badge hijau
- Rekomendasi: Pertimbangkan peningkatan limit

### Risiko Tinggi ⚠️
- Probabilitas > 50%
- Badge merah
- Rekomendasi: Verifikasi ulang, monitoring ketat

## 🔧 Teknologi yang Digunakan

### Backend
- **Flask 3.0.0** - Web framework
- **scikit-learn 1.3.2** - Machine Learning
- **pandas 2.1.4** - Data manipulation
- **numpy 1.26.2** - Numerical computing
- **joblib 1.3.2** - Model persistence

### Frontend
- **HTML5** - Struktur
- **CSS3** - Styling (Flexbox, Grid, Animations)
- **JavaScript ES6+** - Interactivity
- **No external libraries** - Pure vanilla JS

### Machine Learning
- **Algorithm**: Logistic Regression
- **Features**: 24 features
- **Preprocessing**: StandardScaler

## 📈 Model Performance

- **Accuracy**: ~82%
- **Precision**: ~67%
- **Recall**: ~38%
- **F1-Score**: ~48%

*Catatan: Model dioptimalkan untuk meminimalkan false positives (mengurangi risiko memberikan kredit kepada nasabah berisiko tinggi)*

## 🧪 Testing

Jalankan unit tests:
```bash
python -m pytest test_app.py -v
```

Atau:
```bash
python test_app.py
```

## 📚 Dokumentasi Lengkap

Lihat folder `docs/` untuk dokumentasi detail:
- **FITUR_BARU_CONTOH_DATA.txt** - Panduan fitur contoh data
- **RINGKASAN_UPDATE.txt** - Ringkasan update terbaru
- **RINGKASAN_PERBAIKAN.txt** - Changelog perbaikan

## 🚀 Deployment

### Heroku
```bash
git push heroku main
```

### Requirements
- File sudah disediakan: `Procfile`, `runtime.txt`
- Pastikan semua dependencies ada di `requirements.txt`

## 🤝 Contributing

Kontribusi sangat diterima! Silakan:
1. Fork repository
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Dataset: UCI Machine Learning Repository
- Icons: Emoji Unicode
- Inspiration: Financial risk assessment systems

## 📞 Support

Jika ada pertanyaan atau masalah:
1. Buka [Issues](https://github.com/yourusername/repo/issues)
2. Baca dokumentasi di folder `docs/`
3. Hubungi via email

---

<div align="center">
  
  **Dibuat dengan ❤️ menggunakan Python & Flask**
  
  ⭐ Star repository ini jika bermanfaat!
  
</div>
