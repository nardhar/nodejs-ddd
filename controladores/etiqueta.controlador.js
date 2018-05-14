module.exports = (router, servicios) => {
  router.get('/etiqueta', (req, res, next) => {
    return servicios.etiqueta.listar()
    .then((etiquetas) => {
      return res.status(200).json(etiquetas);
    })
    .catch(next);
  });

  router.post('/etiqueta', (req, res, next) => {
    return servicios.etiqueta.crear(req.body)
    .then((etiqueta) => {
      return res.status(201).json(etiqueta);
    })
    .catch(next);
  });

  router.get('/etiqueta/:id', (req, res, next) => {
    return servicios.etiqueta.obtener(req.params.id)
    .then((etiqueta) => {
      return res.status(200).json(etiqueta);
    })
    .catch(next);
  });

  router.put('/etiqueta/:id', (req, res, next) => {
    return servicios.etiqueta.actualizar(req.params.id, req.body)
    .then((etiqueta) => {
      return res.status(200).json(etiqueta);
    })
    .catch(next);
  });

  router.delete('/etiqueta/:id', (req, res, next) => {
    return servicios.etiqueta.eliminar(req.params.id)
    .then(() => {
      return res.status(200).json({});
    })
    .catch(next);
  });
};
