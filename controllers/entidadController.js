const validarCuerpo = (cuerpo) => {
  if (!cuerpo || typeof cuerpo !== "object" || Array.isArray(cuerpo)) {
    const error = new Error("El cuerpo de la solicitud debe ser un objeto JSON");
    error.statusCode = 400;
    throw error;
  }
};

const seleccionarCampos = (cuerpo, campos) => Object.fromEntries(
  campos
    .filter((campo) => Object.prototype.hasOwnProperty.call(cuerpo, campo))
    .map((campo) => [campo, cuerpo[campo]])
);

const responderError = (res, error) => {
  if (error.code === 11000) {
    return res.status(409).json({ mensaje: "El registro ya existe" });
  }

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ mensaje: error.message });
  }

  return res.status(error.statusCode || 500).json({
    mensaje: error.statusCode ? error.message : "Error interno del servidor"
  });
};

exports.validarCuerpo = validarCuerpo;

exports.crearHandler = (Modelo, campos, respuestaCreacion) => async (req, res) => {
  try {
    validarCuerpo(req.body);
    const documento = new Modelo(seleccionarCampos(req.body, campos));
    await documento.save();
    return res.status(201).json(respuestaCreacion(documento));
  } catch (error) {
    return responderError(res, error);
  }
};

exports.actualizarHandler = (Modelo, campos, mensajeNoEncontrado) => async (req, res) => {
  try {
    validarCuerpo(req.body);
    const documento = await Modelo.findById(req.params.id);
    if (!documento) {
      return res.status(404).json({ mensaje: mensajeNoEncontrado });
    }

    documento.set(seleccionarCampos(req.body, campos));
    await documento.save();
    return res.status(200).json(documento);
  } catch (error) {
    return responderError(res, error);
  }
};
