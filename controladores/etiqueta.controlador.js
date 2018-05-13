module.exports = (router, models) => {
  router.get('/etiqueta', (req, res, next) => {
    return models.Etiqueta.findAndCountAll()
    .then((etiquetas) => {
      return res.status(200).json(etiquetas);
    })
    .catch(next);
  });

  router.get('/etiqueta/:id', (req, res, next) => {
    return models.Etiqueta.findOne({ where: { id: req.params.id } })
    .then((etiqueta) => {
      if (etiqueta) {
        return res.status(200).json(etiqueta);
      }
      return res.status(404).json({});
    })
    .catch(next);
  });

  router.post('/etiqueta', (req, res, next) => {
    return models.Etiqueta.create(req.body)
    .then((etiqueta) => {
      if (etiqueta) {
        return res.status(201).json(etiqueta);
      }
      return res.status(400).json({});
    })
    .catch(next);
  });

  router.put('/etiqueta/:id', (req, res, next) => {
    return models.Etiqueta.findOne({ where: { id: req.params.id } })
    .then((etiqueta) => {
      if (etiqueta) {
        return etiqueta.update(req.body)
        .then((etiqueta) => {
          if (etiqueta) {
            return res.status(200).json(etiqueta);
          }
          return res.status(400).json({});
        });
      }
      return res.status(404).json({});
    })
    .catch(next);
  });

  router.delete('/etiqueta/:id', (req, res, next) => {
    return models.Etiqueta.findOne({ where: { id: req.params.id } })
    .then((etiqueta) => {
      if (etiqueta) {
        return etiqueta.destroy(req.body)
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
