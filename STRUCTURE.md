# 📁 Struktur Folder Project

Dokumen ini menjelaskan struktur folder dan file dalam project **Sistem Prediksi Risiko Gagal Bayar Kartu Kredit**.

## 🌳 Tree Structure

```
Prediksi-Risiko-Gagal-Bayar-Kartu-Kredit/
│
├── 📄 app.py                           # Main Flask application
├── 📄 README.md                        # Dokumentasi utama project
├── 📄 STRUCTURE.md                     # Dokumentasi struktur (file ini)
├── 📄 .gitignore                       # Git ignore rules
├── 📄 requirements.txt                 # Python dependencies
├── 📄 runtime.txt                      # Python runtime version
├── 📄 Procfile                         # Heroku deployment config
├── 📄 test_app.py                      # Unit tests untuk aplikasi
│
├── 📂 data/                            # Dataset folder
│   └── 📊 credit_card_default.csv      # Dataset kartu kredit
│
├── 📂 models/                          # Machine Learning models
│   ├── 🤖 logreg_credit_model.pkl      # Trained Logistic Regression model
│   └── 📏 scaler_credit.pkl            # StandardScaler untuk preprocessing
│
├── 📂 notebooks/                       # Jupyter notebooks
│   └── 📓 train.ipynb                  # Notebook untuk training model
│
├── 📂 templates/                       # HTML templates (Flask)
│   ├── 🏠 index.html                   # Halaman utama (form input)
│   └── 📊 result.html                  # Halaman hasil prediksi
│
├── 📂 static/                          # Static assets
│   ├── 📂 css/                         # Stylesheets
│   │   ├── 🎨 styles.css               # Styling halaman utama
│   │   └── 🎨 result.css               # Styling halaman hasil
│   │
│   └── 📂 js/                          # JavaScript files
│       ├── ⚡ main.js                   # Interactivity halaman utama
│       ├── ⚡ result.js                 # Interactivity halaman hasil
│       └── 🧪 test-interactive.js      # Testing script fitur interaktif
│
└── 📂 docs/                            # Dokumentasi lengkap
    ├── 📄 README.md                    # Index dokumentasi
    ├── 📄 FITUR_BARU_CONTOH_DATA.txt   # Panduan fitur contoh data
    ├── 📄 FITUR_CONTOH_DATA.md         # Dokumentasi fitur contoh data
    ├── 📄 FITUR_INTERAKTIF.md          # Dokumentasi fitur interaktif
    ├── 📄 UPDATE_INTERAKTIF.md         # Update guide fitur interaktif
    ├── 📄 RINGKASAN_UPDATE.txt         # Ringkasan update terbaru
    ├── 📄 RINGKASAN_PERBAIKAN.txt      # Changelog perbaikan
    ├── 📄 DEPLOYMENT_CHECKLIST.md      # Checklist deployment
    └── 📄 PERUBAHAN_DEPLOYMENT.md      # Panduan deployment
```

## 📋 Penjelasan Folder

### 🗂️ Root Directory

| File/Folder | Deskripsi | Penting |
|-------------|-----------|---------|
| `app.py` | Main Flask application, endpoint routes | ⭐⭐⭐ |
| `README.md` | Dokumentasi utama project | ⭐⭐⭐ |
| `STRUCTURE.md` | Dokumentasi struktur folder | ⭐⭐ |
| `.gitignore` | File yang diabaikan Git | ⭐⭐ |
| `requirements.txt` | Python dependencies | ⭐⭐⭐ |
| `runtime.txt` | Python version untuk deployment | ⭐⭐ |
| `Procfile` | Config untuk Heroku deployment | ⭐⭐ |
| `test_app.py` | Unit tests | ⭐⭐ |

### 📊 Folder `data/`

Berisi dataset yang digunakan untuk training dan testing model.

```
data/
└── credit_card_default.csv     # 30,000 baris data nasabah kartu kredit
```

**Kolom Dataset:**
- LIMIT_BAL: Limit kredit
- SEX: Jenis kelamin (1=male, 2=female)
- EDUCATION: Pendidikan (1=graduate, 2=university, 3=high school, 4=others)
- MARRIAGE: Status pernikahan (1=married, 2=single, 3=others)
- AGE: Usia
- PAY_0 - PAY_6: Status pembayaran 6 bulan terakhir
- BILL_AMT1 - BILL_AMT6: Jumlah tagihan 6 bulan
- PAY_AMT1 - PAY_AMT6: Jumlah pembayaran 6 bulan
- default.payment.next.month: Target (0=tidak default, 1=default)

### 🤖 Folder `models/`

Berisi model Machine Learning yang sudah di-training dan scaler.

```
models/
├── logreg_credit_model.pkl     # Logistic Regression model
└── scaler_credit.pkl            # StandardScaler
```

**Cara Load:**
```python
import joblib
model = joblib.load('models/logreg_credit_model.pkl')
scaler = joblib.load('models/scaler_credit.pkl')
```

### 📓 Folder `notebooks/`

Berisi Jupyter notebooks untuk eksplorasi data dan training model.

```
notebooks/
└── train.ipynb                  # Model training & evaluation
```

**Isi Notebook:**
1. Data loading & exploration
2. Data preprocessing
3. Feature engineering
4. Model training
5. Model evaluation
6. Model saving

### 🌐 Folder `templates/`

Berisi HTML templates untuk Flask web application.

```
templates/
├── index.html                   # Form input prediksi
└── result.html                  # Hasil prediksi
```

**Teknologi:**
- HTML5
- Jinja2 templating
- External CSS & JS

### 🎨 Folder `static/`

Berisi static assets (CSS, JavaScript, images).

#### CSS Files
```
static/css/
├── styles.css                   # Main page styling (8+ KB)
└── result.css                   # Result page styling (7+ KB)
```

**Fitur CSS:**
- CSS Variables untuk customization
- Responsive design (mobile-first)
- Animations & transitions
- Custom scrollbar
- Gradient backgrounds

#### JavaScript Files
```
static/js/
├── main.js                      # Main page interactivity (9+ KB)
├── result.js                    # Result page interactivity (7+ KB)
└── test-interactive.js          # Testing script
```

**Fitur JavaScript:**
- Validasi real-time
- Auto-save to localStorage
- Keyboard shortcuts
- Modal popups
- Animations
- Form auto-fill
- Pure vanilla JS (no dependencies)

### 📚 Folder `docs/`

Berisi semua dokumentasi lengkap project.

```
docs/
├── README.md                    # Index dokumentasi
├── FITUR_BARU_CONTOH_DATA.txt   # Panduan fitur auto-fill
├── FITUR_CONTOH_DATA.md         # Detail fitur contoh data
├── FITUR_INTERAKTIF.md          # Daftar fitur interaktif
├── UPDATE_INTERAKTIF.md         # Update guide
├── RINGKASAN_UPDATE.txt         # Ringkasan update
├── RINGKASAN_PERBAIKAN.txt      # Changelog
├── DEPLOYMENT_CHECKLIST.md      # Deployment checklist
└── PERUBAHAN_DEPLOYMENT.md      # Deployment guide
```

## 🔧 File Configuration

### `requirements.txt`
```txt
Flask==3.0.0
scikit-learn==1.3.2
pandas==2.1.4
numpy==1.26.2
joblib==1.3.2
```

### `runtime.txt`
```txt
python-3.10.11
```

### `Procfile`
```
web: python app.py
```

### `.gitignore`
- Python cache files (`__pycache__/`, `*.pyc`)
- Virtual environments (`venv/`, `env/`)
- IDE files (`.vscode/`, `.idea/`)
- OS files (`.DS_Store`, `Thumbs.db`)
- Log files (`*.log`)

## 📏 Konvensi Penamaan

### Files
- **Python**: `snake_case.py` (contoh: `test_app.py`)
- **Config**: `lowercase` atau `UPPERCASE` (contoh: `requirements.txt`, `Procfile`)
- **Docs**: `UPPERCASE_SNAKE.md/txt` (contoh: `README.md`, `RINGKASAN_UPDATE.txt`)

### Folders
- **Lowercase**: `data/`, `models/`, `docs/`
- **Plural**: Untuk folder yang berisi multiple items

### Variables & Functions (dalam code)
- **Python**: `snake_case`
- **JavaScript**: `camelCase`
- **CSS**: `kebab-case`

## 🚀 Alur Kerja File

### 1. Development Flow
```
notebooks/train.ipynb 
    ↓ (train model)
models/logreg_credit_model.pkl
    ↓ (load in app)
app.py
    ↓ (serve templates)
templates/index.html + static/css/styles.css + static/js/main.js
    ↓ (user input & submit)
app.py (predict route)
    ↓ (return result)
templates/result.html + static/css/result.css + static/js/result.js
```

### 2. Data Flow
```
data/credit_card_default.csv
    ↓ (read & preprocess)
notebooks/train.ipynb
    ↓ (train & save)
models/*.pkl
    ↓ (load & predict)
app.py
    ↓ (serve prediction)
User
```

## 📦 Ukuran File/Folder

| Folder/File | Size (approx) |
|-------------|---------------|
| `data/` | ~2 MB |
| `models/` | ~10 KB |
| `notebooks/` | ~500 KB |
| `static/css/` | ~15 KB |
| `static/js/` | ~20 KB |
| `templates/` | ~15 KB |
| `docs/` | ~100 KB |

**Total Project**: ~3 MB

## 🔒 File Penting (Jangan Dihapus!)

⚠️ **Critical Files:**
- `app.py` - Main application
- `models/*.pkl` - Trained models
- `requirements.txt` - Dependencies
- `templates/*.html` - Web pages

⚠️ **Important for Deployment:**
- `Procfile`
- `runtime.txt`
- `.gitignore`

✅ **Safe to Modify:**
- `static/css/*` - Styling
- `static/js/*` - Interactivity
- `docs/*` - Documentation
- `README.md` - Docs

## 🛠️ Maintenance

### Adding New Features
1. Update `app.py` untuk backend logic
2. Update templates untuk UI
3. Update static files untuk styling/interactivity
4. Update docs untuk dokumentasi
5. Update tests untuk testing

### Adding New Documentation
1. Buat file di `docs/`
2. Update `docs/README.md` index
3. Link dari main `README.md` jika perlu

### Cleaning Up
```bash
# Remove cache
rm -rf __pycache__

# Remove temp files
find . -name "*.pyc" -delete
find . -name ".DS_Store" -delete
```

## 📞 Kontak

Jika ada pertanyaan tentang struktur folder:
1. Baca dokumentasi di `docs/`
2. Check main `README.md`
3. Open issue di repository

---

**Struktur folder ini dirancang untuk:**
- ✅ Kemudahan navigasi
- ✅ Pemisahan concern (separation of concerns)
- ✅ Scalability
- ✅ Maintainability
- ✅ Best practices

*Dibuat dengan ❤️ untuk project yang terorganisir*

