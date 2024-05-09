const { DataTypes } = require("sequelize");
const { dbConnection } = require("./db");
const { User } = require("./user");

const Job = dbConnection.define("Job", {
  job_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  posted_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Job, { foreignKey: "taken_job_id" });
Job.belongsTo(User, { foreignKey: "taken_job_id" });

User.hasMany(Job, { foreignKey: "owner_user_id" });
Job.belongsTo(User, { foreignKey: "owner_user_id" });

module.exports = { Job };
