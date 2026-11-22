const Genero = require("../models/Genero");
const { responderError, validarId } = require("./crudUtils");

exports.crearGenero = async(req,res)=>{
    try{
        const genero = await Genero.create(req.body);
        res.status(201).json(genero);
    }catch(error){
        responderError(res,error);
    }
};

exports.obtenerGeneros = async(req,res)=>{
    try {
        const generos = await Genero.find();
        res.status(200).json(generos);
    } catch (error) {
        responderError(res,error);
    }
};

exports.obtenerGenero = async(req,res)=>{
    try {
        const id = validarId(res, req.params.id);
        if (!id) return;
        const genero = await Genero.findById(id);
        if (!genero) return res.status(404).json({mensaje:"Genero no encontrado"});
        res.status(200).json(genero);
    } catch (error) {
        responderError(res,error);
    }
};

exports.actualizarGenero = async(req,res)=>{
    try {
        const id = validarId(res, req.params.id);
        if (!id) return;
        const genero = await Genero.findById(id);
        if (!genero) return res.status(404).json({mensaje:"Genero no encontrado"});
        for (const campo of ["nombre","descripcion","estado"]) {
          if (Object.prototype.hasOwnProperty.call(req.body,campo)) genero[campo] = req.body[campo];
        }
        await genero.save();
        res.status(200).json(genero);
    } catch (error) {
        responderError(res,error);
    }
};

exports.eliminarGenero = async(req,res)=>{
    try {
        const id = validarId(res, req.params.id);
        if (!id) return;
        const genero = await Genero.findByIdAndDelete(id);
        if (!genero) return res.status(404).json({mensaje:"Genero no encontrado"});
        res.status(200).json({mensaje:"Genero eliminado"});
    } catch (error) {
        responderError(res,error);
    }
};
