const Media = require("../models/Media");
const Genero = require("../models/Genero");
const Director = require("../models/Director");
const Productora = require("../models/Productora");
const Tipo = require("../models/Tipo");

const referencias = {
  genero: { modelo: Genero, nombre: "género", requiereActivo: true },
  director: { modelo: Director, nombre: "director", requiereActivo: true },
  productora: { modelo: Productora, nombre: "productora", requiereActivo: true },
  tipo: { modelo: Tipo, nombre: "tipo", requiereActivo: false }
};

const camposEditables = [
  "serial",
  "titulo",
  "sinopsis",
  "url",
  "imagenPortada",
  "anoEstreno",
  "genero",
  "director",
  "productora",
  "tipo"
];

const validarReferencias = async (media) => {
  await Promise.all(Object.entries(referencias).map(async ([campo, referencia]) => {
    const valor = media[campo];
    if (!valor) {
      const error = new Error(`El campo ${referencia.nombre} es obligatorio`);
      error.statusCode = 400;
      throw error;
    }

    const documento = await referencia.modelo.findById(valor);
    if (!documento) {
      const error = new Error(`El ${referencia.nombre} indicado no existe`);
      error.statusCode = 400;
      throw error;
    }

    if (referencia.requiereActivo && documento.estado !== "Activo") {
      const error = new Error(`El ${referencia.nombre} no está activo`);
      error.statusCode = 400;
      throw error;
    }
  }));
};

const validarUnicidad = async (media, excluirId) => {
  for (const campo of ["serial", "url"]) {
    if (media[campo] === undefined) continue;

    const filtro = { [campo]: media[campo] };
    if (excluirId) filtro._id = { $ne: excluirId };
    if (await Media.exists(filtro)) {
      const error = new Error(`El ${campo} ya está registrado`);
      error.statusCode = 409;
      throw error;
    }
  }
};

const responderError = (res, error) => {
  if (error.code === 11000) {
    return res.status(409).json({ mensaje: "El serial o la URL ya están registrados" });
  }

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ mensaje: error.message });
  }

  return res.status(error.statusCode || 500).json({
    mensaje: error.statusCode ? error.message : "Error interno del servidor"
  });
};

const poblarReferencias = (consulta) => consulta
  .populate("genero")
  .populate("director")
  .populate("productora")
  .populate("tipo");

exports.crearMedia = async (req, res) => {
  try {
    const media = new Media(req.body);
    await validarUnicidad(media);
    await validarReferencias(media);
    await media.save();
    res.status(201).json(media);
  } catch (error) {
    responderError(res, error);
  }
};

exports.obtenerMedia = async (req, res) => {
  try {
    const media = await poblarReferencias(Media.find());
    res.json(media);
  } catch (error) {
    responderError(res, error);
  }
};

exports.obtenerMediaId = async (req, res) => {
  try {
    const media = await poblarReferencias(Media.findById(req.params.id));
    if (!media) return res.status(404).json({ mensaje: "Media no encontrada" });
    res.json(media);
  } catch (error) {
    responderError(res, error);
  }
};

exports.actualizarMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ mensaje: "Media no encontrada" });

    for (const campo of camposEditables) {
      if (Object.prototype.hasOwnProperty.call(req.body, campo)) {
        media.set(campo, req.body[campo]);
      }
    }

    await validarUnicidad(media, media._id);
    await validarReferencias(media);
    await media.save();
    res.json(media);
  } catch (error) {
    responderError(res, error);
  }
};

exports.eliminarMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ mensaje: "Media no encontrada" });
    res.json({ mensaje: "Media eliminada" });
  } catch (error) {
    responderError(res, error);
  }
};
