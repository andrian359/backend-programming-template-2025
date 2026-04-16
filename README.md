# Gacha API Service

API ini dibuat untuk memenuhi kuis back end

## Daftar Endpoint:

### 1. Endpoint Utama: Gacha

- **URL:** `/gacha`
- **Method:** `POST`
- **Fungsi:** Melakukan gacha hadiah. Setiap user hanya bisa melakukan gacha maksimal 5 kali dalam 1 hari.
- **Body (JSON):** ```json
  { "username": "Nama User" }

  ### 2. Sisa Kuota Hadiah

- **URL:** `/prizes`
- **Method:** `GET`
- **Fungsi:** Menampilkan daftar hadiah beserta sisa kuota yang masih tersedia.

  ### 3. Histori Gacha User

- **URL:** `/history/:username`
- **Method:** `GET`
- **Fungsi:** Melihat riwayat gacha dari user tertentu.

  ### 4. Daftar Pemenang

- **URL:** `/winners`
- **Method:** `GET`
- **Fungsi:** Menampilkan daftar semua pemenang hadiah. Nama disensor acak.
