const mongoose = require("mongoose");

const GeneroSchema = new mongoose.Schema({
  nombre:{
    type:String,
    trim:true,
    required:true
  },
  descripcion:String,
  estado:{
    type:String,
    enum:["Activo","Inactivo"],
    default:"Activo",
    required:true
  }
},{
  timestamps:{createdAt:"fechaCreacion",updatedAt:"fechaActualizacion"},
  collection:"generos"
});

module.exports = mongoose.model("Genero",GeneroSchema);
