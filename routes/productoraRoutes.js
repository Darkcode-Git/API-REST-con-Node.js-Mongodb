const express = require("express");
const router = express.Router();

const {
  crearProductora,
  obtenerProductoras,
  obtenerProductora,
  actualizarProductora,
  eliminarProductora
} = require("../controllers/productoraController");

router.post("/", crearProductora);
router.get("/", obtenerProductoras);
router.get("/:id", obtenerProductora);
router.put("/:id", actualizarProductora);
router.delete("/:id", eliminarProductora);

module.exports = router;
