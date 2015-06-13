// Definicion del modelo de Comment con validación

module.exports = function(sequelize, DataTypes){
  return sequelize.define(
    'comment',{
    texto:{
      type: DataTypes.STRING,
      validate: {notEmpty : {msg: "Falta Comentario"}}
    },
    publicado:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
}
