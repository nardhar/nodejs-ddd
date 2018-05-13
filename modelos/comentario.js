module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define('Comentario', {
    texto: DataTypes.STRING,
    autor: DataTypes.STRING,
    fecha: DataTypes.DATE,
  }, {
    tableName: 'comentario',
  });

  Comentario.asociar = (modelos) => {
    modelos.Comentario.belongsTo(modelos.Articulo, {
      as: 'articulo',
      foreignKey: {
        name: 'idArticulo',
        field: 'id_articulo',
        allowNull: false,
      },
    });
  };

  return Comentario;
};
