# API REST - Gestión de Películas y Series

## Descripción

API REST desarrollada con Node.js, Express y MongoDB para la gestión de:

- Géneros
- Directores
- Productoras
- Tipos
- Medias (Películas y Series)

Proyecto realizado para la evidencia de aprendizaje de Ingeniería Web II.

---

## Tecnologías

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman

---

## Instalación

Clonar repositorio:

```bash
git clone https://github.com/usuario/peliculas-api-nodejs.git
```

Entrar al proyecto:

```bash
cd peliculas-api-nodejs
```

Instalar dependencias:

```bash
npm install
```

Crear archivo .env:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/peliculasDB
```

Ejecutar:

```bash
npm run dev
```

---

## Endpoints

### Género

GET

```http
/api/generos
```

POST

```http
/api/generos
```

PUT

```http
/api/generos/:id
```

DELETE

```http
/api/generos/:id
```

---

### Director

GET

```http
/api/directores
```

POST

```http
/api/directores
```

PUT

```http
/api/directores/:id
```

DELETE

```http
/api/directores/:id
```

---

### Productora

GET

```http
/api/productoras
```

POST

```http
/api/productoras
```

PUT

```http
/api/productoras/:id
```

DELETE

```http
/api/productoras/:id
```

---

### Tipo

GET

```http
/api/tipos
```

POST

```http
/api/tipos
```

PUT

```http
/api/tipos/:id
```

DELETE

```http
/api/tipos/:id
```

---

### Media

GET

```http
/api/media
```

POST

```http
/api/media
```

PUT

```http
/api/media/:id
```

DELETE

```http
/api/media/:id
```

---

## Autor

Juan Felipe Parra palacios

Institución Universitaria Digital de Antioquia
