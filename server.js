require("dotenv").config();

const app = require("./app");

const conectarDB = require("./config/db");

conectarDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
