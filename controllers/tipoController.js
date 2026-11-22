const Tipo = require("../models/Tipo");
const { responderError, validarId } = require("./crudUtils");

// Crear
exports.crearTipo = async (req, res) => {
  try {
    const tipo = await Tipo.create(req.body);

    res.status(201).json({
      mensaje: "Tipo creado correctamente",
      tipo,
    });
  } catch (error) {
    responderError(res,error);
  }
};

// Obtener todos
exports.obtenerTipos = async (req, res) => {
  try {
    const tipos = await Tipo.find();

    res.status(200).json(tipos);
  } catch (error) {
    responderError(res,error);
  }
};

// Obtener por ID
exports.obtenerTipo = async (req, res) => {
  try {
    const id = validarId(res, req.params.id);
    if (!id) return;
    const tipo = await Tipo.findById(id);

    if (!tipo) {
      return res.status(404).json({
        mensaje: "Tipo no encontrado",
      });
    }

    res.status(200).json(tipo);
  } catch (error) {
    responderError(res,error);
  }
};

// Actualizar
exports.actualizarTipo = async (req, res) => {
  try {
    const id = validarId(res, req.params.id);
    if (!id) return;
    const tipo = await Tipo.findById(id);

    if (!tipo) {
      return res.status(404).json({ mensaje: "Tipo no encontrado" });
    }
    for (const campo of ["nombre", "descripcion"]) {
      if (Object.prototype.hasOwnProperty.call(req.body, campo)) tipo[campo] = req.body[campo];
    }
    await tipo.save();
    res.status(200).json(tipo);
  } catch (error) {
    responderError(res,error);
  }
};

// Eliminar
exports.eliminarTipo = async (req, res) => {
  try {
    const id = validarId(res, req.params.id);
    if (!id) return;
    const tipo = await Tipo.findByIdAndDelete(id);

    if (!tipo) {
      return res.status(404).json({ mensaje: "Tipo no encontrado" });
    }

    res.status(200).json({
      mensaje: "Tipo eliminado correctamente",
    });
  } catch (error) {
    responderError(res,error);
  }
};
