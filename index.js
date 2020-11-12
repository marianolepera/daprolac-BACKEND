const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Middlewares
const { logErrors, wrapErrors, errorHandler } = require('./utils/middlewares/error-handler');
const notFoundHandler = require('./utils/middlewares/not-found-handler');

// Configuracion
const { config } = require('./config');
const db = require('./config/mysql');

db.sync({force: false})
    .then(console.log('Conexion a la base de datos establecida con exito!'))
    .catch(err => console.log(err));

// crea una app de express
const app = express();

// habilita bodyParser
app.use(bodyParser.urlencoded({extended: false})); // Datos de formularios
app.use(bodyParser.json()); // formato json

// habilitar cors
app.use(cors());

// documentacion
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// rutas de la API
app.use('/api/v1', routes());

// captura error 404
app.use(notFoundHandler);

// manejo de errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Servidor escuchando en puerto ${config.port}`);
});
