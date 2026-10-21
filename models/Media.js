const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  serial:{
    type:String,
    trim:true,
    required:true,
    unique:true
  },
  titulo:{
    type:String,
    trim:true,
    required:true
  },
  sinopsis:String,
  url:{
    type:String,
    trim:true,
    unique:true,
    required:true
  },
  imagenPortada:{
    type:String,
    trim:true
  },
  anoEstreno:Number,
  genero:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Genero",
    required:true
  },
  director:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Director",
    required:true
  },
  productora:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Productora",
    required:true
  },
  tipo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Tipo",
    required:true
  }
},{
  timestamps:{createdAt:"fechaCreacion",updatedAt:"fechaActualizacion"},
  collection:"medias"
});

module.exports = mongoose.model("Media",MediaSchema);
