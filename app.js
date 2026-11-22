const express = require("express");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const app = express();

if (process.env.TRUST_PROXY === "1") {
  app.set("trust proxy", 1);
}

app.use(cors());
app.use(express.json());
app.use("/api", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { mensaje: "Desarrollo API REST utilizando JavaScript del lado del servidor con NodeJs." }
}));

app.use("/api/generos", require("./routes/generoRoutes"));
app.use("/api/genero", require("./routes/generoRoutes"));
app.use("/api/directores", require("./routes/directorRoutes"));
app.use("/api/productoras", require("./routes/productoraRoutes"));
app.use("/api/tipos", require("./routes/tipoRoutes"));
app.use("/api/media", require("./routes/mediaRoutes"));

app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ mensaje: "El cuerpo JSON no es válido" });
  }
  return res.status(error.statusCode || 500).json({
    mensaje: error.statusCode ? error.message : "Error interno del servidor",
  });
});

module.exports = app;
