const express = require("express")
const axios = require("axios")
const bodyParser = require("body-parser")
const Notes = require("../models/notes")
const router = express.Router()

router.use(bodyParser.json())
router.post("/notes", async (req, res) => {
  const token = getToken(req)
  
  const tokenValid = await isTokenValid(token)

  console.log(tokenValid)
  if(tokenValid.valid) {
    const notes = new Notes({
      user : tokenValid.username,
      note : req.body.note,
      complete : req.body.complete || false
    })
    await notes.save()

    res.status(201).send("Nota creada")
  } else {
    res.status(401).send("Token inválido")
  }
})

router.get("/notes", async (req, res) => {
  const token = getToken(req)
  const tokenValid = await isTokenValid(token)
  let notes = []
  if(tokenValid.valid) {
    
    try {
      const user = tokenValid.username

      notes = await Notes.find({ user : user })
      console.log(notes)
      res.json(notes)
    } catch(error) {
      console.log(error)
      res.status(500).json({error: `${error}`})
    }
    
  } else {
    res.status(401).send("Token invalido")
  }
})

//TODO Implementar funcionalidad que permita marcar una nota como completada

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
