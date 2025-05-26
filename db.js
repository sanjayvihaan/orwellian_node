const mongoose = require('mongoose');
const mongoURI = process.env.mongo_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log('Database connected');
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;
