const crypto = require('crypto');

module.exports = (word) => {
    let hashing = crypto
        .createHmac("sha256", "kendrick")
        .update(word)
        .digest("hex")
    return hashing
};