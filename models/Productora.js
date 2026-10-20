const mongoose = require("mongoose");

const ProductoraSchema = new mongoose.Schema({
  nombre:{
    type:String,
    required:true
  },
  slogan:String,
  descripcion:String,
  estado:{
    type:Boolean,
    default:true
  }
},{
  timestamps:true
});

module.exports = mongoose.model("Productora",ProductoraSchema);
