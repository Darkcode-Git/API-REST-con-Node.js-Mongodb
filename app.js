const express = require("express");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const app = express();

if (process.env.TRUST_PROXY === "1") {
  app.set("trust proxy", 1);
}

  const corsOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
    : ["*"];

  app.use(cors({
    origin(origin, callback) {
      if (!origin || corsOrigins.includes("*") || corsOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origen no permitido por CORS"));
    }
  }));
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

module.exports = app;
