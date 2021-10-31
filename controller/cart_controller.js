const { connection } = require("../connection");

module.exports = {
    getCartData: async (req, res) => {
        const { user_id } = req.params
        const msc = await connection.promise().getConnection()
        try {
            let sql = `SELECT p.product_id, p.name, p.price, c.quantity, p.image, t.type FROM cart c
            join product p on c.product_id = p.product_id
            join type t on p.type_id = t.type_id
            where user_id = ?`
            let [result] = await msc.query(sql, user_id)
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    addToCart: async (req, res) => {
        const { user_id } = req.params
        const { product_id, quantity } = req.body
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from cart where user_id = ? and product_id = ?`
            let [result] = await msc.query(sql, [user_id, product_id])
            if (result.length) {
                let updateQuantity = {
                    quantity: result[0].quantity + quantity
                }
                sql = `update cart set ? where product_id = ? and user_id = ?`
                await msc.query(sql, [updateQuantity, result[0].product_id, result[0].user_id])
                sql = `select * from cart where user_id = ?`
                let [result2] = await msc.query(sql, user_id)
                msc.release()
                return res.status(200).send(result2)
            }
            sql = `insert into cart set ?`
            let dataInsert = {
                cart_id: user_id,
                user_id,
                product_id,
                quantity
            }
            await msc.query(sql, dataInsert)
            sql = `select * from cart where user_id = ?`
            let [result3] = await msc.query(sql, user_id)
            msc.release()
            return res.status(200).send(result3)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    deleteFromCart: async (req, res) => {
        const { product_id, user_id } = req.params
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from cart where product_id = ? and user_id = ?`
            let [result] = await msc.query(sql, [product_id, user_id])
            if (!result.length) {
                msc.release()
                return res.status(500).send({ message: "tidak ada produk" })
            }
            sql = `delete from cart where product_id = ? and user_id = ?`
            await msc.query(sql, [product_id, user_id])
            sql = `SELECT p.product_id, p.name, p.price, c.quantity, p.image, t.type FROM cart c
            join product p on c.product_id = p.product_id
            join type t on p.type_id = t.type_id
            where user_id = ?`
            let [result2] = await msc.query(sql, user_id)
            msc.release()
            return res.status(200).send(result2)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    }
};
