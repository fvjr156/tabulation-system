const DataTypes = require("sequelize");
const MySQLDatabase = require("../../configs/db/database_conf");

const SurveyForm = MySQLDatabase.define(
  "survey_forms",
  {
    form_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    form_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    form_author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    create_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    form_filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tb_surveyforms",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = { SurveyForm };
