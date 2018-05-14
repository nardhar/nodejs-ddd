module.exports = (router, servicios) => {
  router.get('/comentario', (req, res, next) => {
    return servicios.comentario.listar()
    .then((comentarios) => {
      return res.status(200).json(comentarios);
    })
    .catch(next);
  });

  router.post('/comentario', (req, res, next) => {
    return servicios.comentario.crear(req.body)
    .then((comentario) => {
      return res.status(201).json(comentario);
    })
    .catch(next);
  });

  router.get('/comentario/:id', (req, res, next) => {
    return servicios.comentario.obtener(req.params.id)
    .then((comentario) => {
      return res.status(200).json(comentario);
    })
    .catch(next);
  });

  router.put('/comentario/:id', (req, res, next) => {
    return servicios.comentario.actualizar(req.params.id, req.body)
    .then((comentario) => {
      return res.status(200).json(comentario);
    })
    .catch(next);
  });

  router.delete('/comentario/:id', (req, res, next) => {
    return servicios.comentario.eliminar(req.params.id)
    .then(() => {
      return res.status(200).json({});
    })
    .catch(next);
  });
};
