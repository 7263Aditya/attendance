const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Class = require('../models/class');

router.post('/create', auth, async (req, res) => {
  try {
    const { name } = req.body;
    const currentTime = new Date();
    const expirationTime = new Date(currentTime);
    expirationTime.setHours(expirationTime.getHours() + 1); // Expires after 1 hour

    const newClass = new Class({
      name,
      teacher: req.user.userId,
      startTime: currentTime,
      endTime: expirationTime
      // active: true // Assuming class is active when created
    });
    await newClass.save();
    res.status(201).json({ newClass, message: 'Class created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Implement other routes for class management (edit, delete, get all classes, etc.)

module.exports = router;
