const mongoose = require("mongoose");

const conectarDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("Falta la variable MONGO_URI");
  }

  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000
  });

  console.log("MongoDB conectado");
};

module.exports = conectarDB;
