const Director = require("../models/Director");
const { responderError, validarId } = require("./crudUtils");

// Crear director
exports.crearDirector = async (req, res) => {
  try {
    const director = await Director.create(req.body);

    res.status(201).json({
      mensaje: "Director creado correctamente",
      director,
    });
  } catch (error) {
    responderError(res,error);
  }
};

// Obtener todos
exports.obtenerDirectores = async (req, res) => {
  try {
    const directores = await Director.find();

    res.status(200).json(directores);
  } catch (error) {
    responderError(res,error);
  }
};

// Obtener por ID
exports.obtenerDirector = async (req, res) => {
  try {
    const id = validarId(res, req.params.id);
    if (!id) return;
    const director = await Director.findById(id);

    if (!director) {
      return res.status(404).json({
        mensaje: "Director no encontrado",
      });
    }

    res.status(200).json(director);
  } catch (error) {
    responderError(res,error);
  }
};

// Actualizar
exports.actualizarDirector = async (req, res) => {
  try {
    const id = validarId(res, req.params.id);
    if (!id) return;
    const director = await Director.findById(id);

    if (!director) {
      return res.status(404).json({ mensaje: "Director no encontrado" });
    }
    for (const campo of ["nombres", "estado"]) {
      if (Object.prototype.hasOwnProperty.call(req.body, campo)) director[campo] = req.body[campo];
    }
    await director.save();
    res.status(200).json(director);
  } catch (error) {
    responderError(res,error);
  }
};

// Eliminar
exports.eliminarDirector = async (req, res) => {
  try {
    const id = validarId(res, req.params.id);
    if (!id) return;
    const director = await Director.findByIdAndDelete(id);

    if (!director) {
      return res.status(404).json({ mensaje: "Director no encontrado" });
    }

    res.status(200).json({
      mensaje: "Director eliminado correctamente",
    });
  } catch (error) {
    responderError(res,error);
  }
};
