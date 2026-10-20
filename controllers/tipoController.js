const Tipo = require("../models/Tipo");

// Crear
exports.crearTipo = async (req, res) => {
  try {
    const tipo = await Tipo.create(req.body);

    res.status(201).json({
      mensaje: "Tipo creado correctamente",
      tipo,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Obtener todos
exports.obtenerTipos = async (req, res) => {
  try {
    const tipos = await Tipo.find();

    res.status(200).json(tipos);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Obtener por ID
exports.obtenerTipo = async (req, res) => {
  try {
    const tipo = await Tipo.findById(req.params.id);

    if (!tipo) {
      return res.status(404).json({
        mensaje: "Tipo no encontrado",
      });
    }

    res.status(200).json(tipo);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Actualizar
exports.actualizarTipo = async (req, res) => {
  try {
    const tipo = await Tipo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(tipo);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Eliminar
exports.eliminarTipo = async (req, res) => {
  try {
    await Tipo.findByIdAndDelete(req.params.id);

    res.status(200).json({
      mensaje: "Tipo eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
