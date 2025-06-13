const Place = require("../models/placeModels");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const ML_API_URI = process.env.ML_API_URI;

// Flask Api
exports.getRecommendations = async (req, res) => {
  try {
    const {
      Place_Name = "",
      Category = "",
      Price = "",
      Rating = "",
      sortBy = "rating",
      randomize = true,
    } = req.body;

    // Normalisasi dan parsing Category dari user
    const categoryList = Category
      ? Category.split("|")
          .map((c) => c.trim().toLowerCase())
          .filter(Boolean)
      : [];

    // Kirim ke Flask dengan Category dikosongkan (biar semua diproses)
    const response = await axios.post(`${ML_API_URI}/recommend`, {
      Place_Name,
      Category: "",
      Price,
      Rating,
    });

    let recommendations = response.data.recommendations || [];

    // Filter hasil rekomendasi berdasarkan kategori user
    if (categoryList.length > 0) {
      recommendations = recommendations.filter((item) => {
        const itemCategory = (item.Category || "").toLowerCase();
        return categoryList.some((cat) => itemCategory.includes(cat));
      });
    }

    // Acak jika diminta
    if (randomize) {
      recommendations = recommendations.sort(() => Math.random() - 0.5);
    }

    // Urutkan hasil jika tidak diacak
    if (!randomize && sortBy === "rating") {
      recommendations = recommendations.sort((a, b) => b.Rating - a.Rating);
    } else if (!randomize && sortBy === "price") {
      recommendations = recommendations.sort((a, b) => a.Price - b.Price);
    }

    res.json({
      filteredCategories: categoryList, // Opsional: buat debug lebih mudah
      recommendations,
    });
  } catch (err) {
    console.error("Recommendation error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.predictRecommendation = async (req, res) => {
  try {
    const { Place_Name, City, Category, Price, Lat, Long } = req.body;
    const response = await axios.post(`${ML_API_URI}/predict`, {
      Place_Name,
      City,
      Category,
      Price,
      Lat,
      Long,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.checkPopularity = async (req, res) => {
  try {
    const { rerata_rating, jumlah_user, jumlah_review } = req.body;
    const response = await axios.post(`${ML_API_URI}/cek_popularitas`, {
      rerata_rating,
      jumlah_user,
      jumlah_review,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.chatbot = async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await axios.post(`${ML_API_URI}/chatbot`, {
            prompt
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.json(place);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.randomRecommendations = async (req, res) => {
  try {
    const randomPlaces = await Place.aggregate([
      { $sample: { size: 10 } }, // Ganti jumlah sesuai kebutuhan
    ]);

    res.status(200).json(randomPlaces);
  } catch (err) {
    console.error("Error saat ambil data random:", err);
    res.status(500).json({ error: "Gagal ambil data random" });
  }
};
