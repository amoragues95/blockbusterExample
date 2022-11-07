require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": process.env.PROJECT_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username":process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_TEST_NAME,
    "host": process.env.PROJECT_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": process.env.PROJECT_HOST,
    "dialect": "mysql"
  }
}