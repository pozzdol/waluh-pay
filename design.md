# Design System — Waluh Pay

> **Design Guidelines / Design System**
> Produk: **Waluh Pay** — Website E-Commerce Produk Digital (PPOB)
> Versi: 1.0 (Draft)
> Tanggal: 15 Juli 2026
> Basis: PRD v1.1 ([prd.md](prd.md)) + SRS v1.0 ([srs.md](srs.md)) + logo brand
> Dibuat dengan bantuan skill Hallmark (genre: modern-minimal · theme: custom brand-anchored)
>
> Dokumen ini adalah **sumber kebenaran desain**. Setiap halaman (storefront & admin) memakai token & aturan di sini — bukan menciptakan gaya sendiri.

---

## 1. Fondasi

### 1.1 Genre & Nada
**Modern-minimal & tepercaya.** Bersih, banyak ruang, hirarki tegas, warna fungsional. Hijau sebagai jangkar tenang; kuning hanya aksen. Karena ini produk pembayaran untuk **konsumen umum/massal**, keterbacaan dan kejelasan alur menang di atas dekorasi.

### 1.2 Prinsip
1. **Jelas > pintar.** Setiap layar punya satu aksi utama yang jelas. Tidak ada label ambigu.
2. **Cepat dirasakan.** Target: checkout < 60 detik. Kurangi langkah, bukan tambah animasi.
3. **Tepercaya.** Konsistensi, nominal & total selalu terlihat, status transaksi transparan.
4. **Aksesibel by default.** Kontras AA, tap target ≥ 44px, dukungan keyboard, bahasa sederhana.
5. **Hemat gerak.** Animasi hanya jika membawa informasi (perubahan status, transisi konteks).

### 1.3 Genre-fit ke produk
| Area | Karakter |
|---|---|
| Storefront | Airy, kartu produk empuk-halus, kategori berikon, alur checkout linier. |
| Admin panel | Lebih padat (data-heavy), tabel & filter rapi — **token & warna sama**, hanya densitas beda. |

---

## 2. Brand & Logo

Palet & aset dari logo brand (varian: primary, app icon, monochrome hitam/putih).

| Peran | Nilai | Pemakaian |
|---|---|---|
| Primary (Hijau) | `#4CAF50` | Warna utama brand: fill/aksen, ikon aktif, header. **Bukan** untuk teks kecil di atasnya (lihat §3.4). |
| Accent (Kuning) | `#FFEB3B` | Highlight, badge, sorotan. **Tidak pernah** jadi warna teks tubuh. |
| Netral gelap | `#2E2E2E` | Teks utama (light), latar (dark). |
| Netral terang | `#FFFFFF` | Latar utama (light), teks di atas hijau-kuat. |

**Aturan logo:**
- Varian *primary* (ikon + wordmark) → header/beranda.
- *App icon* (ikon saja, sudut membulat) → favicon & ikon PWA.
- *Monochrome* → struk/invoice cetak & konteks satu warna. White-on-dark → dipakai otomatis di dark mode.
- Format web: **SVG** (tajam di semua ukuran). Sediakan `favicon.svg`, `apple-touch-icon`, dan manifest PWA memakai app icon.
- Clear space minimal = tinggi huruf "W" wordmark di sekeliling logo. Jangan regang, miringkan, atau ganti warna logo di luar varian resmi.

---

## 3. Warna (Token)

Warna primer dinyatakan **OKLCH** (hex sebagai referensi di komentar). Tema **light** & **dark** wajib keduanya. Nama token bersifat semantik — komponen mereferensi nama, **tidak** menuliskan nilai mentah.

### 3.1 Netral / Paper & Ink — Light
| Token | OKLCH | ≈ Hex | Guna |
|---|---|---|---|
| `--color-paper-0` | `oklch(100% 0 0)` | `#FFFFFF` | Latar aplikasi. |
| `--color-paper-1` | `oklch(97.5% 0.004 150)` | `#F6F7F6` | Section muted, latar admin. |
| `--color-paper-2` | `oklch(99% 0.003 150)` | `#FCFDFC` | Kartu. |
| `--color-paper-3` | `oklch(95% 0.005 150)` | `#EFF1EF` | Hover / raised. |
| `--color-ink-strong` | `oklch(24% 0.008 150)` | `#1C1F1C` | Heading. |
| `--color-ink` | `oklch(31% 0.006 150)` | `#2E2E2E` | Teks tubuh. |
| `--color-ink-muted` | `oklch(52% 0.010 150)` | `#5F655F` | Teks sekunder (AA ✓). |
| `--color-ink-faint` | `oklch(66% 0.008 150)` | `#8A908A` | Placeholder / disabled. |
| `--color-border` | `oklch(92% 0.004 150)` | `#E3E6E3` | Garis hairline. |
| `--color-border-strong` | `oklch(85% 0.006 150)` | `#CBD0CB` | Border input / pembatas kuat. |

### 3.2 Brand & Aksen — Light
| Token | OKLCH | ≈ Hex | Guna |
|---|---|---|---|
| `--color-brand` | `oklch(71.5% 0.158 150)` | `#4CAF50` | Fill dekoratif, ikon kategori, aksen. **Bukan latar teks kecil.** |
| `--color-accent` | `oklch(54% 0.130 150)` | `#2E7D32` | **CTA berteks** — teks putih lolos AA (5.3:1). |
| `--color-accent-hover` | `oklch(48% 0.120 150)` | `#256428` | Hover CTA. |
| `--color-accent-soft` | `oklch(95% 0.030 150)` | `#E8F5E9` | Latar terpilih/sukses lembut. |
| `--color-highlight` | `oklch(92.5% 0.165 103)` | `#FFEB3B` | Badge/sorotan kuning. Teks di atasnya = `--color-ink`. |
| `--color-highlight-soft` | `oklch(97% 0.060 103)` | `#FFF9C4` | Latar highlight lembut. |
| `--color-focus` | `oklch(60% 0.150 150)` | `#3DA046` | Cincin fokus (≥3:1). |

### 3.3 Semantik & Status — Light
| Token | OKLCH | ≈ Hex |
|---|---|---|
| `--color-success` | `oklch(54% 0.130 150)` | `#2E7D32` |
| `--color-success-soft` | `oklch(95% 0.030 150)` | `#E8F5E9` |
| `--color-warning` | `oklch(72% 0.150 75)` | `#E68A00` |
| `--color-warning-soft` | `oklch(96% 0.045 80)` | `#FFF3E0` |
| `--color-danger` | `oklch(58% 0.200 27)` | `#D32F2F` |
| `--color-danger-soft` | `oklch(95% 0.030 27)` | `#FDECEA` |
| `--color-info` | `oklch(58% 0.130 250)` | `#1E70C8` |
| `--color-info-soft` | `oklch(95% 0.030 250)` | `#E8F1FB` |

### 3.4 Aturan Warna Wajib (aksesibilitas)
- **Hijau-brand `#4CAF50` tidak boleh membawa teks putih berukuran kecil** — kontras hanya ~2.7:1 (gagal AA). Untuk tombol/label berteks gunakan `--color-accent` (`#2E7D32`). `--color-brand` hanya untuk fill besar, ikon, dan aksen non-teks.
- **Kuning `#FFEB3B` bukan warna teks.** Di atas kuning, teks selalu `--color-ink`. Kuning sebagai teks di atas putih dilarang (kontras ~1.1:1).
- Teks tubuh minimal AA (4.5:1). `--color-ink` di atas paper = ~12:1; `--color-ink-muted` = ~5.6:1.
- Warna tidak pernah jadi satu-satunya penanda status — selalu ada label teks / ikon (buta warna).

### 3.5 Dark Mode
Aktif via `:root[data-theme="dark"]` **dan** `@media (prefers-color-scheme: dark)`. Toggle pengguna menang.

| Token | OKLCH | ≈ Hex |
|---|---|---|
| `--color-paper-0` | `oklch(20% 0.006 150)` | `#1A1C1A` |
| `--color-paper-1` | `oklch(24% 0.006 150)` | `#212421` |
| `--color-paper-2` | `oklch(27% 0.006 150)` | `#262A26` |
| `--color-paper-3` | `oklch(31% 0.007 150)` | `#2E332E` |
| `--color-ink-strong` | `oklch(96% 0.004 150)` | `#F2F4F2` |
| `--color-ink` | `oklch(89% 0.004 150)` | `#DDE1DD` |
| `--color-ink-muted` | `oklch(72% 0.006 150)` | `#A0A6A0` |
| `--color-border` | `oklch(33% 0.006 150)` | `#363B36` |
| `--color-brand` | `oklch(76% 0.150 150)` | `#5DBE63` |
| `--color-accent` | `oklch(78% 0.150 150)` | `#66C46B` |
| `--color-accent-hover` | `oklch(84% 0.140 150)` | `#8CD68F` |
| `--color-highlight` | `oklch(90% 0.170 103)` | `#FFEE58` |

**Dark mode — CTA membalik kontras:** tombol primer memakai fill hijau-terang (`--color-accent`) dengan **teks gelap** (`--color-ink-strong` versi light / near-black), karena teks putih di atas hijau di dark tidak lolos. Semantic-soft di dark = versi transparan/gelap dari hue (mis. `color-mix(in oklch, var(--color-warning) 18%, var(--color-paper-1))`).

---

## 4. Tipografi

Disiplin 2+1: **display + body + mono**.

| Peran | Font | Alasan |
|---|---|---|
| Display / heading | **Plus Jakarta Sans** (600/700/800) | Rounded-humanist buatan Tokotype (Indonesia) — selaras karakter logo, hangat namun tepercaya, angka jelas. |
| Body / UI | **Inter** (400/500/600) | Legibilitas tinggi di ukuran kecil — ideal untuk form & tabel admin. |
| Mono / angka & kode | **JetBrains Mono** (400/500) | Nominal rupiah, kode invoice, serial/token. Tabular figures. |

Semua via Google Fonts (subset `latin`, `latin-ext`). Fallback: `system-ui, sans-serif`.

**Aturan:**
- Heading selalu roman (tegak). **Tidak ada heading italic.** Penekanan lewat weight / warna aksen.
- Nominal uang & kode invoice: `font-variant-numeric: tabular-nums` agar sejajar.
- Ukuran teks tubuh minimal **16px** (mass audience).
- Panjang baris teks 60–75 karakter.

### 4.1 Skala Tipe (token `--text-*`)
| Token | Ukuran | Line-height | Guna |
|---|---|---|---|
| `--text-xs` | 12px | 1.4 | Caption, label mikro. |
| `--text-sm` | 14px | 1.45 | Teks bantu, tabel padat. |
| `--text-base` | 16px | 1.55 | Body default. |
| `--text-lg` | 18px | 1.5 | Body menonjol. |
| `--text-xl` | 20px | 1.4 | Subjudul. |
| `--text-2xl` | 24px | 1.3 | Judul kartu/section kecil. |
| `--text-3xl` | 30px | 1.25 | Judul section. |
| `--text-4xl` | 36px | 1.2 | Judul halaman. |
| `--text-display-s` | 44px | 1.1 | Hero kecil. |
| `--text-display` | 56px | 1.05 | Hero (desktop; turun ke 4xl di mobile). |

---

## 5. Spasi, Radius, Elevasi, Gerak

### 5.1 Spasi (skala 4pt)
`--space-xs 4` · `--space-sm 8` · `--space-md 16` · `--space-lg 24` · `--space-xl 32` · `--space-2xl 48` · `--space-3xl 64` · `--space-4xl 96`.

### 5.2 Radius
`--radius-sm 6px` (input, chip) · `--radius-md 10px` (tombol, badge) · `--radius-lg 14px` (kartu) · `--radius-xl 20px` (modal, panel) · `--radius-pill 999px` (chip kategori, tombol pill). Radius membulat menghormati app icon, tapi tetap moderat (bukan childish).

### 5.3 Elevasi (light)
`--shadow-sm 0 1px 2px rgba(0,0,0,.06)` · `--shadow-md 0 2px 8px rgba(0,0,0,.08)` · `--shadow-lg 0 8px 24px rgba(0,0,0,.10)`.
Dark: bayangan kurang efektif — andalkan `--color-paper-2/3` + `--color-border` untuk memisah lapisan.

### 5.4 Gerak
- Durasi: `--dur-fast 120ms` · `--dur-base 180ms` · `--dur-slow 240ms`.
- Easing: `--ease-out cubic-bezier(.22,1,.36,1)` · `--ease-in cubic-bezier(.4,0,1,1)` · `--ease-in-out cubic-bezier(.4,0,.2,1)`. **Tanpa bounce/overshoot** pada UI state.
- Hanya animasikan `transform` & `opacity` (jangan properti layout).
- `:focus-visible` muncul **instan** (jangan dianimasikan).
- `prefers-reduced-motion: reduce` → gerak spasial jadi crossfade opacity ≤150ms.

---

## 6. Layout & Struktur

Mobile-first. Grid track pembawa gambar pakai `minmax(0, 1fr)`. `overflow-x: clip` di `html`/`body`. Tanpa scroll horizontal di 320/375/414/768px.

### 6.1 Storefront
- **Nav (N1b canonical):** wordmark kiri · kategori + Pencarian tengah · "Cek Status" + Masuk/Daftar kanan. Sticky, hairline bawah. Di mobile: wordmark + ikon search + menu.
- **Beranda:** hero ringkas (search + kategori cepat) → grid kategori berikon → produk populer. Bukan landing-page marketing bertele — utamakan alur beli.
- **Katalog:** grid kartu produk/nominal, filter kategori/operator, harga tampil jelas.
- **Checkout:** langkah linier vertikal (pilih → data tujuan → promo → kontak → ringkasan → bayar). Ringkasan pesanan **sticky** menampilkan harga jual + fee gateway + total.
- **Status pesanan:** timeline state (§8) + detail + tombol cek ulang.
- **Footer (Ft dengan link wajib):** kontak, TOS, Kebijakan Privasi, Kebijakan Refund, metode pembayaran. (Wajib per SRS NFR-CMP-001.)

### 6.2 Admin
- **Nav (N3 side-rail):** rail kiri (Dashboard, Produk, Kategori, Transaksi, Promo, Laporan, Pengaturan). Topbar: breadcrumb + profil + toggle tema.
- Densitas lebih tinggi: tabel, filter bar, panel detail. Token & warna identik storefront.

---

## 7. Komponen Inti

Setiap elemen interaktif wajib punya **8 state**: default · hover · focus-visible · active · disabled · loading · error · success.

### 7.1 Tombol
| Varian | Fill | Teks | Guna |
|---|---|---|---|
| Primary | `--color-accent` | putih (light) / gelap (dark) | Aksi utama (Bayar, Beli). |
| Secondary | `--color-paper-0` + border | `--color-ink` | Aksi sekunder. |
| Ghost | transparan | `--color-accent` | Aksi tersier/inline. |
| Danger | `--color-danger` | putih | Batalkan, hapus. |

Aturan: tinggi ≥ 44px; teks tombol **tidak boleh 2 baris**; radius `--radius-md`; loading = spinner + teks, jangan hilangkan lebar (cegah layout shift); success singkat (silent) lebih baik daripada toast meriah.

### 7.2 Input & Form (kritis — jantung checkout)
- Label selalu terlihat (bukan placeholder-as-label).
- Validasi format per tipe tujuan (nomor HP, ID PLN, dll — SRS FR-CHK-002); deteksi operator dari prefix tampil sebagai chip di dalam field.
- Error inline di bawah field: ikon + teks `--color-danger`, bukan hanya warna. Pesan jelas & bahasa manusia.
- Field nominal & kontak: `inputmode` sesuai (numeric untuk nomor).
- Fokus: cincin `--color-focus` 2px + offset.

### 7.3 Kartu Produk / Nominal
Radius `--radius-lg`, border hairline, hover naik `translateY(-2px)` + `--shadow-md`. Nama produk, nominal (mono, tabular), harga jual menonjol. State nonaktif/maintenance: redup + badge.

### 7.4 Chip Kategori
Pill `--radius-pill`, ikon berwarna `--color-brand`, terpilih = latar `--color-accent-soft` + border aksen.

### 7.5 Badge Status Transaksi
Lihat pemetaan warna di §8. Bentuk: teks + titik/ikon, latar `*-soft`, teks `*` (versi kuat).

### 7.6 Notifikasi/Toast
Sukses = silent/optimistic + Undo bila relevan. Error = persist sampai ditutup. Posisi bawah (mobile) / kanan-atas (desktop).

### 7.7 Tabel (admin)
Baris tinggi ≥ 44px, zebra opsional `--color-paper-1`, header sticky, nominal rata kanan + tabular. Aksi baris di kolom kanan.

---

## 8. Warna Status Transaksi (peta ke SRS §6.2)

Konsisten di storefront (timeline) & admin (badge). Warna + label teks selalu bersama.

| State | Warna | Label ID |
|---|---|---|
| `DRAFT` | netral (`ink-muted` / border) | Draf |
| `PENDING_PAYMENT` | warning | Menunggu Pembayaran |
| `PAID` | info | Sudah Dibayar |
| `PROCESSING` | info (dengan indikator proses) | Diproses |
| `SUCCESS` | success | Berhasil |
| `EXPIRED` | netral | Kedaluwarsa |
| `FAILED_PAYMENT` | danger | Pembayaran Gagal |
| `FAILED` | danger | Gagal |
| `REFUND_PENDING` | warning | Refund Diproses |
| `REFUNDED` | info / netral | Dana Dikembalikan |

Timeline checkout menampilkan urutan: Menunggu Bayar → Dibayar → Diproses → Berhasil, dengan cabang Gagal/Kedaluwarsa.

---

## 9. Ikonografi & Ilustrasi
- **Ikon:** satu set konsisten (rekomendasi: Lucide — garis, ringan, cocok modern-minimal). Ukuran 20/24px, stroke seragam.
- **Ikon kategori:** boleh berwarna `--color-brand` untuk keramahan.
- **Ilustrasi/empty state:** boleh memakai maskot labu (dari logo) untuk empty state / sukses — gaya flat, hemat, jangan berlebihan.
- **Tanpa chrome palsu:** jangan menggambar bar browser/telepon palsu; gunakan screenshot asli bila perlu.
- **Tanpa metrik/testimoni palsu** di halaman marketing — pakai angka nyata atau placeholder berlabel.

---

## 10. Voice & Bahasa
- Bahasa Indonesia, ringkas, ramah, bukan gaul berlebihan. Sapaan netral.
- Tombol = kata kerja jelas: "Beli Pulsa", "Bayar Sekarang", "Cek Status" — bukan "Submit".
- Angka rupiah: `Rp 25.000` (titik ribuan, spasi setelah Rp).
- Pesan error menjelaskan **apa** & **cara memperbaiki** ("Nomor HP harus 10–13 digit").

---

## 11. Aksesibilitas (checklist wajib)
- Kontras teks AA (4.5:1 normal, 3:1 besar). Verifikasi tiap token kombinasi.
- Tap target ≥ 44×44px.
- Navigasi keyboard penuh; `:focus-visible` terlihat.
- Label form terkait (`<label for>`), error diumumkan (`aria-live`).
- Status tidak bergantung warna saja.
- Uji di 320/375/414/768px tanpa scroll horizontal & tanpa teks klik 2 baris.

---

## 12. Exports

Salin blok berikut ke `resources/css/tokens.css` (Laravel + Inertia). Page CSS mereferensi token **by name**, tidak menulis nilai mentah.

```css
/* Hallmark · macrostructure: (multi — storefront N1b / admin N3) · tone: modern-minimal, tepercaya · anchor hue: green 150
 * theme: custom brand-anchored (paper light/dark · accent green #2E7D32 · highlight yellow #FFEB3B)
 * fonts: Plus Jakarta Sans (display) + Inter (body) + JetBrains Mono (numerals)
 * pre-emit critique: P5 H4 E4 S5 R4 V4
 */
:root {
  /* paper & ink — light */
  --color-paper-0: oklch(100% 0 0);
  --color-paper-1: oklch(97.5% 0.004 150);
  --color-paper-2: oklch(99% 0.003 150);
  --color-paper-3: oklch(95% 0.005 150);
  --color-ink-strong: oklch(24% 0.008 150);
  --color-ink: oklch(31% 0.006 150);
  --color-ink-muted: oklch(52% 0.010 150);
  --color-ink-faint: oklch(66% 0.008 150);
  --color-border: oklch(92% 0.004 150);
  --color-border-strong: oklch(85% 0.006 150);

  /* brand & accent — light */
  --color-brand: oklch(71.5% 0.158 150);      /* #4CAF50 — fill/ikon, bukan teks kecil */
  --color-accent: oklch(54% 0.130 150);       /* #2E7D32 — CTA berteks (AA) */
  --color-accent-hover: oklch(48% 0.120 150);
  --color-accent-soft: oklch(95% 0.030 150);
  --color-highlight: oklch(92.5% 0.165 103);  /* #FFEB3B — aksen, bukan teks */
  --color-highlight-soft: oklch(97% 0.060 103);
  --color-focus: oklch(60% 0.150 150);

  /* semantic — light */
  --color-success: oklch(54% 0.130 150);
  --color-success-soft: oklch(95% 0.030 150);
  --color-warning: oklch(72% 0.150 75);
  --color-warning-soft: oklch(96% 0.045 80);
  --color-danger: oklch(58% 0.200 27);
  --color-danger-soft: oklch(95% 0.030 27);
  --color-info: oklch(58% 0.130 250);
  --color-info-soft: oklch(95% 0.030 250);

  /* type */
  --font-display: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --text-xs: 0.75rem; --text-sm: 0.875rem; --text-base: 1rem; --text-lg: 1.125rem;
  --text-xl: 1.25rem; --text-2xl: 1.5rem; --text-3xl: 1.875rem; --text-4xl: 2.25rem;
  --text-display-s: 2.75rem; --text-display: 3.5rem;

  /* spacing (4pt) */
  --space-xs: 0.25rem; --space-sm: 0.5rem; --space-md: 1rem; --space-lg: 1.5rem;
  --space-xl: 2rem; --space-2xl: 3rem; --space-3xl: 4rem; --space-4xl: 6rem;

  /* radius */
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 14px; --radius-xl: 20px; --radius-pill: 999px;

  /* elevation */
  --shadow-sm: 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 2px 8px rgba(0,0,0,.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,.10);

  /* motion */
  --dur-fast: 120ms; --dur-base: 180ms; --dur-slow: 240ms;
  --ease-out: cubic-bezier(.22,1,.36,1);
  --ease-in: cubic-bezier(.4,0,1,1);
  --ease-in-out: cubic-bezier(.4,0,.2,1);
}

:root[data-theme="dark"] {
  --color-paper-0: oklch(20% 0.006 150);
  --color-paper-1: oklch(24% 0.006 150);
  --color-paper-2: oklch(27% 0.006 150);
  --color-paper-3: oklch(31% 0.007 150);
  --color-ink-strong: oklch(96% 0.004 150);
  --color-ink: oklch(89% 0.004 150);
  --color-ink-muted: oklch(72% 0.006 150);
  --color-border: oklch(33% 0.006 150);
  --color-brand: oklch(76% 0.150 150);
  --color-accent: oklch(78% 0.150 150);       /* fill dengan TEKS GELAP di dark */
  --color-accent-hover: oklch(84% 0.140 150);
  --color-accent-soft: color-mix(in oklch, var(--color-accent) 16%, var(--color-paper-1));
  --color-highlight: oklch(90% 0.170 103);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* mirror blok dark di atas untuk auto-detect; data-theme pengguna tetap menang */
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: 120ms !important; }
}
```

### 12.1 Tailwind v4 (`@theme`)
Peta token ke Tailwind agar utility class sewarna (`bg-accent`, `text-ink`, dll):

```css
@theme {
  --color-paper-0: var(--color-paper-0);
  --color-accent: var(--color-accent);
  --color-brand: var(--color-brand);
  --color-highlight: var(--color-highlight);
  --color-ink: var(--color-ink);
  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --radius-md: var(--radius-md);
  /* …lanjutkan pemetaan sesuai kebutuhan */
}
```

---

## 13. Yang Perlu Dikonfirmasi
1. **Font final** — Plus Jakarta Sans + Inter + JetBrains Mono OK? (semua gratis, Google Fonts). Atau ingin wordmark logo di-set sebagai font display juga?
2. **Icon set** — Lucide (rekomendasi) atau lainnya?
3. **Maskot labu** — dipakai untuk empty state / ilustrasi sukses, atau logo saja?
4. **Toggle tema** — default ikuti sistem, atau default light dengan toggle manual?
5. Setelah disetujui, mau aku bangun **halaman contoh** (mis. beranda + checkout) memakai sistem ini agar bisa dilihat langsung?

---

*Dokumen ini sumber kebenaran desain Waluh Pay. Perubahan token harus lewat file ini agar storefront & admin tetap konsisten.*
