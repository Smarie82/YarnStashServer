const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {

    ssl: {

        require: true,

        rejectUnauthorized: false, // very important

      }

  }
})

module.exports = db;
