const mongoose = require("mongoose");
const csv = require("csvtojson");
const path = require("path");
require("dotenv").config();

const Place = require("./placeModels.js");

async function importCSV() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected.");

    const jsonArray = await csv().fromFile(
      path.join(__dirname, "processed_tourism_data.csv")
    );

    const placeMap = new Map();

    for (const item of jsonArray) {
      const place_id = Number(item.Place_Id);
      if (!placeMap.has(place_id)) {
        placeMap.set(place_id, {
          place_id: place_id,
          name: item.Place_Name,
          description: item.Description,
          thumbnail: "", // Optional
          rating: parseFloat(item.Rating) || 0,
          location: {
            lat: parseFloat(item.Lat),
            lng: parseFloat(item.Long),
          },
          price: parseFloat(item.Price) || 0
        });
      }
    }

    const places = Array.from(placeMap.values());

    // 🧹 Bersihkan koleksi lama
    await Place.deleteMany();
    console.log("🧹 Koleksi 'places' dibersihkan.");

    // 🚀 Masukkan data baru
    await Place.insertMany(places);

    console.log(`🎉 Berhasil import ${places.length} tempat wisata.`);
    process.exit();
  } catch (error) {
    console.error("❌ Gagal import:", error);
    process.exit(1);
  }
}

importCSV();
