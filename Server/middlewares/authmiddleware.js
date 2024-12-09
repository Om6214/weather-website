import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)

        req.user = { id: decoded.id, username: decoded.username,isAdmin: decoded.isAdmin };

        next();  
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authMiddleware;
