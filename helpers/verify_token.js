const jwt = require('jsonwebtoken');

module.exports = {
    verifyAuthToken: (req, res, next) => {
        const token = req.token
        const key = "lavender"
        jwt.verify(token, key, (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "user unauthorized" });
            }
            req.user = decoded
            next()
        })
    }
};
