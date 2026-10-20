const express = require("express");
const router = express.Router();

const {
  crearTipo,
  obtenerTipos,
  obtenerTipo,
  actualizarTipo,
  eliminarTipo
} = require("../controllers/tipoController");

router.post("/", crearTipo);
router.get("/", obtenerTipos);
router.get("/:id", obtenerTipo);
router.put("/:id", actualizarTipo);
router.delete("/:id", eliminarTipo);

module.exports = router;
