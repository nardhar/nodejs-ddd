const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

// los parametros enviados son: base de datos, usuario, contraseña
const bd = new Sequelize('nodejs-ddd', 'nodejs-ddd', 'nodejs-ddd', { dialect: 'postgres' });

// definimos los modelos
const modelos = {};
modelos['Comentario'] = bd.import('./modelos/comentario.js');
modelos['Etiqueta'] = bd.import('./modelos/etiqueta.js');
modelos['Articulo'] = bd.import('./modelos/articulo.js');

Object.keys(modelos).forEach((nombre) => {
  if (modelos[nombre].asociar) modelos[nombre].asociar(modelos);
});

// cargamos los servicios
const servicios = {};
servicios['articulo'] = require('./servicios/articulo.servicio')(servicios, modelos);
servicios['comentario'] = require('./servicios/comentario.servicio')(servicios, modelos);
servicios['etiqueta'] = require('./servicios/etiqueta.servicio')(servicios, modelos);

// creamos la aplicacion express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// creamos el enrutador
const router = express.Router();

// cargamos los controladores en el enrutador
require('./controladores/articulo.controlador')(router, servicios);
require('./controladores/comentario.controlador')(router, servicios);
require('./controladores/etiqueta.controlador')(router, servicios);

// cargamos el enrutador en la aplicacion
app.use('/api/v1', router);

// manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(400).json({});
});

// sincronizamos la base de datos e iniciamos la aplicacion
bd.sync().then(() => {
  console.log('Aplicacion iniciada');
  app.listen(4000);
});
