const Director = require("../models/Director");

// Crear director
exports.crearDirector = async (req, res) => {
  try {
    const director = await Director.create(req.body);

    res.status(201).json({
      mensaje: "Director creado correctamente",
      director,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

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

// Actualizar
exports.actualizarDirector = async (req, res) => {
  try {
    const director = await Director.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(director);
  } catch (error) {
    res.status(500).json(error);
  }
};

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
