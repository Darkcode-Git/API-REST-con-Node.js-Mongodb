const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/generos", require("./routes/generoRoutes"));
app.use("/api/directores", require("./routes/directorRoutes"));
app.use("/api/productoras", require("./routes/productoraRoutes"));
app.use("/api/tipos", require("./routes/tipoRoutes"));
app.use("/api/media", require("./routes/mediaRoutes"));

module.exports = app;
