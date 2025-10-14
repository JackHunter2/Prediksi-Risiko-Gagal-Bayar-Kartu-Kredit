# 📋 Fitur Pengisian Contoh Data Otomatis

## 🎯 Deskripsi

Fitur ini memungkinkan pengguna untuk mengisi form secara otomatis dengan data contoh untuk keperluan demo dan testing.

## ✨ Cara Menggunakan

### Metode 1: Tombol Floating
1. Klik tombol **📋** di kanan bawah layar
2. Pilih jenis contoh data yang diinginkan:
   - **✅ Contoh Risiko Rendah** - Nasabah dengan profil baik
   - **⚠️ Contoh Risiko Tinggi** - Nasabah dengan profil buruk
3. Form akan terisi otomatis dengan animasi

### Metode 2: Keyboard Shortcut
- Tekan **F2** untuk membuka modal contoh data
- Pilih contoh yang diinginkan

## 📊 Data Contoh

### Risiko Rendah (Nasabah Baik)

**Profil:**
- Limit Kredit: Rp 500.000
- Usia: 35 tahun
- Jenis Kelamin: Laki-laki
- Pendidikan: University
- Status Pernikahan: Menikah

**Riwayat Pembayaran:**
- Status: Selalu bayar tepat waktu (-1)
- Semua bulan: Bayar penuh sesuai tagihan

**Karakteristik:**
- Pembayaran konsisten
- Tidak pernah terlambat
- Bayar penuh setiap bulan
- **Prediksi: RISIKO RENDAH**

---

### Risiko Tinggi (Nasabah Bermasalah)

**Profil:**
- Limit Kredit: Rp 50.000
- Usia: 28 tahun
- Jenis Kelamin: Perempuan
- Pendidikan: High School
- Status Pernikahan: Lajang

**Riwayat Pembayaran:**
- Status: Sering terlambat 2-3 bulan
- Pembayaran: Sangat minimal (hanya 5.000-10.000)

**Karakteristik:**
- Pembayaran tidak konsisten
- Sering terlambat
- Bayar sangat sedikit
- Tagihan terus menumpuk
- **Prediksi: RISIKO TINGGI**

## 🎨 Fitur Visual

### Animasi Pengisian
- Form terisi dengan **animasi stagger** (berurutan)
- Setiap field memiliki **bounce effect** saat terisi
- **Progress bar** update secara real-time
- **Notifikasi** muncul setelah data dimuat

### Modal Interaktif
- **Hover effect** pada card contoh
- **Shadow** saat mouse hover
- **Slide animation** saat buka/tutup
- **Click anywhere** untuk menutup modal

## ⌨️ Keyboard Shortcuts

| Shortcut | Fungsi |
|----------|--------|
| `F2` | Buka modal contoh data |
| `Esc` | Tutup modal |
| Click outside | Tutup modal |

## 💡 Use Cases

### 1. Demo untuk Klien
```
1. Buka aplikasi
2. Klik tombol 📋
3. Pilih "Contoh Risiko Rendah"
4. Submit dan tunjukkan hasil
5. Reset form
6. Pilih "Contoh Risiko Tinggi"
7. Submit dan bandingkan hasil
```

### 2. Testing Cepat
- Developer bisa cepat test aplikasi
- Tidak perlu isi manual 24 field
- Bisa test kedua skenario (tinggi & rendah)

### 3. Pelatihan User
- User baru bisa belajar dari contoh
- Memahami perbedaan risiko tinggi vs rendah
- Melihat korelasi input dengan output

## 🔧 Customization

### Menambah Contoh Baru

Edit file `static/js/main.js` di fungsi `fillExampleData()`:

```javascript
const exampleData = {
    low: { ... },
    high: { ... },
    // Tambahkan contoh baru
    medium: {
        limit_bal: 250000,
        age: 30,
        // ... field lainnya
    }
};
```

### Mengubah Data Contoh

Edit nilai di `exampleData` sesuai kebutuhan:

```javascript
low: {
    limit_bal: 500000,  // Ubah nilai ini
    age: 35,            // Ubah nilai ini
    // ...
}
```

### Mengubah Kecepatan Animasi

Ubah delay di baris:

```javascript
}, index * 50);  // 50ms per field, ubah sesuai keinginan
```

## 📝 Implementasi Teknis

### File yang Dimodifikasi
1. `static/js/main.js` - Logika pengisian data
2. `templates/index.html` - Tombol floating

### Fungsi Utama
- `showExampleModal()` - Menampilkan modal pilihan
- `fillExampleData(type)` - Mengisi form dengan data
- Event listeners untuk click & keyboard

### Data Flow
```
User Click 📋 
  → Modal muncul 
  → User pilih risiko 
  → fillExampleData() dipanggil
  → Form terisi dengan animasi
  → Progress bar update
  → Notifikasi muncul
```

## 🎯 Benefits

### Untuk User
✅ Hemat waktu - tidak perlu isi manual  
✅ Belajar dari contoh - memahami pola data  
✅ Demo cepat - tunjukkan ke orang lain  
✅ Testing mudah - coba berbagai skenario  

### Untuk Developer
✅ Testing lebih cepat  
✅ Demo lebih profesional  
✅ Debugging lebih mudah  
✅ Onboarding user lebih baik  

## 📊 Statistik

- **Waktu pengisian manual**: ~2-3 menit
- **Waktu dengan contoh data**: ~2 detik
- **Hemat waktu**: ~98%
- **Field yang terisi**: 24 field

## 🚀 Future Enhancement Ideas

1. **Lebih Banyak Contoh**
   - Risiko medium
   - Berbagai profesi
   - Berbagai umur

2. **Random Generator**
   - Generate data random realistic
   - Variasi lebih banyak

3. **Save Custom Example**
   - User bisa save data sendiri
   - Reuse untuk testing

4. **Import from CSV**
   - Load data dari file
   - Batch testing

## 🐛 Troubleshooting

**Q: Data tidak terisi semua?**  
A: Refresh halaman dan coba lagi. Pastikan tidak ada error di console.

**Q: Animasi terlalu cepat/lambat?**  
A: Edit delay di `fillExampleData()` di main.js

**Q: Modal tidak muncul?**  
A: Cek console untuk error JavaScript. Pastikan main.js ter-load dengan baik.

**Q: Shortcut F2 tidak berfungsi?**  
A: Beberapa browser/OS mungkin override F2. Gunakan tombol 📋 sebagai alternatif.

## 📞 Support

Jika ada pertanyaan atau saran untuk contoh data:
1. Buka issue di repository
2. Hubungi developer
3. Lihat dokumentasi lengkap di UPDATE_INTERAKTIF.md

---

**Happy Testing! 🚀**

Nikmati kemudahan mengisi form dengan sekali klik!

