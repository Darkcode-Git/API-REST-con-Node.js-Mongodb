const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema({
  nombres:{
    type:String,
    required:true
  },
  estado:{
    type:Boolean,
    default:true
  }
},{
  timestamps:true
});

module.exports = mongoose.model("Director",DirectorSchema);
