const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');
const authJWT = require('../middleware/authJWT');

// POST /comments/:id → hanya bisa jika user sudah booking
router.post('/comments/:id', authJWT, commentController.addComment);

// GET /comments/:id → bebas diakses
router.get('/comments/:id', commentController.getCommentsByPlace);

module.exports = router;
