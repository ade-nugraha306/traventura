const Booking = require('../models/bookingModels');

exports.validateBooking = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.token;
    const place_id = Number (req.params.id); 

    const booking = await Booking.findOne({ user_id: token, place_id });

    if (!booking) {
      console.warn(`Akses ditolak: user ${token} belum booking place_id ${place_id}`);
      return res.status(403).json({ message: 'Kamu harus booking tempat ini terlebih dahulu' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat validasi booking', error });
  }
};
