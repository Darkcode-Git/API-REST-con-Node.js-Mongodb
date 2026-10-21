const mongoose = require("mongoose");

const TipoSchema = new mongoose.Schema({
  nombre:{
    type:String,
    trim:true,
    required:true
  },
  descripcion:String
},{
  timestamps:{createdAt:"fechaCreacion",updatedAt:"fechaActualizacion"},
  collection:"tipos"
});

module.exports = mongoose.model("Tipo",TipoSchema);
