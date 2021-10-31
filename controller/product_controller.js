const { connection } = require("../connection");

module.exports = {
    products: async (req, res) => {
        const msc = await connection.promise().getConnection()
        let sql = `SELECT p.product_id, p.name, p.price, p.stock, p.image, t.type FROM product p
        join type t on p.type_id = t.type_id`
        try {
            let [result] = await msc.query(sql)
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            return res.status(500).send({ message: error.message })
        }
    },
    addProduct: async (req, res) => {
        const { name, price, stock, image, type_id } = req.body
        const msc = await connection.promise().getConnection()
        try {
            if (!name || !price || !stock || !image || !type_id) {
                return res.status(400).send({ message: "isi semua" })
            }
            let sql = `insert into product set ?`
            let addProductData = {
                name, price, stock, image, type_id
            }
            let [insertData] = await msc.query(sql, addProductData)
            sql = `select * from product where product_id = ?`
            let [result] = await msc.query(sql, insertData.insertId)
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    deleteProduct: async (req, res) => {
        const { product_id } = req.params
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from product where product_id = ?`
            let [cekProduk] = await msc.query(sql, product_id)
            if (!cekProduk.length) {
                return res.status(400).send({ message: "produk tidak ada" })
            }
            sql = `delete from product where product_id = ?`
            await msc.query(sql, product_id)
            sql = `select * from product`
            let [result] = await msc.query(sql)
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    }
};
