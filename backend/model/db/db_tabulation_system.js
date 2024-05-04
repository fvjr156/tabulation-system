const { DataTypes } = require('sequelize');
const MySQLDatabase = require("../../configs/db/database_conf");

const tblUsers = MySQLDatabase.define('tblUsers', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  RoleID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  UserPassword: {
    type: DataTypes.STRING(512),
    allowNull: false
  },
  UserFirstName: {
    type: DataTypes.STRING(64),
    defaultValue: 'Anon'
  },
  UserSurname: {
    type: DataTypes.STRING(64),
    defaultValue: 'dela Cruz'
  },
  Username: {
    type: DataTypes.STRING(64)
  },
  UserEmail: {
    type: DataTypes.STRING(64),
    defaultValue: 'NONE'
  },
  isVoided: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  freezeTableName: true,
  timestamps: false 
});

const tblRoles = MySQLDatabase.define('tblRoles', {
  RoleID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  RoleName: {
    type: DataTypes.STRING(64),
    defaultValue: 'NONE'
  }
}, {
  freezeTableName: true,
  timestamps: false 
});

const tblEvent = MySQLDatabase.define('tblEvent', {
  EventID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  EventName: {
    type: DataTypes.STRING(64)
  },
  EventDescription: {
    type: DataTypes.STRING(512)
  }
}, {
  freezeTableName: true,
  timestamps: false 
});

const tblContestants = MySQLDatabase.define('tblContestants', {
  ContestantID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ContestantName: {
    type: DataTypes.STRING(64)
  }
}, {
  freezeTableName: true,
  timestamps: false 
});

const tblCriteria = MySQLDatabase.define('tblCriteria', {
  CriterionID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Criterion: {
    type: DataTypes.STRING(512)
  },
  CriterionWeight: {
    type: DataTypes.FLOAT
  }
}, {
  freezeTableName: true,
  timestamps: false 
});

const tblJudgesEventAccess = MySQLDatabase.define('tblJudgesEventAccess', {
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  EventID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
});

tblUsers.belongsTo(tblRoles, { foreignKey: 'RoleID' });
tblContestants.belongsTo(tblEvent, { foreignKey: 'EventID' });
tblCriteria.belongsTo(tblEvent, { foreignKey: 'EventID' });
tblJudgesEventAccess.belongsTo(tblUsers, { foreignKey: 'UserID' });
tblJudgesEventAccess.belongsTo(tblEvent, { foreignKey: 'EventID' });

module.exports = {
  tblUsers,
  tblRoles,
  tblEvent,
  tblContestants,
  tblCriteria,
  tblJudgesEventAccess
};
