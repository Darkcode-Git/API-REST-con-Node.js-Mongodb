const express = require("express");

const router = express.Router();

const {
 crearMedia,
 obtenerMedia,
 obtenerMediaId,
 actualizarMedia,
 eliminarMedia
} = require("../controllers/mediaController");

router.post("/",crearMedia);
router.get("/",obtenerMedia);
router.get("/:id",obtenerMediaId);
router.put("/:id",actualizarMedia);
router.delete("/:id",eliminarMedia);

module.exports = router;
