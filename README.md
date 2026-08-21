# 📝 To-Do List App

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=javascript&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

Aplikasi manajemen tugas sederhana berbasis web ✅, dibuat menggunakan **Node.js**, **Express.js**, **EJS**, dan **MySQL**. Project ini dibuat sebagai latihan memahami konsep **CRUD** (Create, Read, Update, Delete) pada aplikasi web.

---

## ✨ Fitur

- ➕ Menambahkan tugas baru
- 📋 Melihat daftar tugas
- ✔️ Menandai tugas sebagai selesai / belum selesai
- 🗑️ Menghapus tugas

---

## 🛠️ Tech Stack

| Teknologi | Kegunaan |
|---|---|
| 🟢 **Node.js** | Runtime JavaScript |
| 🚂 **Express.js** | Web framework |
| 🎨 **EJS** | Template engine untuk render halaman |
| 🐬 **MySQL** | Database (menggunakan library `mysql2`) |
| 🔐 **dotenv** | Mengelola environment variable |

---

## 📁 Struktur Project

```
todo-app/
├── 📂 config/
│   └── db.js          # koneksi ke MySQL
├── 📂 public/
│   └── style.css       # styling halaman
├── 📂 views/
│   └── index.ejs       # tampilan utama
├── 📄 app.js            # entry point aplikasi
├── 📄 package.json
└── 🔒 .env              # kredensial database (tidak di-push ke repo)
```

---

## 🗄️ Persiapan Database

Buat database dan tabel berikut di MySQL sebelum menjalankan aplikasi:

```sql
CREATE DATABASE todo_db;

USE todo_db;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    is_done BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Instalasi & Menjalankan Aplikasi

1️⃣ Clone repository ini
```bash
git clone <url-repo-ini>
cd todo-app
```

2️⃣ Install dependency
```bash
npm install
```

3️⃣ Buat file `.env` di root project, sesuaikan dengan konfigurasi MySQL kamu
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=todo_db
```

4️⃣ Jalankan aplikasi
```bash
node app.js
```

5️⃣ Buka browser dan akses

```
http://localhost:3000
```

---

## 🧭 Rencana Pengembangan Selanjutnya

- [ ] 🏷️ Tambah kategori tugas
- [ ] ⏰ Tambah deadline dan prioritas
- [ ] 🔑 Autentikasi user (login/register)
- [ ] 🔍 Fitur pencarian dan filter tugas

---

## 📄 Lisensi

Project ini dibuat untuk keperluan belajar 📚 dan bebas digunakan.

---

<p align="center">Made with ❤️ By Wahyu H. using Node.js</p>
