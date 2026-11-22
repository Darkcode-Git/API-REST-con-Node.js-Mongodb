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

## Modelos y reglas de datos

- Géneros, directores y productoras usan `estado: "Activo"` o `"Inactivo"`; por defecto se crean activos.
- Todos los modelos generan `fechaCreacion` y `fechaActualizacion` automáticamente.
- Las producciones usan `serial`, `titulo`, `url`, `imagenPortada`, `anoEstreno` y referencias obligatorias a `genero`, `director`, `productora` y `tipo`.
- `serial` y `url` son únicos. Al crear o actualizar una producción, el género, director y productora referenciados deben existir y estar activos; el tipo debe existir.
- Las consultas de medios incluyen los documentos relacionados de género, director, productora y tipo.

Ejemplo de cuerpo para `POST /api/media`:

```json
{
  "serial": "PEL-001",
  "titulo": "Título de ejemplo",
  "sinopsis": "Sinopsis de la producción",
  "url": "https://ejemplo.com/titulo",
  "imagenPortada": "https://ejemplo.com/portada.jpg",
  "anoEstreno": 2024,
  "genero": "ID_GENERO",
  "director": "ID_DIRECTOR",
  "productora": "ID_PRODUCTORA",
  "tipo": "ID_TIPO"
}
```

---

## Endpoints

### Género

GET

```http
/api/generos
```

También disponible en singular:

```http
GET /api/genero
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
 Autor
 
Juan Felipe Parra Palacios

Institución Universitaria Digital de Antioquia

## Aplicación React

La interfaz web se encuentra en `client/` y permite consultar, crear, editar y eliminar géneros, directores, productoras, tipos y películas/series.

1. Inicia la API desde la raíz con `npm install` y `npm run dev`.
2. En otra terminal, entra a `client/`, instala dependencias con `npm install` y ejecuta `npm run dev`.
3. Abre la dirección local indicada por Vite. La interfaz se conecta por defecto a `http://localhost:3000/api`.

Para usar otra dirección de API, configura `VITE_API_URL` en un archivo `client/.env`. Incluye `/api` al final de la URL. La API debe permitir solicitudes CORS desde el origen donde se ejecuta la interfaz.

## Despliegue en Render

El archivo `render.yaml` configura un servicio web para la API y un sitio estático para React. Se necesita una cuenta de Render y una base de datos MongoDB accesible desde Render, por ejemplo MongoDB Atlas.

1. Crea la base de datos y un usuario con permisos sobre ella. Configura el acceso de red de Atlas para las conexiones salientes de Render y copia la cadena de conexión. Las direcciones salientes pueden cambiar; si permites `0.0.0.0/0`, usa credenciales robustas y permisos mínimos.
2. En Render, crea un **Blueprint** conectado a este repositorio y selecciona `render.yaml`. Introduce `MONGO_URI` como variable secreta de la API. No incluyas credenciales en el repositorio.
3. Configura `VITE_API_URL` en el sitio estático con la URL HTTPS pública de la API seguida de `/api`, por ejemplo `https://tu-api.onrender.com/api`. Si la URL definitiva todavía no está disponible al crear el Blueprint, actualiza la variable cuando la API esté creada y vuelve a desplegar el frontend: Vite incorpora esta variable durante la compilación.
4. Espera a que ambos servicios terminen de desplegarse. Abre el sitio estático y crea o actualiza un género, director, productora y tipo. Después crea y actualiza una película o serie usando esos registros. Comprueba que los cambios sigan presentes al recargar la página.

Render proporciona `PORT`; no se debe configurar manualmente. `TRUST_PROXY=1` se usa para identificar clientes detrás del proxy de Render y aplicar el límite de solicitudes. La configuración de red y la conexión a MongoDB deben verificarse si la API no inicia.

**Seguridad:** esta aplicación no tiene autenticación ni autorización y la API permite CORS desde cualquier origen. Cualquier persona que alcance la API puede consultar, crear, modificar o eliminar datos. Úsala solo con datos de prueba hasta implementar controles de acceso adecuados.
