const jwt = require('jsonwebtoken');

module.exports = {
    createAuthToken: (data) => {
        const key = "lavender"
        const token = jwt.sign(data, key, { expiresIn: "24h" })
        return token
    }
};
