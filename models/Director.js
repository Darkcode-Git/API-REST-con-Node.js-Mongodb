const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema({
  nombres:{
    type:String,
    trim:true,
    required:true
  },
  estado:{
    type:String,
    enum:["Activo","Inactivo"],
    default:"Activo",
    required:true
  }
},{
  timestamps:{createdAt:"fechaCreacion",updatedAt:"fechaActualizacion"},
  collection:"directores"
});

module.exports = mongoose.model("Director",DirectorSchema);
