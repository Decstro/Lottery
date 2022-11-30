import {connection} from './db-connection.js'

export default {
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
