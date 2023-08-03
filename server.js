const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//* Rutas de los Controladores:
const userRoutes = require("./app/routes/user.routes");
const bootcampRoutes = require("./app/routes/bootcamp.routes");

app.use("/api/user", userRoutes);
app.use("/api/bootcamp", bootcampRoutes);


//* Conexión con el Servidor y Restableciendo Base de Datos:
const PUERTO = 3000;
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el PUERTO: ${PUERTO}`);
});

