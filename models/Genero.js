const mongoose = require("mongoose");

const GeneroSchema = new mongoose.Schema({
  nombre:{
    type:String,
    required:true
  },
  descripcion:String,
  estado:{
    type:Boolean,
    default:true
  }
},{
  timestamps:true
});

module.exports = mongoose.model("Genero",GeneroSchema);
