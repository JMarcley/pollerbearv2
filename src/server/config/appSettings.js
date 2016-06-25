

/*
 * Set DB_TYPE to a database of your choice:
 * - MONGO: MongoDB
 * - POSTGRES: Postgresql
 * - NONE: There is no DB connection
 */
module.exports = {
  DB_TYPE: process.env.DB_TYPE || 'MONGO',
  ENV: process.env.NODE_ENV
};
