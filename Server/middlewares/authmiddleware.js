import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header (e.g., Bearer <token>)
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
        // Verify the token using your JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)

        // Attach the decoded user data (id, username) to the request object
        req.user = { id: decoded.id, username: decoded.username,isAdmin: decoded.isAdmin };

        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authMiddleware;
