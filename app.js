const express = require("express");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const app = express();

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
app.use("/api/directores", require("./routes/directorRoutes"));
app.use("/api/productoras", require("./routes/productoraRoutes"));
app.use("/api/tipos", require("./routes/tipoRoutes"));
app.use("/api/media", require("./routes/mediaRoutes"));

module.exports = app;
