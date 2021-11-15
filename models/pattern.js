const { DataTypes } = require("sequelize");
const db = require("../db");

const Pattern = db.define("pattern", {
    project: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stitcher: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})
module.exports = Pattern;