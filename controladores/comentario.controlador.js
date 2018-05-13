module.exports = (router, models) => {
  router.get('/comentario', (req, res, next) => {
    return models.Comentario.findAndCountAll()
    .then((comentarios) => {
      return res.status(200).json(comentarios);
    })
    .catch(next);
  });

  router.get('/comentario/:id', (req, res, next) => {
    return models.Comentario.findOne({ where: { id: req.params.id } })
    .then((comentario) => {
      if (comentario) {
        return res.status(200).json(comentario);
      }
      return res.status(404).json({});
    })
    .catch(next);
  });

  router.post('/comentario', (req, res, next) => {
    return models.Comentario.create(req.body)
    .then((comentario) => {
      if (comentario) {
        return res.status(201).json(comentario);
      }
      return res.status(400).json({});
    })
    .catch(next);
  });

  router.put('/comentario/:id', (req, res, next) => {
    return models.Comentario.findOne({ where: { id: req.params.id } })
    .then((comentario) => {
      if (comentario) {
        return comentario.update(req.body)
        .then((comentario) => {
          if (comentario) {
            return res.status(200).json(comentario);
          }
          return res.status(400).json({});
        });
      }
      return res.status(404).json({});
    })
    .catch(next);
  });

  router.delete('/comentario/:id', (req, res, next) => {
    return models.Comentario.findOne({ where: { id: req.params.id } })
    .then((comentario) => {
      if (comentario) {
        return comentario.destroy(req.body)
        .then(() => {
          return res.status(200).json({});
        })
        .catch(() => {
          return res.status(400).json({});
        });
      }
      return res.status(404).json({});
    })
    .catch(next);
  });
};
