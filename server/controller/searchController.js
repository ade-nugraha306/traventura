const Place = require("../models/placeModels");

exports.searchPlaces = async (req, res) => {
  try {
    const query = req.query.q || "";

    // Mencari data tempat wisata berdasarkan nama yang mengandung kata kunci (case-insensitive)
    const places = await Place.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error saat melakukan pencarian." });
  }
};
