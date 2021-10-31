const express = require('express')
const app = express()
const cors = require('cors')
const { auth_route, product_route, cart_route } = require('./routes')
const port = 9000
const bearer = require('express-bearer-token');

// Gatau Namanya
app.use(express.json())
app.use(cors({
    exposedHeaders: ["access-token"]
}))
app.use(bearer())

// API
app.use("/", auth_route)
app.use("/", product_route)
app.use("/", cart_route)

app.listen(port, () => {
    console.log("server berjalan di port 9000");
})
