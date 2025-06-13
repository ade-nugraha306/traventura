const Booking = require('../models/bookingModels');

// POST /api/booking
exports.createBooking = async (req, res) => {
  try {
    const user_id = req.userId; 
    const { place_id } = req.body;

    if (!user_id || !place_id) {
      return res.status(400).json({ message: 'user_id dan place_id wajib diisi' });
    }

    const existingBooking = await Booking.findOne({ user_id, place_id });

    if (existingBooking) {
      return res.status(409).json({ message: 'Kamu sudah pernah booking tempat ini.' });
    }

    const newBooking = new Booking({ user_id, place_id });
    await newBooking.save();

    res.status(201).json({ message: 'Booking berhasil disimpan' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error });
  }
};

// GET /api/booking/:place_id
exports.getAllBookingByUser = async (req, res) => {
  try {
    const user_id = req.userId; // ini hasil dari JWT yang sudah diverifikasi
    const bookings = await Booking.find({ user_id });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data booking', error });
  }
};

// GET /api/booking
exports.checkBooking = async (req, res) => {
  try {
    const user_id = req.userId;
    const place_id = Number(req.params.place_id);

    const booking = await Booking.findOne({ user_id, place_id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking tidak ditemukan' });
    }

    res.status(200).json({ message: 'Booking ditemukan', booking });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error });
  }
};
