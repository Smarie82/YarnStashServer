const User = require("./user");
const Yarn = require("./yarn");
const Pattern = require("./pattern");
// create individual files for your models and import them here
User.hasMany(Yarn);
Yarn.belongsTo(User);

User.hasMany(Pattern);
Pattern.belongsTo(User);
// Setup Associations

module.exports = {
  User,
  Yarn, 
  Pattern,
};
