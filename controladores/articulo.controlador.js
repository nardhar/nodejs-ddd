module.exports = (router, models) => {
  router.get('/articulo', (req, res, next) => {
    return models.Articulo.findAndCountAll()
    .then((articulos) => {
      return res.status(200).json(articulos);
    })
    .catch(next);
  });

  router.post('/articulo', (req, res, next) => {
    return models.Articulo.create(req.body)
    .then((articulo) => {
      if (articulo) {
        return res.status(201).json(articulo);
      }
      return res.status(400).json({});
    })
    .catch(next);
  });

  // metodos get/:id, put y delete acortados para facilitar lectura
  router.get('/articulo/:id', (req, res, next) => {
    return models.Articulo.findOne({ where: { id: req.params.id } })
    .then((articulo) => {
      if (articulo) {
        return res.status(200).json(articulo);
      }
      return res.status(404).json({});
    })
    .catch(next);
  });

  router.put('/articulo/:id', (req, res, next) => {
    return models.Articulo.findOne({ where: { id: req.params.id } })
    .then((articulo) => {
      if (articulo) {
        return articulo.update(req.body)
        .then((articulo) => {
          if (articulo) {
            return res.status(200).json(articulo);
          }
          return res.status(400).json({});
        });
      }
      return res.status(404).json({});
    })
    .catch(next);
  });

  router.delete('/articulo/:id', (req, res, next) => {
    return models.Articulo.findOne({ where: { id: req.params.id } })
    .then((articulo) => {
      if (articulo) {
        return articulo.destroy(req.body)
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
