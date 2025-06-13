# RESTful API
API ini menyediakan fungsionalitas untuk mendapatkan rekomendasi tempat wisata dan berinteraksi melalui chatbot untuk mendapatkan informasi seputar tempat wisata, termasuk prediksi rating dan klasifikasi popularitas. Kami menggunakan Python dengan Flask Framework untuk membangun RESTful API ini, dan respons yang diberikan dalam format JSON.


## 1. Rekomendasi Wisata
Bagian ini menyediakan endpoint untuk mendapatkan rekomendasi tempat wisata berdasarkan fitur-fitur yang diberikan. Sistem rekomendasi ini dibangun menggunakan model yang memanfaatkan TF-IDF Vectorizer untuk representasi teks dan Cosine Similarity untuk menghitung kemiripan antar tempat wisata. Data utama untuk rekomendasi disimpan dalam DataFrame df_tourism yang diproses bersama dengan index place_indices.

## 🌐 Endpoint
---

**Base URL :** 
> http://127.0.0.1:5000

**Path :**
> http://127.0.0.1:5000/recommend

**Method :**
> `POST`

---

## 📋 Headers

```http
Content-Type: application/json
```

---

## 📦 Request Body (JSON)
```json
{
  "Place_Name": "Taman Kupu-Kupu Cihanjuang",
  "Category": "Cagar Alam",
  "Price": "10000",
  "Rating": "4.0"
}
```

### Penjelasan Field:

| Field         | Tipe     | Wajib | Deskripsi                                  |
|---------------|----------|-------|--------------------------------------------|
| `Place_Name`  | string   | Ya    | Nama tempat (untuk referensi)              |
| `Category`    | string   | Ya    | Kategori tempat wisata                     |
| `Price`       | integer  | Ya    | Harga tiket masuk (dalam IDR)              |
| `Rating`       | float   | Ya    | Rating tempat (skala 1-5)                  |

---

## ✅ Contoh Request (Python)

```import requests

url = "http://localhost:5000/recommend"
payload = {
    "Place_Name": "Taman Kupu-Kupu Cihanjuang",
    "Category": "Cagar Alam",
    "Price": 10000,
    "Rating": 4.0
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

---

## 📤 Contoh Response

```json
{
    "recommendations": [
        {
            "Category": "Cagar Alam",
            "Description": "Taman Begonia Bandung terletak pada ketinggian 1200 meter di atas laut. Selain balinea, ada beraneka jenis bunga lainnya seperti salvia, impatiens, geranium, dan celosia. Saking indahnya banyak orang yang menyebut setara dengan taman Himawari no Sato di Jepang. Bunga Balinea itu sendiri merupakan jenis bunga Begonia yang berasal dari Bali. Tanaman yang cocok ditanam di berbagai cuaca ini akan tumbuh di sepanjang musim. Bunga Balinea adalah tanaman yang sering ditanam di perkebunan dan pekarangan hotel serta taman kota Keistimewaan Taman Bunga Begonia bukan hanya dari keberadaan bunga dan tanaman yang ada, melainkan juga dari tatanan taman yang menarik. Warna-warni taman bunga juga dilengkapi dengan berbagai bentukan yang cocok untuk berfoto-foto. Bahkan memang banyak pengunjung yang datang ke sini hanya untuk mengabadikan keindahan tamannya. Selain itu, karena berada di dataran tinggi, para pengunjung pasti akan nyaman beraktivitas di sana dengan suhu yang sejuk dan menyegarkan.",
            "Place_Id": 313,
            "Place_Name": "Taman Begonia",
            "Price": 10000,
            "Rating": 4.4
        },
        {
            "Category": "Cagar Alam",
            "Description": "Taman Sungai Mudal, sebuah objek wisata alam terbuka yang terletak di Kabupaten Kulon Progo, yang menawarkan pesona sebuah kolam pemandian yang bersumber dari mata air alami. Mata airnya bersumber dari sebuah goa, sehingga kehadiran Taman Sungai Mudal menjadi mengesampingkan kesan angker dari sebuah goa. Apalagi ditambah dengan dukungan fasilitas yang membuat para wisatawan merasa nyaman saat berada di sana. Taman Sungai Mudal menjadi salah-satu wisata Kulon Progo yang selalu menjadi destinasi utama saat liburan tiba. Salah-satu alasan utamanya dikarenakan Taman Sungai Mudal mampu menjadi destinasi wisata keluarga yang menyenangkan.",
            "Place_Id": 208,
            "Place_Name": "Taman Sungai Mudal",
            "Price": 10000,
            "Rating": 4.6
        },
        {
            "Category": "Cagar Alam",
            "Description": "Gua Pawon adalah sebuah gua alami dan situs purbakala yang terletak di Desa Gunung Masigit, Kecamatan Cipatat, Padalarang, Kabupaten Bandung Barat, atau sekitar 25 km arah barat Kota Bandung. Merupakan sebuah tempat yang penting bagi orang Sunda karena di sanalah tempat berkumpulnya sesepuh Sunda yang sekarang menduduki bagian barat pulau Jawa. Di sana pernah ditemukan kerangka manusia purba yang konon adalah nenek moyang orang Sunda (masih diteliti di balai Arkeolog Bandung).\r",
            "Place_Id": 328,
            "Place_Name": "Gua Pawon",
            "Price": 10000,
            "Rating": 4.5
        },
        {
            "Category": "Taman Hiburan",
            "Description": "Taman Jomblo dapat mengacu kepada:\\n\\nTaman Pasupati, sebuah taman yang didirikan oleh Ridwan Kamil di Bandung\\nPedestrian Jomblo, sebuah tempat rekreasi yang didirikan di Jambi\\nTaman Jomblo (Mataram), sebuah taman yang didirikan di Mataram, Nusa Tenggara Barat",
            "Place_Id": 276,
            "Place_Name": "Taman Jomblo",
            "Price": 10000,
            "Rating": 4.1
        },
        {
            "Category": "Taman Hiburan",
            "Description": "Studio Gamplong atau Studio Alam Gamplong adalah sebuah tempat wisata yang terletak di Desa Gamplong, Kecamatan Moyudan, Kabupaten Sleman. Tempat tersebut awalnya adalah tempat pengambilan gambar film Sultan Agung: Tahta, Perjuangan, Cinta dan Bumi Manusia karya Hanung Bramantyo. Tempat tersebut didirikan di atas lahan seluas 2,5 hektar. Tempat tersebut diresmikan oleh Presiden Joko Widodo pada 15 Juli 2018.",
            "Place_Id": 130,
            "Place_Name": "Studio Alam Gamplong",
            "Price": 10000,
            "Rating": 4.4
        },
        {
            "Category": "Cagar Alam",
            "Description": "Berada sekitar 2 KM dari Kota Ungaran atau sekitar 18 KM dari Kota Semarang, Kawasan Wana Wisata Penggaron secara administratif berada di Desa Susukan, Kecamatan Ungaran, Kabupaten semarang. Area ini merupakan salah satu hutan binaan Kesatuan Bisnis Mandiri Wisata, Benih dan Usaha Lain (KBM WBU I) Perum Perhutani Unit I Jateng. Wana Wisata Penggaron atau Wisata Alam Wana Wisata Penggaron merupakan sebuah tempat wisata hutan yang bisa anda gunakan untuk berlibur bersama keluarga anda, salah satunya untuk camping. Tempat ini banyak di jadikan sebagai tempat untuk camping atau berlibur oleh masyarakat Semarang. Wana Wisata Penggaron sebuah hutan yang eksotis, sayangnya surga di kota semarang ini jarang tersentuh mata. Bagi pengunjung yang bertanya kepada penjaga loket, dengan jawaban yang sederhana dan apa adanya “hutan biasa yang sering dipake kemah, tidak ada yang istimewa”, tentunya akan merasa kecewa.",
            "Place_Id": 357,
            "Place_Name": "Wisata Alam Wana Wisata Penggaron",
            "Price": 10000,
            "Rating": 4.1
        },
        {
            "Category": "Cagar Alam",
            "Description": "Wilayah ini lebih tepatnya berada di RPH Cikalong Wetan, BKPH Padalarang Perum Perhutani BKPH Bandung Utara. Dilihat dari kawasannya, mengingatkan saya kepada salah satu objek wisata yang berada di jawa tengah. Lebih tepatnya berada di klaten, Umbul Ponggok namanya. Bagi Sobat Native yang sudah pernah ke Umbul Ponggok, objek wisata sendang ini hampir sama persis. Hanya saja, di kawasan ini digunakan secara serba guna. Maksud dari serba guna adalah. Sumber mata air yang keluar dari objek wisata ini digunakan juga oleh sebagian masyarakat sekitar sebagai tempat mencuci. Tunggu dulu, jangan merasa jijik dahulu. Sumber mata air yang menghasilkan sendang ini hampir setiap menit mengalir air-air bersih.",
            "Place_Id": 299,
            "Place_Name": "Sendang Geulis Kahuripan",
            "Price": 10000,
            "Rating": 4.3
        },
        {
            "Category": "Cagar Alam",
            "Description": "Curug Tilu Leuwi Opat merupakan salah satu wisata curug di Lembang. Tempatnya sendiri cukup luas. Disini ada area outbond, camping, dan tentunya wisata air terjun dan sungai. Area depan berupa lembah dengan sungai jernih. Biasanya outbond, camping, dan permainan dilakukan di area ini. Lokasi curug tilu leuwi opat sebenarnya bertetangga langsung dengan Dusun Bambu lho. Pernah ke dusun bambu? jika naik ke skywalk lutung kasarung, atau mengunjungi area camping, anda bisa melihat lembah yang berbatasan langsung dengan dusun bambu. Nah, lembah itu termasuk ke dalam area wisata curug tilu leuwi opat. Di lembah ini mengalir sungai dengan air jernih yang bersumber dari Situ Lembang.",
            "Place_Id": 246,
            "Place_Name": "Curug Tilu Leuwi Opat",
            "Price": 10000,
            "Rating": 4.4
        },
        {
            "Category": "Cagar Alam",
            "Description": "Tempat tersebut ialah Taman Hatmoni Keputih Surabaya yang memiliki segudang koleksi bunga warna-warni. Dulunya tempat ini merupakan lokasi pembuangan sampah atau TPA, namun kini bertransformasi menjadi sebuah wisata taman yang sangat cantik. Bukan hanya cantik, namun bunga-bunga yang bermekaran di Taman Harmoni terlihat sangat instagramable, sehingga tak heran jika mayoritas pengunjung tempat ini merupakan para kaum kawula muda penggiat sosial media. Lantas berapa sih budget untuk memasuki kawasan Taman Harmoni Surabaya ini? Kamu nggak perlu khawatir, karena harga tiket masuk Taman Harmoni Keputih Surabaya ini gratis. Kamu hanya perlu menyiapkan kocek untuk membayar karcis parkir saja.",
            "Place_Id": 393,
            "Place_Name": "Taman Harmoni Keputih",
            "Price": 0,
            "Rating": 4.4
        },
        {
            "Category": "Cagar Alam",
            "Description": "Taman Bunga Cihideung mempunyai pesona alam yang sederhana namun mampu menghasilkan landscape yang menyita perhatian. Pesona dari kebun / taman bunga ini padahal hanya sebatas tumbuhan sejenis bunga. Lalu ada pula beberapa daya tarik lain sehingga membuat destinasi wisata alam ini masuk ke dalam list wisata Bandung. Salah satunya yaitu area spot foto yang sangat kekinian dan instagramable yang menjadi incaran utama wisatawan remaja. Khususnya bagi para influencer yang sedang mencari latar sempurna untuk sebuah konten.",
            "Place_Id": 310,
            "Place_Name": "Taman Bunga Cihideung",
            "Price": 0,
            "Rating": 4.1
        }
    ],
    "status": "success"
}
```
---
## 🛠️ Teknologi & File yang Digunakan

| Komponen               | File                         | Deskripsi                              |
|------------------------|------------------------------|----------------------------------------|
| TF-IDF Vectorizer      | `tfidf_vectorizer.pkl`       | Model untuk ekstraksi fitur teks       |
| Cosine Similarity	     | `cosine_sim_matrix.pkl`	    | Matriks kemiripan antar tempat wisata  |
| Tourism Dataset	       | `df_tourism.pkl	`           | Database tempat wisata                 |
| Place Indices	         | `place_indices.pkl`          | Mapping nama tempat ke index           |
| API Service            | `app.py`                     | Script Flask API                       |

---

## 🔁 Alur Rekomendasi
1. Menerima input dari request body
2. Menggabungkan fitur menjadi string representasi
3. Transformasi fitur menggunakan TF-IDF Vectorizer
4. Menghitung similarity score menggunakan cosine similarity
5. Mengambil 10 tempat dengan similarity score tertinggi
6. Mengembalikan hasil dalam format JSON



## 2. API Prediksi Rating Tempat Wisata

API ini digunakan untuk memprediksi **rating** dari tempat wisata berdasarkan **lokasi, harga, dan kategori**. Model ini menggunakan **TensorFlow Keras**, serta preprocessing melalui `StringLookup` dan `StandardScaler` yang telah disimpan dalam format pickle.

---

## 🌐 Endpoint

**Base URL**  
`http://127.0.0.1:5000/predict`

**Method**  
`POST`

---

## 📋 Headers

```http
Content-Type: application/json
```

---

## 📦 Request Body (JSON)

```json
{
  "Place_Name": "Candi Borobudur",
  "City": "Yogyakarta",
  "Category": "Budaya",
  "Price": 50000,
  "Lat": -7.6079,
  "Long": 110.2038
}
```

### Penjelasan Field:

| Field         | Tipe     | Wajib | Deskripsi                                  |
|---------------|----------|-------|--------------------------------------------|
| `Place_Name`  | string   | Tidak | Nama tempat (untuk ditampilkan saja)       |
| `City`        | string   | Ya    | Kota tempat wisata berada                  |
| `Category`    | string   | Ya    | Kategori tempat wisata (misal: Budaya)     |
| `Price`       | float    | Ya    | Harga tiket masuk tempat wisata (dalam IDR)|
| `Lat`         | float    | Ya    | Koordinat latitude                         |
| `Long`        | float    | Ya    | Koordinat longitude                        |

---

## ✅ Contoh Request (Python)

```python
import requests

url = "http://localhost:5000/predict"
payload = {
    "Place_Name": "Pantai Parangtritis",
    "City": "Yogyakarta",
    "Category": "Nature",
    "Price": 10000,
    "Lat": -8.0206,
    "Long": 110.3252
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

---

## 📤 Contoh Response

```json
{
  "place_name": "Pantai Parangtritis",
  "predicted_rating": 3.9780099391937256
}
```

---

## ❌ Contoh Error Response

```json
{
  "error": "'City'"
}
```

> Error ini muncul jika parameter wajib tidak disertakan dalam request.

---

## 🛠️ Teknologi & File yang Digunakan

| Komponen               | File                         | Deskripsi                              |
|------------------------|------------------------------|----------------------------------------|
| Model ML               | `model_tempat.h5`            | Model Keras untuk prediksi rating      |
| Scaler fitur numerik   | `scaler_tempat.pkl`          | StandardScaler untuk fitur numerik     |
| Lookup kategori        | `lookup_tempat_category.pkl` | One-hot encoder untuk kolom `Category` |
| Lookup kota            | `lookup_tempat_city.pkl`     | One-hot encoder untuk kolom `City`     |
| API Service            | `app.py`                     | Script Flask API                       |

---

## 🔁 Alur Prediksi

1. Ambil data dari request body.
2. Encode `City` dan `Category` menggunakan `StringLookup`.
3. Normalisasi `Price`, `Lat`, dan `Long` menggunakan `StandardScaler`.
4. Gabungkan semua fitur menjadi satu tensor.
5. Lakukan prediksi rating menggunakan model Keras.
6. Kembalikan hasil prediksi dalam format JSON.


# 3. API Klasifikasi Popularitas Tempat Wisata

API ini digunakan untuk mengklasifikasikan **popularitas** dari suatu tempat wisata berdasarkan fitur-fitur seperti **rating, jumlah pengunjung, dan harga**. Model ini menggunakan **Neural Network (TensorFlow Keras)** dan telah disimpan dalam format `.h5`.

---

## 🌐 Endpoint

**Base URL**  
`http://127.0.0.1:5000/predict`

**Method**  
`POST`

---

## 📋 Headers

```http
Content-Type: application/json
```

---

## 📦 Request Body (JSON)
```json
{
  "features": [4.5, 2000, 150000]
}
```
| Index         | Fitur             | Tipe  | Deskripsi                                  |
|---------------|-------------------|-------|--------------------------------------------|
| `0`           | rating            | float | Rating tempat wisata (contoh: 4.5)         |
| `1`           | Jumlah Pengunjung | int   | Total pengunjung per tahun                 |
| `2`           | Harga             | int   | Harga tiket masuk dalam Rupiah (IDR)       |

---

## ✅ Contoh Request (Python)

```python
import requests

url = "http://localhost:5000/cek_popularitas"
payload = {
    "features": [4.5, 2000, 150000]
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

---
## 📤 Contoh Response

```json
{
  "prediction": "Popular"
}
```

---

## ❌ Contoh Error Response

```json
{
  "error": "Invalid input format"
}
```
> Error ini muncul jika key features tidak tersedia atau formatnya salah (bukan list angka).

---

## 🛠️ Teknologi & File yang Digunakan
| Komponen          | File                   | Deskripsi                                    |
| ----------------- | ---------------------- | -------------------------------------------- |
| Model Klasifikasi | `popularitas_model.h5` | Model Keras biner untuk prediksi popularitas |
| API Service       | `app.py`               | Script Flask API                             |

---

## 🔁 Alur Prediksi
1. Terima input dalam format JSON dengan key features.
2. Lakukan reshaping agar sesuai format input model (1 x 3).
3. Jalankan prediksi menggunakan model Neural Network.
4. Ambil output probabilitas, lalu konversi menjadi:
   - "Popular" jika skor > 0.5
   - "Not Popular" jika skor <= 0.5


## 4. API Chatbot Wisata (Rekomendasi & Prediksi Rating)
API ini menyediakan layanan chatbot pintar untuk memberikan rekomendasi tempat wisata serta prediksi rating berdasarkan informasi lokasi, harga, dan kategori. Sistem ini menggunakan Gemini 1.5 Flash untuk memahami maksud pengguna dan menjalankan model yang sesuai.

---

## 🌐 Endpoint

**Base URL**  
`http://localhost:5000/chatbot`

**Method**  
`POST`

---

## 📋 Headers

```http
Content-Type: application/json
```

---

## 📦 Request Body (JSON)

```json
{
  "prompt": "Rekomendasikan tempat wisata yang mirip dengan Museum Taman Prasasti."
}

```

### Penjelasan Field:

| Field         | Tipe     | Wajib | Deskripsi                                  |
|---------------|----------|-------|--------------------------------------------|
| `prompt`      | string	 | Ya	   | Pertanyaan pengguna tentang wisata         |


---

## 🎯 Tipe Pertanyaan yang Didukung Chatbot

| Tipe Pertanyaan   | Contoh Kalimat                                                           | Output                                                                    |
|-------------------|--------------------------------------------------------------------------|---------------------------------------------------------------------------|
| Prediksi Rating   | "Berapa rating dari Tangkuban Perahu?"                                   | Rating diprediksi berdasarkan fitur tempat wisata                         |
| Rekomendasi       | "Tempat seperti Museum Taman Prasasti apa saja yang direkomendasikan?"   | Rekomendasi tempat wisata serupa berdasarkan TF-IDF dan cosine similarity |


---

## ✅ Contoh Request (Python)
### rekomendasi wisata
```python
import requests

url = "http://localhost:5000/chatbot"
payload = {
  "prompt": "saran rekomendasi tempat wisata yang mirip dengan Museum Taman Prasasti"
}

headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())

```

### prediksi rating
```python
import requests

url = "http://localhost:5000/chatbot"
payload = {
  "prompt": "Berapa rating Kota Tua?"
}

headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())

```

## 📤 Contoh Response
### Untuk Rekomendasi
```json
{
    "response": "Berikut rekomendasi mirip dengan 'Museum Taman Prasasti':\n\n21. Museum Wayang (Kategori: Budaya, Harga: Rp5000, Rating: 4.5)\n\n60. Museum Tekstil (Kategori: Budaya, Harga: Rp5000, Rating: 4.5)\n\n20. Museum Taman Prasasti (Kategori: Budaya, Harga: Rp2000, Rating: 4.5)\n\n74. Museum Tengah Kebun (Kategori: Budaya, Harga: Rp0, Rating: 4.6)\n\n41. Museum Bahari Jakarta (Kategori: Budaya, Harga: Rp2000, Rating: 4.4)"
}
```

### Untuk Prediksi Rating

```json
{
    "response": "Prediksi rating untuk 'Kota Tua' adalah sekitar 4.68."
}
```


---
## ❌ Contoh Error Response rekomendasi wisata

```json
{
    "response": "Maaf, saya tidak menemukan data tentang tempat 'Pantai Manggar'. Coba pastikan ejaannya benar atau tanyakan tempat lain."
}
```

## ❌ Contoh Error Response prediksi rating

```json
{
    "response": "Maaf, saya tidak menemukan data tentang tempat 'Pantai Manggar'. Coba pastikan ejaannya benar atau tanyakan tempat lain."
}
```

> Error ini muncul jika parameter wajib tidak disertakan dalam request.

---

## 🛠️ Teknologi & File yang Digunakan

## 📦 Struktur File & Fungsi Model

| Fungsi                 | File/Model                    | Deskripsi                                                                |
|------------------------|-------------------------------|--------------------------------------------------------------------------|
| **Model Prediksi Rating** | `model_tempat.h5`          | Model TensorFlow Keras untuk prediksi rating tempat                      |
|                        | `scaler_tempat.pkl`           | `StandardScaler` untuk `Price`, `Lat`, dan `Long`                        |
|                        | `lookup_tempat_city.pkl`      | `StringLookup` untuk encoding kolom `City`                               |
|                        | `lookup_tempat_category.pkl`  | `StringLookup` untuk encoding kolom `Category`                           |
| **Model Rekomendasi**  | `cosine_sim_matrix.pkl`       | Matriks kemiripan antar tempat wisata                                    |
|                        | `tfidf_vectorizer.pkl`        | Vectorizer TF-IDF untuk ekstraksi fitur konten tempat wisata             |
|                        | `place_indices.pkl`           | Pemetaan indeks nama tempat wisata                                       |
|                        | `df_tourism.pkl`              | Dataset tempat wisata (berisi nama, kategori, kota, harga, dll.)         |
| **NLP Prompt Engine**  | Gemini 1.5 Flash (via API/SDK)| Mengidentifikasi maksud pertanyaan dan nama tempat dalam kalimat pengguna|


---

## 🔁 Alur Kerja Chatbot
1. Pengguna mengirim pertanyaan ke endpoint /chatbot.
2. Gemini membaca dan memahami pertanyaan:
- Mengekstrak nama tempat wisata (jika ada).
- Mengklasifikasi jenis pertanyaan: PREDIKSI atau REKOMENDASI.
3. Model yang sesuai dijalankan:
- Prediksi Rating menggunakan model model_tempat.h5 + preprocessing.
- Rekomendasi menggunakan TF-IDF dan cosine similarity.
4. Sistem merespons dalam format teks JSON.



































