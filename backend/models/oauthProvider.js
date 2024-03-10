// models/oauthProvider.js
const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const User = require("./user");

const OAuthProvider = sequelize.define("OAuthProvider", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  providerId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true, // Refresh token may not always be present
  },
});

// Define associations
OAuthProvider.belongsTo(User);

module.exports = OAuthProvider;
