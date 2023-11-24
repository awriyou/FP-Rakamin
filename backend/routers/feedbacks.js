const pool = require('../config/pg.connection');
const express = require('express');
const router = express.Router();

router.post(`/`, async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'Please provide all fields.' });
  }

  const insertFeedbackQuery = `INSERT INTO feedback (email, subject, message) VALUES ($1, $2, $3) RETURNING *;`;

  try {
    const result = await pool.query(insertFeedbackQuery, [email, subject, message]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send feedback.' });
  }
});

module.exports = router;
