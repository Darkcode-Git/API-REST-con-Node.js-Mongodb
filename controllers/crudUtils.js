const mongoose = require("mongoose");

const validarId = (res, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ mensaje: "El identificador indicado no es válido" });
    return null;
  }
  return new mongoose.Types.ObjectId(id);
};

const responderError = (res, error) => {
  if (error && error.code === 11000) {
    return res.status(409).json({ mensaje: "El registro ya existe" });
  }

  if (error && (error.name === "ValidationError" || error.name === "CastError")) {
    return res.status(400).json({ mensaje: error.message });
  }

  return res.status(error && error.statusCode ? error.statusCode : 500).json({
    mensaje: error && error.statusCode ? error.message : "Error interno del servidor",
  });
};

module.exports = { responderError, validarId };
