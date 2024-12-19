const mongoose = require('mongoose');

const ConnectDb = async () => {
    try {
        const db = await mongoose.connect('mongodb+srv://kriyonainfotech:kriyonainfotech@cluster0.ntvag.mongodb.net/');
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
    }
};

module.exports = { ConnectDb };
