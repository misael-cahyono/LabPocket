# 🔬 LabPocket (Laboratorium Saku 3D)

**LabPocket** adalah aplikasi web edukatif berbasis *Progressive Web App* (PWA) yang dirancang khusus untuk siswa SMA, SMP, dan SD sebagai alat bantu simulasi praktikum laboratorium 3D interaktif (Fisika, Kimia, dan Biologi). Aplikasi ini dapat diinstal langsung di HP layaknya aplikasi native dan dapat menyimpan data secara lokal menggunakan *LocalStorage*.

---

## 🚀 Fitur Utama
* **Simulasi 3D Interaktif:** Eksperimen Fisika, Kimia, dan Biologi langsung di layar HP menggunakan Three.js.
* **PWA (*Progressive Web App*):** Dapat diinstal di layar utama HP (`Add to Home Screen`) dan mendukung mode *offline*.
* **Presensi Kehadiran Siswa:** Memungkinkan siswa mencatat kehadiran harian secara digital.
* **Manajemen Tugas Guru:** Guru dapat menambahkan tugas praktikum baru lengkap dengan tenggat waktu (*deadline*).
* **Notifikasi Tugas & Suara (*Chime*):** Memberikan pemberitahuan dan suara lonceng saat ada tugas baru dari guru.
* **Catatan Praktikum & Kuis Mini:** Menyimpan catatan eksperimen siswa di memori lokal (*LocalStorage*) dan evaluasi pemahaman instan.
* **Mode Gelap (*Dark Mode*):** Mendukung kenyamanan belajar di malam hari.

---

## 📁 Struktur Folder Proyek

```text
lab-pocket/
├── index.html              # Halaman utama & Pilihan Peran (Siswa / Guru)
├── student-dashboard.html  # Dashboard Siswa (Presensi, Simulasi, Daftar Tugas)
├── teacher-dashboard.html  # Dashboard Guru (Form Tugas & Rekap Presensi)
├── manifest.json           # Konfigurasi PWA
├── sw.js                   # Service Worker (Dukungan Offline)
├── README.md               # Dokumentasi Proyek
├── css/
│   ├── style.css           # Styling global & Dark Mode
│   └── dashboard.css       # Styling khusus dashboard & kartu tugas
├── js/
│   ├── app.js              # Logika global & perpindahan tema
│   ├── student.js          # Logika presensi & catatan praktikum
│   ├── teacher.js          # Logika penyimpanan tugas guru
│   ├── notifications.js    # Logika notifikasi & audio chime
│   ├── simulation.js       # Logika render 3D (Three.js)
│   └── three.min.js        # Library Three.js
└── assets/
    ├── audio/
    │   └── notification.mp3 # Suara notifikasi tugas baru
    └── icons/
        ├── icon-192.png    # Ikon PWA 192x192
        └── icon-512.png    # Ikon PWA 512x512
