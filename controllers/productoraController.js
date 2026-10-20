const Productora = require("../models/Productora");

// Crear
exports.crearProductora = async (req, res) => {
  try {
    const productora = await Productora.create(req.body);

    res.status(201).json({
      mensaje: "Productora creada correctamente",
      productora,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Obtener todas
exports.obtenerProductoras = async (req, res) => {
  try {
    const productoras = await Productora.find();

    res.status(200).json(productoras);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Obtener por ID
exports.obtenerProductora = async (req, res) => {
  try {
    const productora = await Productora.findById(req.params.id);

    if (!productora) {
      return res.status(404).json({
        mensaje: "Productora no encontrada",
      });
    }

    res.status(200).json(productora);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Actualizar
exports.actualizarProductora = async (req, res) => {
  try {
    const productora = await Productora.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(productora);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Eliminar
exports.eliminarProductora = async (req, res) => {
  try {
    await Productora.findByIdAndDelete(req.params.id);

    res.status(200).json({
      mensaje: "Productora eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
