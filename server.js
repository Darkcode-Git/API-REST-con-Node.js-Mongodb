require("dotenv").config();

const app = require("./app");
const conectarDB = require("./config/db");

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await conectarDB();

    const servidor = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });

    const cerrarServidor = async (signal) => {
      console.log(`Recibida señal ${signal}; cerrando servidor...`);
      servidor.close(async () => {
        await require("mongoose").disconnect();
        process.exit(0);
      });
    };

    process.once("SIGTERM", () => cerrarServidor("SIGTERM"));
    process.once("SIGINT", () => cerrarServidor("SIGINT"));
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
    process.exit(1);
  }
};

iniciarServidor();
