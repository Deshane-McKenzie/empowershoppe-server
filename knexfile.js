require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    // client: 'mysql',
    // connection: {
    //   host: '127.0.0.1',
    //   database: process.env.DB_LOCAL_DBNAME,
    //   user: process.env.DB_LOCAL_USER,
    //   password: process.env.DB_LOCAL_PASSWORD,
    // }
    client: 'mysql',
    connection: {
      host: process.env.DB_DEPLOY_HOST,
      database: process.env.DB_DEPLOY_DBNAME,
      user: process.env.DB_DEPLOY_USER,
      password: process.env.DB_DEPLOY_PASSWORD,
    }
};
