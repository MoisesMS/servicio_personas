const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("./bbdd.js")
const routes = require("./routes/routes")

const PORT = 3001

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use("/", routes)

app.listen(PORT, (req, res) => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
