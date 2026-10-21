const mongoose = require("mongoose");

const ProductoraSchema = new mongoose.Schema({
  nombre:{
    type:String,
    trim:true,
    required:true
  },
  slogan:String,
  descripcion:String,
  estado:{
    type:String,
    enum:["Activo","Inactivo"],
    default:"Activo",
    required:true
  }
},{
  timestamps:{createdAt:"fechaCreacion",updatedAt:"fechaActualizacion"},
  collection:"productoras"
});

module.exports = mongoose.model("Productora",ProductoraSchema);
