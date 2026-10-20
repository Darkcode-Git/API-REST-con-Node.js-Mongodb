const express = require("express");
const router = express.Router();

const {
  crearDirector,
  obtenerDirectores,
  obtenerDirector,
  actualizarDirector,
  eliminarDirector
} = require("../controllers/directorController");

router.post("/", crearDirector);
router.get("/", obtenerDirectores);
router.get("/:id", obtenerDirector);
router.put("/:id", actualizarDirector);
router.delete("/:id", eliminarDirector);

module.exports = router;
