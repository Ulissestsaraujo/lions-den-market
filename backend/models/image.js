const { DataTypes } = require("sequelize");
const { dbConnection } = require("./db");
const { Job } = require("./job");
const { User } = require("./user");
const Image = dbConnection.define("Image", {
  image_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Job.hasMany(Image, { foreignKey: "job_id" });
Image.belongsTo(Job, { foreignKey: "job_id" });
User.hasOne(Image, { foreignKey: "user_id" });
Image.belongsTo(User, { foreignKey: "user_id" });

module.exports = { Image };
