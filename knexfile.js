const localPgConnection = {
  host: 'localhost', // address to find the db server
  database: 'lambda',
  user: 'luis',
  password: 'pass'
};

//where is DATABASE_URL coming from?
const dbConnection = process.env.DATABASE_URL || localPgConnection;

// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3'
    },

    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true // not needed for production, only sqlite
  },
  production: {
    client: 'pg',
    connection: dbConnection + '?ssl=true',
    // can be and object or a string
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};
