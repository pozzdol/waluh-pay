# SRS — Waluh Pay

> **Software Requirements Specification**
> Produk: **Waluh Pay** — Website E-Commerce Produk Digital (PPOB)
> Versi: 1.0 (Draft)
> Tanggal: 15 Juli 2026
> Pemilik Produk: Fikri Anshori (fikri.anshori@tatametal.com)
> Basis: PRD Waluh Pay v1.1 → dinaikkan ke level SRS
> Konvensi ID: `FR-xxx` (fungsional), `NFR-xxx` (non-fungsional), `IF-xxx` (antarmuka), `DR-xxx` (data).
> Penanda: **[TBC]** = perlu dikonfirmasi; **[ASM]** = asumsi/default yang diusulkan.

---

## 1. Pendahuluan

### 1.1 Tujuan
Dokumen ini menspesifikasikan kebutuhan Waluh Pay secara terukur dan dapat diverifikasi sebagai dasar desain, implementasi, dan pengujian. PRD menjawab *apa & mengapa*; SRS ini menjawab *harus berperilaku bagaimana dan bagaimana membuktikannya*.

### 1.2 Lingkup
Website e-commerce produk digital (pulsa, paket data, token PLN, tagihan, e-money, voucher game) untuk konsumen ritel dengan guest checkout, pembayaran per transaksi via payment gateway, dan katalog dikelola admin. **v1 (MVP) memakai fulfillment semi-manual** (lihat §4.4). Provider pembayaran & supplier dibungkus lapisan abstraksi (provider-agnostic).

### 1.3 Definisi & Istilah
| Istilah | Makna |
|---|---|
| Guest checkout | Pembelian tanpa registrasi/login. |
| Fulfillment | Proses pengiriman produk digital ke pelanggan. |
| Semi-manual | Seller memproses & mengirim produk manual (via email), lalu menandai transaksi selesai. |
| H2H | Host-to-Host, integrasi otomatis dengan aggregator supplier. |
| Callback/webhook | Notifikasi asinkron dari gateway/supplier ke sistem. |
| Idempotensi | Efek sama walau operasi dijalankan berkali-kali. |
| Fee gateway | Biaya yang dikenakan payment gateway per transaksi. |

### 1.4 Referensi
- PRD Waluh Pay v1.1 ([prd.md](prd.md)).
- Dokumentasi API Tripay & Digiflazz (dilampirkan saat integrasi). **[TBC]**

---

## 2. Deskripsi Umum

### 2.1 Perspektif Produk
Aplikasi web monolitik Laravel + Inertia.js + React, dengan dua area: **storefront pelanggan** dan **admin panel** (rute/layout terpisah, dilindungi RBAC). Bergantung pada dua sistem eksternal: payment gateway dan (opsional) supplier H2H.

### 2.2 Kelas Pengguna
| Kelas | Hak akses |
|---|---|
| Guest | Telusuri katalog, checkout, cek status via invoice + kontak. |
| Pelanggan terdaftar | Semua hak Guest + riwayat, nomor favorit, dashboard. |
| Operator | Kelola produk, transaksi, promo, laporan (baca/tulis operasional). |
| Super Admin | Semua hak Operator + kelola user admin, konfigurasi gateway/supplier, pengaturan toko. |

### 2.3 Batasan
- Bahasa Indonesia, mata uang IDR. Satu instance + queue (skala kecil–menengah).
- **Tidak dikenakan PPN** pada harga jual (keputusan bisnis v1).
- Kredensial gateway/supplier disimpan sebagai secret (env), tidak di repo.

### 2.4 Asumsi & Ketergantungan
- Pemilik mendaftar gateway sebagai perorangan (Tripay utama, Duitku alternatif).
- Uptime & kebijakan gateway/supplier di luar kendali sistem.
- **Fee gateway dibebankan ke pelanggan** sebagai baris tersendiri.

---

## 3. Kebutuhan Antarmuka Eksternal

### IF-001 — Antarmuka Pengguna
Web responsif mobile-first, mendukung browser modern (2 versi terakhir Chrome, Firefox, Safari, Edge). Design token warna/brand sesuai PRD §3. Wajib memenuhi aksesibilitas dasar (lihat NFR-A11Y).

### IF-002 — Payment Gateway (`PaymentGateway`)
Interface abstrak dengan operasi minimum:
- `createTransaction(order): {payment_url|instructions, reference, expired_at, fee}`
- `handleCallback(request): VerifiedResult` — verifikasi signature, kembalikan status ternormalisasi.
- `getStatus(reference): status`

Ketentuan:
- **IF-002.1** Callback WAJIB diverifikasi signature sebelum diproses.
- **IF-002.2** Nominal callback WAJIB dicocokkan dengan nominal transaksi (termasuk fee).
- **IF-002.3** Callback diproses idempoten berbasis `reference` (lihat FR-PAY-004).
- **IF-002.4** Driver pertama: **Tripay** (channel QRIS, VA, e-wallet, retail). Mode sandbox/production via konfigurasi.

### IF-003 — Supplier Produk (`ProductSupplier`)
Interface abstrak: `checkPrice()`, `purchase()`, `checkStatus()`.
- **IF-003.1** Mode **manual/off** (default MVP): tidak memanggil supplier; fulfillment ditangani seller (§4.4).
- **IF-003.2** Mode **H2H** (Fase 2): driver pertama **Digiflazz** **[TBC]**; sync harga & pembelian otomatis, aktif via konfigurasi tanpa ubah kode inti.
- **IF-003.3** Menangani status asinkron (pending → sukses/gagal) dan menyimpan serial/token pada respons sukses.

### IF-004 — Email
Pengiriman struk & notifikasi status via email (SMTP/transactional service). Wajib untuk MVP.

---

## 4. Kebutuhan Fungsional

Format tiap kebutuhan: pernyataan + **AC** (acceptance criteria, Given–When–Then).

### 4.1 Katalog & Pencarian

**FR-CAT-001** — Menampilkan beranda berisi kategori produk aktif yang dikelola admin.
- AC: Diberikan ≥1 kategori aktif, ketika pelanggan membuka beranda, maka semua kategori aktif tampil; kategori nonaktif tidak tampil.

**FR-CAT-002** — Menampilkan daftar produk/nominal beserta harga jual per kategori.
- AC: Produk berstatus nonaktif atau `maintenance` tidak dapat dibeli; ditandai/ disembunyikan sesuai konfigurasi.

**FR-CAT-003** — Pencarian produk dan filter berdasarkan kategori/operator.
- AC: Kata kunci mencocokkan nama/kode produk; hasil hanya produk aktif.

**FR-CAT-004** — Harga katalog di-cache dan konsisten dengan harga saat checkout.
- AC: Jika harga berubah antara tampil dan checkout, sistem memakai harga terverifikasi saat pembuatan transaksi dan menampilkannya di ringkasan sebelum bayar (lihat FR-CHK-006).

### 4.2 Checkout (Guest & Terdaftar)

**FR-CHK-001** — Pelanggan memilih kategori lalu produk/nominal.

**FR-CHK-002** — Input data tujuan dengan validasi format per tipe produk & deteksi operator otomatis.
- AC: Nomor HP divalidasi format & prefix; ID pelanggan PLN divalidasi panjang/format; input tidak valid ditolak dengan pesan jelas sebelum lanjut.
- Catatan data: sumber pemetaan prefix→operator **[TBC]**.

**FR-CHK-003** — (Opsional) Input kode promo/diskon (Fase 2).
- AC: Promo tidak valid/kadaluarsa/kuota habis ditolak; promo valid mengurangi total sesuai tipe (persen/nominal) tanpa membuat harga jual < harga modal (lihat FR-PRM-002).

**FR-CHK-004** — Input kontak (email wajib, no. HP opsional) untuk struk/notifikasi — guest checkout tanpa login.
- AC: Email wajib & tervalidasi format; dipakai untuk pengiriman struk/produk.

**FR-CHK-005** — Ringkasan pesanan menampilkan rincian: harga jual, **fee gateway (baris terpisah)**, potongan promo, dan **total bayar**. Tidak ada baris PPN.
- AC: `total = harga_jual − potongan_promo + fee_gateway`. Fee ditampilkan eksplisit sebelum pelanggan menekan bayar.

**FR-CHK-006** — Membuat transaksi (state `DRAFT` → `PENDING_PAYMENT`) via `PaymentGateway.createTransaction()` lalu redirect/instruksi bayar.
- AC: Nominal yang dikirim ke gateway = total di ringkasan; `expired_at` disimpan.

**FR-CHK-007** — Mencegah pengiriman ganda (double submit) pada pembuatan transaksi.
- AC: Klik/POST berulang untuk order yang sama tidak membuat >1 transaksi PENDING (idempotency key per sesi order).

**FR-CHK-008** — Halaman status pesanan menampilkan state terkini (menunggu bayar → dibayar → diproses → sukses/gagal) dengan kode invoice.

### 4.3 Pembayaran

**FR-PAY-001** — Menerima callback/webhook dari gateway pada endpoint khusus.

**FR-PAY-002** — Memverifikasi signature callback; menolak yang tidak valid (HTTP 4xx, dicatat).

**FR-PAY-003** — Mencocokkan nominal callback dengan total transaksi; ketidakcocokan ditandai `FAILED_PAYMENT`/di-hold & dicatat, tidak otomatis dianggap lunas.

**FR-PAY-004** — Idempotensi callback: callback berulang untuk `reference` yang sama tidak menggandakan efek.
- AC: Diberikan transaksi sudah `PAID`, ketika callback sukses datang lagi, maka status tidak berubah & tidak memicu fulfillment kedua.

**FR-PAY-005** — Transaksi tidak dibayar hingga `expired_at` berpindah ke `EXPIRED` via job terjadwal.
- Timeout default: **60 menit [ASM]**.

### 4.4 Fulfillment Semi-Manual (MVP)

**FR-FUL-001** — Setelah `PAID`, transaksi masuk antrian kerja seller dengan state `PROCESSING`.
- AC: Semua transaksi `PAID` tampil di daftar kerja admin, terfilter & terurut waktu bayar.

**FR-FUL-002** — Seller mengirim produk secara manual ke email pelanggan, mencatat serial/token/bukti pada transaksi.
- AC: Field hasil (serial/token/catatan) dapat diisi; tersimpan di transaksi & log.

**FR-FUL-003** — Seller menandai transaksi `SUCCESS` setelah produk terkirim.
- AC: Transisi `PROCESSING → SUCCESS` hanya oleh Operator/Super Admin; memicu notifikasi email "transaksi selesai".

**FR-FUL-004** — Seller dapat menandai transaksi `FAILED` bila tidak dapat dipenuhi.
- AC: Transisi mencatat alasan; membuka jalur refund (FR-REF-001).

**FR-FUL-005** — (Fase 2, mode H2H) Fulfillment otomatis via `ProductSupplier.purchase()` menggantikan langkah manual; status supplier asinkron memindahkan `PROCESSING → SUCCESS/FAILED`.

### 4.5 Refund (Manual)

**FR-REF-001** — Untuk transaksi `PAID`/`PROCESSING` yang gagal dipenuhi, admin memicu refund manual (`FAILED → REFUND_PENDING`).
- AC: Hanya Operator/Super Admin; mencatat nominal & alasan.

**FR-REF-002** — Admin menandai refund selesai (`REFUND_PENDING → REFUNDED`) setelah dana dikembalikan.
- AC: Memicu notifikasi email ke pelanggan; tercatat di log audit & laporan.

*Catatan: v1 refund adalah proses operasional manual (di luar/melalui gateway sesuai kebijakan gateway); sistem hanya melacak status & audit, tidak mengeksekusi refund otomatis.*

### 4.6 Akun Pelanggan (Fase 3, opsional)

**FR-ACC-001** — Registrasi & login (email/password); OTP no. HP menyusul **[TBC]**.
**FR-ACC-002** — Dashboard: riwayat transaksi, status, cetak/unduh struk, simpan nomor favorit.
**FR-ACC-003** — Guest dapat cek status via kode invoice + kontak (email/HP) yang cocok.
- AC: Kombinasi invoice + kontak salah tidak mengungkap data transaksi.

### 4.7 Notifikasi

**FR-NOT-001** — Notifikasi email pada perubahan status kunci: berhasil bayar, sedang diproses, selesai, gagal, refund.
**FR-NOT-002** — (Fase 3) Kanal WhatsApp/SMS via abstraksi notifikasi.

### 4.8 Admin — Manajemen Produk

**FR-ADM-PRD-001** — CRUD kategori produk (status aktif/nonaktif).
**FR-ADM-PRD-002** — CRUD produk: kode, nama, kategori, deskripsi, harga_modal, harga_jual/markup, status aktif/nonaktif, maintenance, ketersediaan, tipe input tujuan.
**FR-ADM-PRD-003** — Pengaturan margin/markup per produk atau per kategori untuk hitung harga jual otomatis.
- AC: Perubahan markup menghitung ulang harga_jual; harga_jual tidak boleh < harga_modal.
**FR-ADM-PRD-004** — (Mode H2H) Import/sinkronisasi harga dari supplier + opsi override manual.

### 4.9 Admin — Manajemen Transaksi

**FR-ADM-TRX-001** — Daftar transaksi dengan filter (status, tanggal, kategori, kata kunci) & paginasi.
**FR-ADM-TRX-002** — Detail transaksi: data pelanggan, produk, status pembayaran, status pengiriman, hasil (serial/token), log callback & audit.
**FR-ADM-TRX-003** — Aksi manual: kirim/tandai terkirim (FR-FUL-002/003), tandai gagal, refund (FR-REF).
- AC: Setiap aksi tunduk pada transisi state yang sah (§6.2) & tercatat di audit.

### 4.10 Admin — Promo (Fase 2)

**FR-PRM-001** — CRUD kode promo: tipe (persen/nominal), nilai, minimal transaksi, kuota total, batas per pengguna, periode berlaku, cakupan kategori/produk.
**FR-PRM-002** — Validasi saat redeem: periode, kuota, batas per pengguna, minimal transaksi, cakupan; jaga harga_jual − potongan ≥ harga_modal.
- AC: Promo yang melanggar salah satu syarat ditolak dengan alasan spesifik.
**FR-PRM-003** — Kebijakan stacking: **hanya satu kode promo per transaksi [ASM]**.

### 4.11 Admin — Laporan & Dashboard (Fase 2)

**FR-RPT-001** — Ringkasan: jumlah transaksi, omzet, **laba kotor = Σ(harga_jual − harga_modal)** untuk transaksi `SUCCESS`, jumlah transaksi gagal. Fee gateway bersifat pass-through (netral terhadap laba karena dibebankan ke pelanggan).
**FR-RPT-002** — Laporan per periode & ekspor CSV/Excel.

### 4.12 Admin — Pengaturan & Pengguna

**FR-SET-001** — Manajemen user admin & peran (RBAC: Super Admin, Operator).
**FR-SET-002** — Konfigurasi gateway & supplier (kredensial, mode sandbox/production) — Super Admin saja.
**FR-SET-003** — Pengaturan umum toko (nama, logo, kontak) & halaman statis (TOS, kebijakan privasi, kebijakan refund).

---

## 5. Kebutuhan Non-Fungsional

Nilai bertanda **[ASM]** adalah usulan default untuk dikonfirmasi.

| ID | Aspek | Kebutuhan terukur |
|---|---|---|
| NFR-SEC-001 | Keamanan | HTTPS wajib di seluruh endpoint; HSTS aktif. |
| NFR-SEC-002 | Keamanan | Proteksi CSRF pada form; verifikasi signature pada webhook. |
| NFR-SEC-003 | Keamanan | Validasi & sanitasi seluruh input di trust boundary. |
| NFR-SEC-004 | Keamanan | Rate limit: endpoint publik **60 req/mnt/IP [ASM]**; endpoint callback **120 req/mnt [ASM]**; login **10 percobaan/10 mnt [ASM]**. |
| NFR-SEC-005 | Keamanan | Kredensial disimpan sebagai secret (env/secret manager), tidak di repo. |
| NFR-REL-001 | Keandalan | Idempotensi callback & pembelian (FR-PAY-004, IF-003.3). |
| NFR-REL-002 | Keandalan | State machine transaksi eksplisit (§6.2); transisi ilegal ditolak. |
| NFR-REL-003 | Keandalan | Log audit untuk setiap perubahan status. |
| NFR-REL-004 | Keandalan | (Mode H2H) retry pengiriman: **maks 3x, backoff eksponensial [ASM]**, lalu tandai gagal. |
| NFR-PERF-001 | Performa | Halaman katalog TTFB p95 **< 800 ms [ASM]** dengan cache aktif. |
| NFR-PERF-002 | Performa | Pemrosesan transaksi & callback lewat queue/worker (non-blocking); ACK webhook **< 3 dtk [ASM]**. |
| NFR-AVL-001 | Ketersediaan | Target uptime **99.5% [TBC]** (di luar downtime terjadwal). |
| NFR-SCL-001 | Skalabilitas | Abstraksi gateway & supplier; skema data siap banyak produk/transaksi; single-instance + queue untuk volume awal. |
| NFR-OBS-001 | Observability | Logging terstruktur (transaksi, callback, error) dengan correlation id per transaksi. |
| NFR-OBS-002 | Observability | Dashboard status dasar (jumlah pending, gagal, antrian). |
| NFR-CMP-001 | Kepatuhan | Halaman TOS, Kebijakan Privasi, Kebijakan Refund tersedia & tertaut. |
| NFR-CMP-002 | Kepatuhan | Retensi data pelanggan minimal; periode retensi **[TBC]**; hapus/anonimkan sesuai kebijakan. |
| NFR-A11Y-001 | Aksesibilitas | Kontras teks memenuhi WCAG 2.1 AA; kuning `#FFEB3B` bukan untuk teks tubuh; navigasi keyboard & label form. |
| NFR-CMPT-001 | Kompatibilitas | Responsif mobile-first; 2 versi terakhir browser modern. |
| NFR-SEO-001 | SEO | Meta title/description per halaman kategori/produk; URL bersih; sitemap. **[ASM]** |

---

## 6. Kebutuhan Data

### 6.1 Data Dictionary (entitas inti)
Tipe generik; sesuaikan ke MySQL/PostgreSQL saat implementasi.

**DR-users**
| Kolom | Tipe | Batasan |
|---|---|---|
| id | bigint PK | auto |
| name | string(100) | not null |
| email | string(150) | unique, not null |
| password | string | nullable (guest tak punya) |
| role | enum(customer, operator, super_admin) | default customer |
| created_at/updated_at | timestamp | |

**DR-categories**: id PK, name(100) not null, slug unique, is_active bool default true, sort_order int.

**DR-products**: id PK, code(50) unique not null, name(150), category_id FK→categories, description text null, harga_modal decimal(12,2) ≥0, markup_type enum(percent,nominal) null, markup_value decimal(12,2) null, harga_jual decimal(12,2) ≥ harga_modal, input_type enum(msisdn, pln_id, bill_id, custom), is_active bool, is_maintenance bool, availability enum(available,out_of_stock).

**DR-suppliers**: id PK, name(100), driver(50) (mis. digiflazz, manual), credentials json/encrypted, mode enum(sandbox,production), is_active bool.

**DR-transactions**
| Kolom | Tipe | Batasan |
|---|---|---|
| id | bigint PK | |
| invoice | string(30) | unique, not null |
| product_id | FK→products | not null |
| destination | string(50) | data tujuan (nomor/ID) |
| harga_modal | decimal(12,2) | snapshot saat transaksi |
| harga_jual | decimal(12,2) | snapshot |
| discount | decimal(12,2) | default 0 |
| fee_gateway | decimal(12,2) | default 0 |
| total | decimal(12,2) | = harga_jual − discount + fee_gateway |
| payment_status | enum | (§6.2 subset pembayaran) |
| fulfillment_status | enum | (§6.2 subset pengiriman) |
| status | enum | state gabungan (§6.2) |
| user_id | FK→users | nullable (guest) |
| contact_email | string(150) | not null |
| contact_phone | string(20) | nullable |
| promo_id | FK→promos | nullable |
| result_serial | string(255) | nullable (serial/token/catatan) |
| expired_at | timestamp | nullable |
| created_at/updated_at | timestamp | |

**DR-payments**: id PK, transaction_id FK, gateway(50), reference(100) unique, amount decimal(12,2), status(30), payload json (callback mentah), created_at.

**DR-promos**: id PK, code(50) unique, type enum(percent,nominal), value decimal(12,2), min_amount decimal(12,2) null, quota int null, per_user_limit int null, starts_at/ends_at timestamp, scope json (kategori/produk), is_active bool.

**DR-promo_redemptions**: id PK, promo_id FK, transaction_id FK, user_id FK null, contact_email(150), created_at. Indeks (promo_id, user_id/contact) untuk batas per pengguna.

**DR-transaction_logs**: id PK, transaction_id FK, event(50), from_status(30) null, to_status(30) null, actor (user_id/system), note text null, created_at.

**DR-integritas**
- harga_jual ≥ harga_modal (constraint/app-level).
- total dihitung, bukan diinput bebas.
- reference pembayaran unik (dasar idempotensi).
- invoice unik & tak dapat ditebak.

### 6.2 State Machine Transaksi (tabel transisi)

State: `DRAFT`, `PENDING_PAYMENT`, `PAID`, `PROCESSING`, `SUCCESS`, `EXPIRED`, `FAILED_PAYMENT`, `FAILED`, `REFUND_PENDING`, `REFUNDED`.

| Dari | Event | Ke | Pemicu |
|---|---|---|---|
| DRAFT | createTransaction sukses | PENDING_PAYMENT | Sistem |
| DRAFT | createTransaction gagal | FAILED_PAYMENT | Sistem |
| PENDING_PAYMENT | callback lunas terverifikasi | PAID | Gateway |
| PENDING_PAYMENT | callback gagal/ditolak | FAILED_PAYMENT | Gateway |
| PENDING_PAYMENT | lewat expired_at | EXPIRED | Job terjadwal |
| PAID | mulai diproses | PROCESSING | Sistem/Seller |
| PROCESSING | produk terkirim & ditandai | SUCCESS | Seller (v1) / Supplier (H2H) |
| PROCESSING | tidak dapat dipenuhi | FAILED | Seller (v1) / Supplier (H2H) |
| FAILED | inisiasi refund | REFUND_PENDING | Admin |
| PAID | inisiasi refund (batal sebelum proses) | REFUND_PENDING | Admin |
| REFUND_PENDING | dana dikembalikan | REFUNDED | Admin |

State terminal: `SUCCESS`, `EXPIRED`, `FAILED_PAYMENT`, `REFUNDED`. Transisi di luar tabel = ilegal (NFR-REL-002).

---

## 7. Matriks Ketertelusuran (ringkas)

| Sasaran PRD | Kebutuhan SRS |
|---|---|
| Beli < 60 dtk tanpa login | FR-CHK-001..008, NFR-PERF-001 |
| Admin kelola katalog mandiri | FR-ADM-PRD-001..004, FR-SET-* |
| Pembayaran terverifikasi otomatis | FR-PAY-001..005, IF-002 |
| Success rate > 95% | FR-FUL-*, NFR-REL-*, metrik §10 PRD |
| Provider-agnostic | IF-002, IF-003, NFR-SCL-001 |
| Semi-manual v1 | FR-FUL-001..004, FR-REF-* |

---

## 8. Isu Terbuka (perlu keputusan)

1. **Timeout pembayaran** — default 60 mnt (NFR/FR-PAY-005)? **[TBC]**
2. **Target uptime & periode retensi data** — NFR-AVL-001, NFR-CMP-002. **[TBC]**
3. **Threshold rate limit** final — NFR-SEC-004. **[TBC]**
4. **Sumber pemetaan prefix→operator** untuk FR-CHK-002. **[TBC]**
5. **Konfirmasi Digiflazz** sebagai driver H2H pertama (IF-003.2). **[TBC]**
6. **Stacking promo** — asumsi 1 kode/transaksi (FR-PRM-003); setujui? **[TBC]**
7. Kategori & daftar produk contoh untuk peluncuran (dari PRD §12).
8. OTP verifikasi no. HP untuk pendaftaran (FR-ACC-001)?
9. Target waktu peluncuran MVP & nama domain (dari PRD §12).

---

*SRS ini turunan dari PRD v1.1. Nilai [ASM] adalah default rekomendasi; nilai [TBC] menunggu keputusan sebelum implementasi bagian terkait.*
