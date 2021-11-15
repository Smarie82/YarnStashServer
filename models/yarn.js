const { DataTypes } = require("sequelize");
const db = require("../db");

const Yarn = db.define("yarn", {
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    length: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bin: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stitcher: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})
module.exports = Yarn;