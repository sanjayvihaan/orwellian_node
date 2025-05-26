const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'Hello world' });
});

app.use('/users', require('./Routes/UserHandler'));
app.use('/check', require('./Routes/UrlHandler'));

// Vercel requires module.exports for serverless functions
module.exports = app;

// Local development - only run server if not in Vercel environment
if (process.env.VERCEL !== '1') {
    const PORT = process.env.PORT || 8080;
    connectDB()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Server started at port ${PORT}`);
            });
        })
        .catch((error) => {
            console.error('Error connecting to the database:', error);
        });
}