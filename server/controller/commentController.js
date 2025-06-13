const Comment = require('../models/commentModels');
const Booking = require('../models/bookingModels');

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const place_id = parseInt(req.params.id); // pastikan number
    const user_id = req.userId; // dari middleware JWT

    if (!text) {
      return res.status(400).json({ error: 'Komentar tidak boleh kosong' });
    }

    // Cek apakah user sudah booking tempat tersebut
    const existingBooking = await Booking.findOne({ user_id, place_id });

    if (!existingBooking) {
      return res.status(403).json({ error: 'Kamu harus booking tempat ini dulu sebelum bisa komen.' });
    }

    const comment = new Comment({
      place_id,
      user_id,
      text
    });

    await comment.save();
    res.status(201).json({ message: 'Komentar berhasil ditambahkan', comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan komentar' });
  }
};
exports.getCommentsByPlace = async (req, res) => {
  try {
    const place_id = req.params.id;
    const comments = await Comment.find({ place_id })
    .sort({ createdAt: -1 })
    .populate('user_id', 'displayName email photo authType'); // hanya ambil field yang diperlukan

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil komentar' });
  }
};
