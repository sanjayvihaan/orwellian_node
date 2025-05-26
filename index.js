const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Running db
require('dotenv').config();
const connectDB = require('./db'); // Import the function to establish the database connection

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure that the MongoDB connection is established before starting the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started at port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

app.get('/', (req, res) => {
    res.json({
        msg: 'Hello world',
    });
});

app.use('/users', require('./Routes/UserHandler'));
app.use('/check', require('./Routes/UrlHandler'));

// Rest of your Express app code
