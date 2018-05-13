module.exports = (sequelize, DataTypes) => {
  const Etiqueta = sequelize.define('Etiqueta', {
    nombre: DataTypes.STRING,
  }, {
    tableName: 'etiqueta',
  });

  Etiqueta.asociar = (modelos) => {
    modelos.Etiqueta.belongsTo(modelos.Articulo, {
      as: 'articulo',
      foreignKey: {
        name: 'idArticulo',
        field: 'id_articulo',
        allowNull: false,
      },
    });
  };

  return Etiqueta;
};
