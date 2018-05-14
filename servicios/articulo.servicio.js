module.exports = (servicios, modelos) => {
  const articuloServicio = {};

  // metodos Repository
  articuloServicio.listar = (params) => {
    return modelos.Articulo.findAll(articuloServicio.filtro(params));
  };

  articuloServicio.encontrarUno = (params) => {
    return modelos.Articulo.findOne(articuloServicio.filtro(params));
  };

  articuloServicio.construir = (params) => {
    return modelos.Articulo.build(params);
  };

  articuloServicio.guardar = (articulo, params) => {
    if (params) {
      articulo.set(params);
    }
    return articulo.save();
  };

  articuloServicio.destruir = (articulo) => {
    return articulo.destroy();
  };

  articuloServicio.filtro = (condiciones) => {
    return condiciones ? { where: condiciones } : {};
  };

  // metodos Factory
  articuloServicio.crear = (params) => {
    return articuloServicio.guardar(articuloServicio.construir(params));
  };

  articuloServicio.actualizar = (id, params) => {
    return articuloServicio.obtener(id)
    .then((articulo) => {
      return articuloServicio.guardar(articulo, params);
    });
  };

  articuloServicio.obtener = (id) => {
    return articuloServicio.encontrarUno({ id })
    .then((articulo) => {
      if (!articulo) throw new Error('Articulo no encontrado');
      return articulo;
    });
  }

  articuloServicio.eliminar = (id) => {
    return articuloServicio.obtener(id)
    .then(articuloServicio.destruir);
  };

  // metodos Aggregate
  articuloServicio.crearConEtiquetas = (params) => {
    return articuloServicio.crear(params.articulo)
    .then((articulo) => {
      const etiquetaList = params.etiquetas.map((etiqueta) => {
        return servicios.etiqueta.crear(params.etiqueta);
      });

      return Promise.all(etiquetaList).then(() => {
        return articuloServicio.obtener(articulo.id);
      })
    });
  };

  return articuloServicio;
};
