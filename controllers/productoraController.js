const Productora = require("../models/Productora");
const { responderError, validarId } = require("./crudUtils");

// Crear
exports.crearProductora = async (req, res) => {
  try {
    const productora = await Productora.create(req.body);

    res.status(201).json({
      mensaje: "Productora creada correctamente",
      productora,
    });
  } catch (error) {
    responderError(res,error);
  }
};

// Obtener todas
exports.obtenerProductoras = async (req, res) => {
  try {
    const productoras = await Productora.find();

    res.status(200).json(productoras);
  } catch (error) {
    responderError(res,error);
  }
};

// Obtener por ID
exports.obtenerProductora = async (req, res) => {
  try {
    const id = validarId(res, req.params.id);
    if (!id) return;
    const productora = await Productora.findById(id);

    if (!productora) {
      return res.status(404).json({
        mensaje: "Productora no encontrada",
      });
    }

    res.status(200).json(productora);
  } catch (error) {
    responderError(res,error);
  }
};

// Actualizar
exports.actualizarProductora = async (req, res) => {
  try {
    const id = validarId(res, req.params.id);
    if (!id) return;
    const productora = await Productora.findById(id);

    if (!productora) {
      return res.status(404).json({ mensaje: "Productora no encontrada" });
    }
    for (const campo of ["nombre", "slogan", "descripcion", "estado"]) {
      if (Object.prototype.hasOwnProperty.call(req.body, campo)) productora[campo] = req.body[campo];
    }
    await productora.save();
    res.status(200).json(productora);
  } catch (error) {
    responderError(res,error);
  }
};

// Eliminar
exports.eliminarProductora = async (req, res) => {
  try {
    const id = validarId(res, req.params.id);
    if (!id) return;
    const productora = await Productora.findByIdAndDelete(id);

    if (!productora) {
      return res.status(404).json({ mensaje: "Productora no encontrada" });
    }

    res.status(200).json({
      mensaje: "Productora eliminada correctamente",
    });
  } catch (error) {
    responderError(res,error);
  }
};
