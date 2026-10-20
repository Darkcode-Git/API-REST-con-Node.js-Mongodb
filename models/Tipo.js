const mongoose = require("mongoose");

const TipoSchema = new mongoose.Schema({
  nombre:{
    type:String,
    required:true
  },
  descripcion:String
},{
  timestamps:true
});

module.exports = mongoose.model("Tipo",TipoSchema);
