const mongoose = require('mongoose');

const conn = mongoose.createConnection("mongodb://localhost:27017/notas")

// Definir el esquema de usuario
const notesSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  note: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  }
});



// Crear el modelo de usuario a partir del esquema
const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;
