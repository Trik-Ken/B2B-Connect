const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Airtable = require('airtable');

const router = express.Router();

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const USERS_TABLE = 'Users';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// Signup
router.post('/signup', async (req, res) => {
  const { email, companyName, password } = req.body;
  if (!email || !companyName || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    // Check if user exists
    const records = await base(USERS_TABLE).select({ filterByFormula: `{Email} = '${email}'` }).firstPage();
    if (records.length > 0) return res.status(409).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    await base(USERS_TABLE).create([
      { fields: { Email: email, CompanyName: companyName, PasswordHash: hash } }
    ]);
    const token = jwt.sign({ email, companyName }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, email, companyName });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const records = await base(USERS_TABLE).select({ filterByFormula: `{Email} = '${email}'` }).firstPage();
    if (records.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = records[0].fields;
    const match = await bcrypt.compare(password, user.PasswordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ email, companyName: user.CompanyName }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, email, companyName: user.CompanyName });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

module.exports = router;