module.exports = (sequelize, DataTypes) => {
  const Articulo = sequelize.define('Articulo', {
    titulo: DataTypes.STRING,
    contenido: DataTypes.STRING,
    autor: DataTypes.STRING,
    fecha: DataTypes.DATE,
  }, {
    tableName: 'articulo',
  });

  Articulo.asociar = (modelos) => {
    modelos.Articulo.hasMany(modelos.Comentario, {
      as: 'comentarios',
      foreignKey: 'idArticulo',
    });
    modelos.Articulo.hasMany(modelos.Etiqueta, {
      as: 'etiquetas',
      foreignKey: 'idArticulo',
    });
  };

  return Articulo;
};
