const Genero = require("../models/Genero");

exports.crearGenero = async(req,res)=>{
    try{
        const genero = await Genero.create(req.body);
        res.status(201).json(genero);
    }catch(error){
        res.status(500).json(error);
    }
};

exports.obtenerGeneros = async(req,res)=>{
    const generos = await Genero.find();
    res.json(generos);
};

exports.obtenerGenero = async(req,res)=>{
    const genero = await Genero.findById(req.params.id);
    res.json(genero);
};

exports.actualizarGenero = async(req,res)=>{
    const genero = await Genero.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );

    res.json(genero);
};

exports.eliminarGenero = async(req,res)=>{
    await Genero.findByIdAndDelete(req.params.id);

    res.json({
      mensaje:"Genero eliminado"
    });
};
