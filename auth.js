const jwt = require('jsonwebtoken')

const ensureAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403)
            .json({ message: "Token is required" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(403)
                .json({ message: "Token is expired or invalid" });
        }
        req.userInfo = decodedToken;
        next();
    } catch (err) {
        return res.status(403)
            .json({ message: "Token is expired or invalid" });
    }
}
module.exports = ensureAuthenticated;