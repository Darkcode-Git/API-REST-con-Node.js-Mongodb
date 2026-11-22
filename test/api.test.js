const test = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");

const app = require("../app");
const Genero = require("../models/Genero");
const Director = require("../models/Director");
const Productora = require("../models/Productora");
const Tipo = require("../models/Tipo");
const Media = require("../models/Media");

test("todos los modelos requieren sus campos principales", async () => {
  const casos = [
    [new Genero(), "nombre"],
    [new Director(), "nombres"],
    [new Productora(), "nombre"],
    [new Tipo(), "nombre"],
    [new Media(), "serial"],
  ];

  for (const [documento, campo] of casos) {
    await assert.rejects(
      () => documento.validate(),
      (error) => Boolean(error?.errors[campo]),
      `se esperaba validar el campo ${campo}`,
    );
  }
});

test("media valida año de estreno y referencias obligatorias", async () => {
  const id = new mongoose.Types.ObjectId();
  const media = new Media({
    serial: "PEL-001",
    titulo: "Película",
    url: "https://ejemplo.com/pelicula",
    anoEstreno: 1800,
    genero: id,
    director: id,
    productora: id,
    tipo: id,
  });

  await assert.rejects(
    () => media.validate(),
    (error) => Boolean(error?.errors.anoEstreno),
  );
});

test("los cinco módulos exponen los métodos HTTP CRUD", () => {
  const modulos = [
    ["género", require("../routes/generoRoutes")],
    ["director", require("../routes/directorRoutes")],
    ["productora", require("../routes/productoraRoutes")],
    ["tipo", require("../routes/tipoRoutes")],
    ["media", require("../routes/mediaRoutes")],
  ];

  for (const [nombre, router] of modulos) {
    const metodos = new Set(
      router.stack
        .filter((capa) => capa.route)
        .flatMap((capa) => Object.keys(capa.route.methods)),
    );
    assert.ok(metodos.has("get"), `${nombre} debe exponer GET`);
    assert.ok(metodos.has("post"), `${nombre} debe exponer POST`);
    assert.ok(metodos.has("put"), `${nombre} debe exponer PUT`);
    assert.ok(metodos.has("delete"), `${nombre} debe exponer DELETE`);
  }
});

test("la API responde 404 para rutas inexistentes", async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));

  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/ruta-inexistente`);
    const body = await response.json();
    assert.equal(response.status, 404);
    assert.equal(body.mensaje, "Ruta no encontrada");
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve())
    );
  }
});
