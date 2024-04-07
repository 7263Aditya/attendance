const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Class = require('../models/class');
const User = require('../models/users');

router.post('/create', auth, async (req, res) => {
  try {
    const { name, courseName, year } = req.body;

    // Find the teacher (user) who is creating the class
    const teacher = await User.findById(req.user.userId);

    // Check if the user is a teacher
    if (teacher.role !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers are allowed to create classes' });
    }

    // Create a new class with the provided details
    const currentTime = new Date();
    const expirationTime = new Date(currentTime);
    expirationTime.setHours(expirationTime.getHours() + 1); // Expires after 1 hour

    const newClass = new Class({
      name,
      courseName,
      year,
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

module.exports = router;
