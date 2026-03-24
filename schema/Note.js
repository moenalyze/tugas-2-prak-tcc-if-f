const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Note = sequelize.define("Note", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tanggal_dibuat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false // Biar gak error nyari kolom createdAt bawaan Sequelize
});

module.exports = Note;