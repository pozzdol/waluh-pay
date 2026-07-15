# PRD — Waluh Pay

> **Product Requirements Document**
> Produk: **Waluh Pay** — Website E-Commerce Produk Digital (PPOB)
> Versi: 1.1 (Draft)
> Tanggal: 15 Juli 2026
> Pemilik Produk: Fikri Anshori (fikri.anshori@tatametal.com)
> Status: Draft untuk direview

---

## 1. Ringkasan Eksekutif

Membangun **Waluh Pay**, website e-commerce untuk menjual **produk digital** (pulsa, paket data, token listrik PLN, tagihan, e-money, voucher game, dsb.) kepada **konsumen ritel** secara langsung. Pelanggan dapat membeli tanpa wajib mendaftar (guest checkout) dan membayar per transaksi melalui payment gateway. Seluruh katalog produk dikelola secara mandiri oleh admin melalui **admin panel** tanpa perlu deploy ulang.

Sistem dirancang **provider-agnostic**: pengambilan produk dari supplier (aggregator H2H) dan pemrosesan pembayaran (payment gateway) dibungkus dalam lapisan abstraksi sehingga supplier/gateway dapat ditambah atau diganti tanpa mengubah logika inti.

---

## 2. Tujuan & Sasaran

### 2.1 Tujuan Bisnis
- Menyediakan platform jual-beli produk digital yang cepat, andal, dan mudah dipakai konsumen umum.
- Memungkinkan pemilik mengelola katalog, harga, dan margin secara mandiri.
- Menghasilkan pendapatan dari selisih harga jual vs harga modal produk digital.

### 2.2 Sasaran Produk (MVP)
- Konsumen dapat menyelesaikan pembelian pulsa/token dalam < 60 detik tanpa perlu login.
- Admin dapat menambah/mengubah/menghapus produk & harga sepenuhnya lewat panel.
- Pembayaran otomatis terverifikasi via callback gateway (tanpa konfirmasi manual).
- Tingkat keberhasilan transaksi (sukses/total) > 95% setelah pembayaran diterima.

### 2.3 Non-Goals (di luar cakupan v1)
- Sistem keagenan/reseller berjenjang dengan harga per level.
- Aplikasi mobile native (fokus web responsif dulu).
- Sistem saldo/deposit pelanggan (pembayaran murni per transaksi).
- Multi-bahasa/multi-mata uang (Indonesia & IDR dulu).

---

## 3. Identitas Visual (Branding)

- **Nama produk:** Waluh Pay
- **Logo:** ikon labu/waluh; tersedia varian *primary* (ikon + wordmark), *app icon* (ikon saja, sudut membulat), dan *monochrome* (hitam-di-putih & putih-di-gelap).
- **Palet warna:**
  | Peran | Hex | Penggunaan |
  |---|---|---|
  | Primary (Hijau) | `#4CAF50` | Warna utama brand: tombol utama (CTA), header, aksen, tautan aktif. |
  | Accent (Kuning) | `#FFEB3B` | Sorotan/aksen sekunder, badge, indikator, highlight. |
  | Netral gelap | `~#2E2E2E` | Teks utama & latar varian gelap (monochrome white-on-dark). |
  | Netral terang | `#FFFFFF` | Latar utama & teks di atas hijau. |
- **Aset yang tersedia:** file vektor sumber **AI, EPS, SVG**; SVG dipakai di web (favicon, header, app icon PWA) agar tajam di semua ukuran.
- **Panduan pemakaian:**
  - Gunakan varian *primary* di header/beranda; *app icon* untuk favicon & ikon PWA; *monochrome* untuk struk/invoice cetak & konteks satu warna.
  - Hijau `#4CAF50` sebagai warna dominan; kuning `#FFEB3B` hanya sebagai aksen (bukan warna teks tubuh) demi kontras & keterbacaan.
  - Terapkan sebagai design token (mis. variabel CSS / konfigurasi Tailwind) agar konsisten di seluruh UI (pelanggan & admin).

---

## 4. Persona Pengguna

| Persona | Deskripsi | Kebutuhan Utama |
|---|---|---|
| **Pembeli tamu (Guest)** | Konsumen yang ingin beli cepat tanpa repot daftar. | Alur beli singkat, input nomor tujuan mudah, bayar cepat, terima notifikasi. |
| **Pembeli terdaftar** | Konsumen yang sering bertransaksi & ingin simpan riwayat. | Riwayat transaksi, simpan nomor favorit, cek status pesanan. |
| **Admin/Operator** | Pengelola toko (pemilik). | Kelola produk & harga, pantau transaksi, kelola promo, lihat laporan, tangani transaksi gagal. |

---

## 5. Ruang Lingkup Fitur

### 5.1 Sisi Pelanggan (Customer-Facing)

**Katalog & Pencarian**
- Halaman beranda dengan kategori produk (Pulsa, Paket Data, Token PLN, Tagihan, E-Money, Voucher Game, dll — kategori dikelola admin).
- Halaman kategori/produk dengan daftar nominal & harga.
- Pencarian produk dan filter berdasarkan kategori/operator.

**Alur Pembelian (Checkout)**
1. Pilih kategori & produk/nominal.
2. Masukkan data tujuan (mis. nomor HP, ID pelanggan PLN) — dengan validasi format & deteksi operator otomatis (mis. prefix nomor).
3. (Opsional) Masukkan **kode promo/diskon**.
4. Masukkan kontak (email/no. HP) untuk pengiriman struk/notifikasi — **guest checkout**.
5. Ringkasan pesanan → pilih metode bayar → redirect/checkout via payment gateway.
6. Halaman status pesanan (menunggu bayar → dibayar → diproses → sukses/gagal).

**Akun (Opsional)**
- Registrasi & login (email/password; opsi OTP no. HP dapat menyusul).
- Dashboard: riwayat transaksi, status, cetak/unduh struk, simpan nomor favorit.
- Guest bisa cek status via kode invoice + kontak.

**Notifikasi**
- Notifikasi status transaksi via email (MVP). WhatsApp/SMS sebagai peningkatan.

### 5.2 Admin Panel

**Manajemen Produk (inti)**
- CRUD kategori produk.
- CRUD produk: kode produk, nama, kategori, deskripsi, harga modal, harga jual, status aktif/nonaktif, gangguan (maintenance), stok/ketersediaan.
- Pengaturan margin/markup (per produk atau per kategori) untuk hitung harga jual otomatis.
- Import/sinkronisasi harga dari supplier (bila supplier H2H diaktifkan) + opsi override manual.

**Manajemen Transaksi**
- Daftar transaksi dengan filter (status, tanggal, kategori, kata kunci).
- Detail transaksi: data pelanggan, produk, status pembayaran, status pengiriman produk, log callback.
- Aksi manual: retry pengiriman, tandai sukses/gagal, refund/tandai refund.

**Manajemen Promo**
- CRUD kode promo/diskon: tipe (persen/nominal), nilai, minimal transaksi, kuota, batas per pengguna, periode berlaku, kategori/produk yang berlaku.

**Laporan & Dashboard**
- Ringkasan: jumlah transaksi, omzet, laba kotor (jual − modal), transaksi gagal.
- Laporan per periode & ekspor (CSV/Excel).

**Pengaturan & Pengguna**
- Manajemen user admin & peran (role): Super Admin, Operator (RBAC sederhana).
- Konfigurasi payment gateway & supplier (kredensial, mode sandbox/production).
- Pengaturan umum toko (nama, logo, kontak, halaman statis: TOS, kebijakan privasi).

---

## 6. Integrasi Eksternal

### 6.1 Payment Gateway
- **Utama (rekomendasi): Tripay** — mendukung pendaftaran **perorangan tanpa PT/CV**, menyediakan channel QRIS, Virtual Account, e-wallet, retail (Alfamart/Indomaret). Cocok untuk memulai cepat.
- **Alternatif: Duitku** — fitur serupa; juga mendukung perorangan.
- **Persyaratan desain:** dibungkus dalam interface `PaymentGateway` (mis. `createTransaction()`, `handleCallback()`, `getStatus()`) sehingga bisa berganti provider tanpa mengubah alur checkout.
- **Alur:** buat transaksi → dapat instruksi/URL bayar → pelanggan bayar → gateway kirim **callback/webhook** → sistem verifikasi signature → tandai lunas → picu pengiriman produk.
- **Wajib:** verifikasi signature callback, idempotensi (callback bisa datang berkali-kali), pencocokan nominal.

### 6.2 Supplier Produk Digital (Provider-Agnostic)
- v1 dirancang agar **tidak terikat satu supplier**. Dibungkus interface `ProductSupplier` (mis. `checkPrice()`, `purchase()`, `checkStatus()`).
- Mode operasi yang didukung:
  - **Manual/off:** admin input produk & harga manual; pengiriman produk dicatat manual (untuk tahap awal/uji coba).
  - **H2H otomatis:** siap dihubungkan ke aggregator (mis. Digiflazz atau sejenis) untuk sync harga & transaksi otomatis — diaktifkan lewat konfigurasi tanpa ubah kode inti.
- Menangani status asinkron dari supplier (pending → sukses/gagal) dan menyimpan nomor seri/token pada respons sukses.

---

## 7. Kebutuhan Non-Fungsional

| Aspek | Kebutuhan |
|---|---|
| **Keamanan** | HTTPS wajib; verifikasi signature webhook; proteksi CSRF; validasi & sanitasi input; rate limiting endpoint publik & callback; kredensial supplier/gateway disimpan sebagai secret (env), tidak di repo. |
| **Keandalan** | Idempotensi callback & pembelian; state machine transaksi yang jelas; retry pengiriman produk; log audit tiap perubahan status. |
| **Performa** | Halaman katalog cepat (cache harga produk); pemrosesan transaksi & callback via **queue/worker** agar tidak blocking. |
| **Skalabilitas** | Abstraksi supplier & gateway; struktur data siap menampung banyak produk & transaksi. |
| **Observability** | Logging terstruktur untuk transaksi, callback, dan error; dashboard status dasar. |
| **Kepatuhan** | Halaman Syarat & Ketentuan, Kebijakan Privasi, kebijakan refund; penyimpanan data pelanggan seminimal mungkin. |
| **Kompatibilitas** | Web responsif (mobile-first), mendukung browser modern. |

---

## 8. Arsitektur & Teknologi

### 8.1 Tech Stack
- **Backend:** Laravel (PHP) — terbaru LTS/stable.
- **Frontend:** **Inertia.js + React** (SPA-like tanpa REST API terpisah).
- **Database:** MySQL/MariaDB (atau PostgreSQL).
- **Queue:** Laravel Queue (database/Redis) untuk pemrosesan transaksi & webhook.
- **Cache:** Redis (opsional, untuk harga/katalog).
- **Auth:** Laravel Breeze/Fortify (adaptasi Inertia+React) untuk akun; guest checkout tanpa auth.
- **Admin panel:** dibangun dalam aplikasi yang sama (rute & layout terpisah, dilindungi RBAC).

### 8.2 Model Data (Entitas Awal)
- **users** — akun pelanggan & admin (kolom `role`).
- **categories** — kategori produk.
- **products** — kode, nama, kategori_id, deskripsi, harga_modal, harga_jual/markup, status, tipe input tujuan.
- **suppliers** — konfigurasi supplier (nama, driver, kredensial, status).
- **transactions** — invoice, produk_id, data tujuan, nominal, harga_modal, harga_jual, status_pembayaran, status_pengiriman, user_id (nullable/guest), kontak, kode_promo_id (nullable), serial/token hasil.
- **payments** — transaction_id, gateway, reference, amount, status, payload callback.
- **promos** — kode, tipe, nilai, syarat, kuota, periode, cakupan produk/kategori.
- **promo_redemptions** — pemakaian promo per transaksi/pengguna.
- **transaction_logs** — audit perubahan status & event supplier/gateway.

### 8.3 Alur Transaksi (State Machine)
```
DRAFT → PENDING_PAYMENT → PAID → PROCESSING → SUCCESS
                        ↘ EXPIRED / FAILED_PAYMENT
                                      PROCESSING → FAILED (refund/retry)
```

---

## 9. Roadmap / Fase Pengembangan

**Fase 0 — Fondasi**
Setup Laravel + Inertia + React, auth dasar, layout, RBAC admin.

**Fase 1 — MVP Inti**
- Admin: CRUD kategori & produk, pengaturan markup.
- Katalog publik + checkout guest.
- Integrasi Tripay (sandbox) + webhook + state machine transaksi.
- Mode supplier "manual".
- Notifikasi email + halaman status transaksi.

**Fase 2 — Otomasi & Promo**
- Integrasi supplier H2H (driver pertama) + sync harga otomatis.
- Kode promo/diskon.
- Dashboard & laporan admin, ekspor.

**Fase 3 — Peningkatan**
- Akun pelanggan lengkap (riwayat, nomor favorit).
- Notifikasi WhatsApp/SMS.
- Gateway kedua (Duitku) via abstraksi.
- Optimasi performa & observability.

---

## 10. Metrik Keberhasilan
- Conversion rate checkout (mulai checkout → bayar).
- Success rate transaksi setelah pembayaran (> 95%).
- Waktu rata-rata penyelesaian transaksi.
- Omzet & laba kotor per periode.
- Rasio transaksi gagal & waktu penyelesaian komplain.

---

## 11. Risiko & Asumsi

**Risiko**
- Ketergantungan pada uptime & kebijakan payment gateway/supplier.
- Callback ganda/terlambat → wajib idempotensi.
- Fraud/penyalahgunaan promo → butuh batas kuota & validasi.
- Selisih harga modal berubah sewaktu-waktu → butuh sync/harga real-time saat H2H aktif.

**Asumsi**
- Pemilik mendaftar payment gateway sebagai perorangan (Tripay/Duitku).
- Pasar & mata uang: Indonesia, IDR.
- Volume awal skala kecil–menengah; arsitektur single-instance + queue mencukupi di awal.

---

## 12. Pertanyaan Terbuka (untuk diklarifikasi berikutnya)
1. Kategori & daftar produk spesifik untuk peluncuran awal (walau dikelola via admin, perlu contoh awal).
2. Kebijakan refund/komplain untuk transaksi gagal.
3. Apakah perlu OTP/verifikasi no. HP untuk pendaftaran?
4. Target waktu peluncuran MVP.
5. Nama domain untuk Waluh Pay (mis. waluhpay.com / .id).

---

*Dokumen ini adalah draft awal. Perubahan keputusan bisnis akan memengaruhi cakupan dan estimasi.*
