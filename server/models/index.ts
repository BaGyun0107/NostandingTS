import { DataTypes, Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

// const Sequelize = require('sequelize');
// const fs = require('fs');
// const path = require('path');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.ts')[env];

let sequelize: Sequelize;

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const db = {
  sequelize,
  Sequelize,
};

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
