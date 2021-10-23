const express = require('express')
const app = express()
const cors = require('cors')
const { auth_route } = require('./routes')
const port = 9000

// Gatau Namanya
app.use(express.json())
app.use(cors())

// API
app.use("/", auth_route)

app.listen(port, () => {
    console.log("server berjalan di port 9000");
})
