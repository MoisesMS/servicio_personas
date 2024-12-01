const express = require("express")
const axios = require("axios")
const bodyParser = require("body-parser")

const router = express.Router()

router.use(bodyParser.json())
const notes = []
router.post("/notes", async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "")

  try {
    const response = await axios.post("http://localhost:3000/verifyToken", { token })

    if(response.data.valid) {
      const note = req.body
      notes.push(note)

      res.status(201).send("Nota creada")
    } else {
      res.status(401).send("Token inválido")
    }
  } catch(error) {
    res.status(500).send("Authentication service is down")
  }
})

router.get("/notes", (req, res) => {
  res.json(notes)
})

module.exports = router
