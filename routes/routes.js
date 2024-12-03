const express = require("express")
const axios = require("axios")
const bodyParser = require("body-parser")

const router = express.Router()

router.use(bodyParser.json())
const notes = []

router.post("/notes", async (req, res) => {
  const token = getToken(req)
  const tokenValid = await isTokenValid(token)

  if(tokenValid.valid) {
    notes.push(req.body)

    res.status(201).send("Nota creada")
  } else {
    res.status(401).send("Token inválido")
  }
})

router.get("/notes", async (req, res) => {
  const token = getToken(req)
  const tokenValid = await isTokenValid(token)
  
  if(tokenValid.valid) {
    const userNotes = notes.filter(notes => notes.user === tokenValid.username)
    res.json(userNotes)
  } else {
    res.status(401).send("Token invalido")  }
})

const getToken = req => req.header("Authorization").replace("Bearer ", "")
const isTokenValid = async token => {

  try {
    const response = await axios.post("http://localhost:3000/verifyToken", { token })
    const resValid = response.data


    return resValid
  } catch(error) {
    console.error(`Error en la verificación del token ${error.message}`)
    return { valid : false}
  }
}
module.exports = router
