module.exports = (servicios, modelos) => {
  const etiquetaServicio = {};

  // metodos Repository
  etiquetaServicio.listar = (params) => {
    return modelos.Etiqueta.findAll(etiquetaServicio.filtro(params));
  };

  etiquetaServicio.encontrarUno = (params) => {
    return modelos.Etiqueta.findOne(etiquetaServicio.filtro(params));
  };

  etiquetaServicio.construir = (params) => {
    return modelos.Etiqueta.build(params);
  };

  etiquetaServicio.guardar = (etiqueta, params) => {
    etiqueta.set(params);
    return etiqueta.save();
  };

  etiquetaServicio.destruir = (etiqueta) => {
    return etiqueta.destroy();
  };

  etiquetaServicio.filtro = (condiciones) => {
    return condiciones ? { where: condiciones } : {};
  };

  // metodos Factory
  etiquetaServicio.crear = (params) => {
    return etiquetaServicio.guardar(etiquetaServicio.construir(params));
  };

  etiquetaServicio.actualizar = (id, params) => {
    return etiquetaServicio.obtener(id)
    .then((etiqueta) => {
      return etiquetaServicio.guardar(etiqueta, params);
    });
  };

  etiquetaServicio.obtener = (id) => {
    return etiquetaServicio.encontrarUno({ id })
    .then((etiqueta) => {
      if (!etiqueta) throw new Error('Etiqueta no encontrada');
      return etiqueta;
    });
  }

  etiquetaServicio.eliminar = (id) => {
    return etiquetaServicio.obtener(id)
    .then(etiquetaServicio.destruir);
  };

  return etiquetaServicio;
};
