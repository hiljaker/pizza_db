const { connection, msc } = require("../connection");
const { hash } = require("../helpers");
const { createAuthToken } = require("../helpers/create_token");

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body
        const msc = await connection.promise().getConnection()
        let sql = `SELECT u.user_id, u.username, u.password, r.role FROM user u
        join role r on u.role_id = r.role_id where username = ? and password = ?`
        try {
            let [result] = await msc.query(sql, [username, hash(password)])
            if (!result.length) {
                return res.status(400).send({ message: "akun tidak ditemukan" })
            }
            const dataToken = {
                user_id: result[0].user_id,
                username: result[0].username,
                role_id: result[0].role_id
            }
            const accessToken = createAuthToken(dataToken)
            msc.release()
            res.set('access-token', accessToken)
            return res.status(200).send(result)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    signup: async (req, res) => {
        const { username, password } = req.body
        const msc = await connection.promise().getConnection()
        let sql = `select * from user where username = ?`
        try {
            let [result] = await msc.query(sql, username)
            if (result.length) {
                return res.status(400).send({ message: "username telah digunakan" })
            }
            let dataSignup = {
                username,
                password: hash(password)
            }
            sql = `insert into user set ?`
            let [newUser] = await msc.query(sql, dataSignup)
            sql = `select * from user where user_id = ?`
            let [result2] = await msc.query(sql, newUser.insertId)
            msc.release()
            return res.status(200).send({ ...result2[0], cart: [] })
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    keepLoggedIn: async (req, res) => {
        const { user_id } = req.user
        const msc = await connection.promise().getConnection()
        let sql = `SELECT u.user_id, u.username, u.password, r.role FROM user u
        join role r on u.role_id = r.role_id where user_id = ?`
        try {
            let [result] = await msc.query(sql, user_id)
            if (!result.length) {
                return res.status(400).send({ message: "akun tidak ditemukan" })
            }
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    users: async (req, res) => {
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from user`
            let [result] = await msc.query(sql)
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    userbyid: async (req, res) => {
        const { user_id } = req.params
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from user where user_id = ?`
            let [result] = await msc.query(sql, user_id)
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    }
};
