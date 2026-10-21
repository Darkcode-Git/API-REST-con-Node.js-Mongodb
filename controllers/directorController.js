const Director = require("../models/Director");
const { crearHandler, actualizarHandler } = require("./entidadController");

const camposDirector = ["nombres", "estado"];

exports.crearDirector = crearHandler(Director, camposDirector, (director) => ({
  mensaje: "Director creado correctamente",
  director
}));

// Obtener todos
exports.obtenerDirectores = async (req, res) => {
  try {
    const directores = await Director.find();

    res.status(200).json(directores);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Obtener por ID
exports.obtenerDirector = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);

    if (!director) {
      return res.status(404).json({
        mensaje: "Director no encontrado",
      });
    }

    res.status(200).json(director);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.actualizarDirector = actualizarHandler(Director, camposDirector, "Director no encontrado");

// Eliminar
exports.eliminarDirector = async (req, res) => {
  try {
    await Director.findByIdAndDelete(req.params.id);

    res.status(200).json({
      mensaje: "Director eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
