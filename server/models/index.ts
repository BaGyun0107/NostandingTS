// import { DataTypes, Sequelize } from 'sequelize';
// import fs from 'fs';
// import path from 'path';

// const config = require('../config/config');
// const data = require('sequelize');

// // const fs = require('fs');
// // const path = require('path');
// const basename = path.basename(__filename);

// let sequelize: any;

// sequelize = new Sequelize(
//   config.development.database || 'root',
//   config.development.username || 'test',
//   config.development.password,
//   {
//     host: config.development.host,
//     dialect: 'mysql',
//     timezone: '+09:00', //? MySQL 내부의 디폴트 시간 UTC를 한국 시간으로 바꿔주기 위해
//   },
// );

// const db: any = {};

// fs.readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, data.dataType);
//     db[model.name] = model;
//     console.log(model);
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;

// export default db;

// import fs from 'fs';
// import path from 'path';
// // import config from '../config/config';

// const Sequelize = require('sequelize');

// const env = process.env.NODE_ENV || 'development';
// // const config = require(path.join(__dirname, '..', 'config', 'config.ts'));
// const config = require('../config/config')[env];
// // console.log(config[env]);
// const db: any = {};

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config,
// );

// console.log(sequelize);

// fs.readFileSync(__dirname)
//   .filter((file: any) => {
//     file.indexOf('.') !== 0 && file !== 'index.ts';
//   })
//   .forEach((file: any) => {
//     let model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//     console.log('model.name:' + model.name); // 테스트 로그
//   });

// Object.keys(db).forEach(modelName => {
//   if ('associate' in db[modelName]) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

// import { initModels } from './init-models';
// import { Sequelize } from 'sequelize';

// const config = require('../config/config');
// const env = 'development';
// const sequelizeConfig: any = config[env];

// const sequelize = new Sequelize(
//   sequelizeConfig.database,
//   sequelizeConfig.username,
//   sequelizeConfig.password,
//   {
//     host: sequelizeConfig.host,
//     timezone: sequelizeConfig.timezone,
//     dialect: 'mysql',
//   },
// );

// const db = {
//   ...initModels(sequelize),
//   sequelize: sequelize,
//   Sequelize: Sequelize,
// };

// module.exports = db;
