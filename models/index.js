const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const Carnet = sequelize.define('Carnet', {
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    timestamps: true, 
    createdAt: 'created_at',  
    updatedAt: 'updated_at',  
  });

sequelize.sync()
  .then(() => console.log('Base de donnée synchronisée'))
  .catch(err => console.error('Erreur de synchronisation de la Base de donnée:', err));

module.exports = {
  sequelize,
  Carnet,
};
