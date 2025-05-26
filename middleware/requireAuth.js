const jwt = require('jsonwebtoken');
const UsersModels = require('../Models/Users.models');

const requireAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Authorization header missing or improperly formatted' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Received token:", token);

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UsersModels.findById(_id).select('_id');
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(401).json({ msg: 'Request is not authorized' });
    }
};

module.exports = { requireAuth };
