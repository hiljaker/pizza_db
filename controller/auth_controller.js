const { connection } = require("../connection");
const { hash } = require("../helpers");

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body
        const msc = connection.promise()
        let sql = `select * from user where username = ? and password = ?`
        try {
            let [result] = await msc.query(sql, [username, password])
            if (!result.length) {
                return res.status(400).send({ message: "akun tidak ditemukan" })
            }
            return res.status(200).send(result)
        } catch (error) {
            return res.status(500).send({ message: error.message })
        }
    }
};
