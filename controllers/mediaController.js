const Media = require("../models/Media");

exports.crearMedia = async(req,res)=>{

 const media = await Media.create(req.body);

 res.status(201).json(media);

};

exports.obtenerMedia = async(req,res)=>{

 const media = await Media.find()
 .populate("genero")
 .populate("director")
 .populate("productora")
 .populate("tipo");

 res.json(media);

};

exports.obtenerMediaId = async(req,res)=>{

 const media = await Media.findById(req.params.id)
 .populate("genero")
 .populate("director")
 .populate("productora")
 .populate("tipo");

 res.json(media);

};

exports.actualizarMedia = async(req,res)=>{

 const media = await Media.findByIdAndUpdate(
   req.params.id,
   req.body,
   {new:true}
 );

 res.json(media);

};

exports.eliminarMedia = async(req,res)=>{

 await Media.findByIdAndDelete(req.params.id);

 res.json({
   mensaje:"Media eliminada"
 });

};
