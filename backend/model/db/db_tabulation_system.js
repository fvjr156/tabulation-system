const { DataTypes } = require("sequelize");
const MySQLDatabase = require("../../configs/db/database_conf");

const tblRoles = MySQLDatabase.define("tblRoles", {
  RoleID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  RoleName: {
    type: DataTypes.STRING(64),
    defaultValue: "NONE",
  },
});

const tblUsers = MySQLDatabase.define("tblUsers", {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  RoleID: {
    type: DataTypes.INTEGER,
    references: {
      model: "tblRoles",
      key: "RoleID",
    },
  },
  UserPassword: {
    type: DataTypes.STRING(512),
  },
  UserFirstName: {
    type: DataTypes.STRING(64),
    defaultValue: "Anon",
  },
  UserSurname: {
    type: DataTypes.STRING(64),
    defaultValue: "dela Cruz",
  },
  Username: {
    type: DataTypes.STRING(64),
  },
  UserEmail: {
    type: DataTypes.STRING(64),
    defaultValue: "NONE",
  },
  isVoided: {
    type: DataTypes.BOOLEAN,
  },
});

const tblEvent = MySQLDatabase.define("tblEvent", {
  EventID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  EventName: {
    type: DataTypes.STRING(64),
  },
  EventDescription: {
    type: DataTypes.STRING(512),
  },
  EventDate: {
    type: DataTypes.DATE,
  },
  EventVenue: {
    type: DataTypes.STRING(128),
  },
  EventStatus: {
    type: DataTypes.ENUM("Scheduled", "Ongoing", "Completed"),
    defaultValue: "Scheduled",
  },
});

const tblContestants = MySQLDatabase.define("tblContestants", {
  ContestantID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ContestantName: {
    type: DataTypes.STRING(64),
  },
  EventID: {
    type: DataTypes.INTEGER,
    references: {
      model: "tblEvent",
      key: "EventID",
    },
  },
});

const tblCriteria = MySQLDatabase.define("tblCriteria", {
  CriterionID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  EventID: {
    type: DataTypes.INTEGER,
    references: {
      model: "tblEvent",
      key: "EventID",
    },
  },
  Criterion: {
    type: DataTypes.STRING(512),
  },
  CriterionWeight: {
    type: DataTypes.FLOAT,
  },
});

const tblJudgesEventAccess = MySQLDatabase.define("tblJudgesEventAccess", {
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: "tblUsers",
      key: "UserID",
    },
  },
  EventID: {
    type: DataTypes.INTEGER,
    references: {
      model: "tblEvent",
      key: "EventID",
    },
  },
});

tblUsers.belongsTo(tblRoles, { foreignKey: "RoleID" });
tblContestants.belongsTo(tblEvent, { foreignKey: "EventID" });
tblCriteria.belongsTo(tblEvent, { foreignKey: "EventID" });
tblJudgesEventAccess.belongsTo(tblUsers, { foreignKey: "UserID" });
tblJudgesEventAccess.belongsTo(tblEvent, { foreignKey: "EventID" });

module.exports = {
  tblUsers,
  tblRoles,
  tblEvent,
  tblContestants,
  tblCriteria,
  tblJudgesEventAccess,
};
