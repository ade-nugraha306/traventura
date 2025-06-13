const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/userModels");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// REG MANUAL
exports.register = async (req, res) => {
  const { displayName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      authType: "local",
      displayName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.googleLogin = async (req, res) => {
  const { token: googleToken } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, name: displayName, email } = payload;
    
    // Perbaikan: Ambil URL foto langsung tanpa modifikasi
    let photo = payload.picture;
    
    // Jika ada foto, pastikan menggunakan size yang konsisten
    if (photo) {
      // Hapus parameter size lama dan tambahkan yang baru
      photo = photo.replace(/=s\d+-c$/, '=s96-c');
      // Jika belum ada parameter size, tambahkan
      if (!photo.includes('=s')) {
        photo += '=s96-c';
      }
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        authType: "google",
        googleId,
        displayName,
        email,
        photo,
      });
      await user.save();
    } else {
      // Update foto jika user sudah ada
      user.photo = photo;
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        photo: user.photo,
      },
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(401).json({ error: "Google login gagal", details: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: { id: user._id, email: user.email, displayName: user.displayName },
    });
  } catch (err) {
    res.status(500).json({ error: "Gagal login" });
  }
};
