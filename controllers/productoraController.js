const Productora = require("../models/Productora");
const { crearHandler, actualizarHandler } = require("./entidadController");

const camposProductora = ["nombre", "slogan", "descripcion", "estado"];

exports.crearProductora = crearHandler(Productora, camposProductora, (productora) => ({
  mensaje: "Productora creada correctamente",
  productora
}));

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

exports.actualizarProductora = actualizarHandler(Productora, camposProductora, "Productora no encontrada");

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
