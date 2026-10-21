const Genero = require("../models/Genero");
const { crearHandler, actualizarHandler } = require("./entidadController");

const camposGenero = ["nombre", "descripcion", "estado"];

exports.crearGenero = crearHandler(Genero, camposGenero, (genero) => genero);
exports.obtenerGeneros = async(req,res)=>{
    const generos = await Genero.find();
    res.json(generos);
};

exports.obtenerGenero = async(req,res)=>{
    const genero = await Genero.findById(req.params.id);
    res.json(genero);
};

exports.actualizarGenero = actualizarHandler(Genero, camposGenero, "Género no encontrado");

exports.eliminarGenero = async(req,res)=>{
    await Genero.findByIdAndDelete(req.params.id);

    res.json({
      mensaje:"Genero eliminado"
    });
};
