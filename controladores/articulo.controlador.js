module.exports = (router, servicios) => {
  router.get('/articulo', (req, res, next) => {
    return servicios.articulo.listar()
    .then((articulos) => {
      return res.status(200).json(articulos);
    })
    .catch(next);
  });

  router.post('/articulo', (req, res, next) => {
    return servicios.articulo.crear(req.body)
    .then((articulo) => {
      return res.status(201).json(articulo);
    })
    .catch(next);
  });

  router.get('/articulo/:id', (req, res, next) => {
    return servicios.articulo.obtener(req.params.id)
    .then((articulo) => {
      return res.status(200).json(articulo);
    })
    .catch(next);
  });

  router.put('/articulo/:id', (req, res, next) => {
    return servicios.articulo.actualizar(req.params.id, req.body)
    .then((articulo) => {
      return res.status(200).json(articulo);
    })
    .catch(next);
  });

  router.delete('/articulo/:id', (req, res, next) => {
    return servicios.articulo.eliminar(req.params.id)
    .then(() => {
      return res.status(200).json({});
    })
    .catch(next);
  });
};
