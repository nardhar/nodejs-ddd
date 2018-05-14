module.exports = (servicios, modelos) => {
  const comentarioServicio = {};

  // metodos Repository
  comentarioServicio.listar = (params) => {
    return modelos.Comentario.findAll(comentarioServicio.filtro(params));
  };

  comentarioServicio.encontrarUno = (params) => {
    return modelos.Comentario.findOne(comentarioServicio.filtro(params));
  };

  comentarioServicio.construir = (params) => {
    return modelos.Comentario.build(params);
  };

  comentarioServicio.guardar = (comentario, params) => {
    comentario.set(params);
    return comentario.save();
  };

  comentarioServicio.destruir = (comentario) => {
    return comentario.destroy();
  };

  comentarioServicio.filtro = (condiciones) => {
    return condiciones ? { where: condiciones } : {};
  };

  // metodos Factory
  comentarioServicio.crear = (params) => {
    return comentarioServicio.guardar(comentarioServicio.construir(params));
  };

  comentarioServicio.actualizar = (id, params) => {
    return comentarioServicio.obtener(id)
    .then((comentario) => {
      return comentarioServicio.guardar(comentario, params);
    });
  };

  comentarioServicio.obtener = (id) => {
    return comentarioServicio.encontrarUno({ id })
    .then((comentario) => {
      if (!comentario) throw new Error('Comentario no encontrado');
      return comentario;
    });
  }

  comentarioServicio.eliminar = (id) => {
    return comentarioServicio.obtener(id)
    .then(comentarioServicio.destruir);
  };

  return comentarioServicio;
};
