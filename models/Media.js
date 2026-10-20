const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({

  serial:{
    type:String,
    required:true,
    unique:true
  },

  titulo:{
    type:String,
    required:true
  },

  sinopsis:String,

  url:{
    type:String,
    unique:true,
    required:true
  },

  imagen:String,

  anioEstreno:Number,

  genero:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Genero"
  },

  director:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Director"
  },

  productora:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Productora"
  },

  tipo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Tipo"
  }

},{
  timestamps:true
});

module.exports = mongoose.model("Media",MediaSchema);
