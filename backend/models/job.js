const { DataTypes } = require("sequelize");
const { dbConnection } = require("./db");
const { User } = require("./user");

const Job = dbConnection.define("Job", {
  job_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  owner_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
});

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

User.belongsToMany(Job, { through: "UserTookJob", as: "TookJobs" });
Job.belongsTo(User, { through: "UserTookJob", as: "TakenByUser" });

module.exports = { Job, Image };
