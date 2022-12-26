const connection = require('./db-connection.js');

module.exports =  {
  global: {
    connection,
    client: 'mysql',
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};




