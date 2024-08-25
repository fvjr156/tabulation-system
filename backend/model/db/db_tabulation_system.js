const { DataTypes } = require("sequelize");
const MyDatabase = require("../../configs/db/database_conf");

const tblroles = MyDatabase.define("tblroles", {
  roleid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rolename: {
    type: DataTypes.STRING(64),
    defaultValue: "none",
  },
});

const tblusers = MyDatabase.define("tblusers", {
  userid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roleid: {
    type: DataTypes.INTEGER,
    references: {
      model: tblroles,
      key: "roleid",
    },
  },
  userpassword: {
    type: DataTypes.STRING(512),
  },
  userfirstname: {
    type: DataTypes.STRING(64),
    defaultValue: "anon",
  },
  usersurname: {
    type: DataTypes.STRING(64),
    defaultValue: "dela cruz",
  },
  username: {
    type: DataTypes.STRING(64),
  },
  useremail: {
    type: DataTypes.STRING(64),
    defaultValue: "none",
  },
  isvoided: {
    type: DataTypes.BOOLEAN,
  },
});

const tblevent = MyDatabase.define("tblevent", {
  eventid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  eventname: {
    type: DataTypes.STRING(64),
  },
  eventdescription: {
    type: DataTypes.STRING(512),
  },
  eventdate: {
    type: DataTypes.DATE,
  },
  eventvenue: {
    type: DataTypes.STRING(128),
  },
  eventstatus: {
    type: DataTypes.STRING,  // Changed from ENUM to STRING
    defaultValue: "scheduled",
  },
});

const tblcontestants = MyDatabase.define("tblcontestants", {
  contestantid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  contestantname: {
    type: DataTypes.STRING(64),
  },
  eventid: {
    type: DataTypes.INTEGER,
    references: {
      model: tblevent,
      key: "eventid",
    },
  },
});

const tblcriteria = MyDatabase.define("tblcriteria", {
  criterionid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  eventid: {
    type: DataTypes.INTEGER,
    references: {
      model: tblevent,
      key: "eventid",
    },
  },
  criterion: {
    type: DataTypes.STRING(512),
  },
  criterionweight: {
    type: DataTypes.FLOAT,
  },
});

const tbljudgeseventaccess = MyDatabase.define("tbljudgeseventaccess", {
  userid: {
    type: DataTypes.INTEGER,
    references: {
      model: tblusers,
      key: "userid",
    },
  },
  eventid: {
    type: DataTypes.INTEGER,
    references: {
      model: tblevent,
      key: "eventid",
    },
  },
});

tblusers.belongsTo(tblroles, { foreignKey: "roleid" });
tblcontestants.belongsTo(tblevent, { foreignKey: "eventid" });
tblcriteria.belongsTo(tblevent, { foreignKey: "eventid" });
tbljudgeseventaccess.belongsTo(tblusers, { foreignKey: "userid" });
tbljudgeseventaccess.belongsTo(tblevent, { foreignKey: "eventid" });

module.exports = {
  tblusers,
  tblroles,
  tblevent,
  tblcontestants,
  tblcriteria,
  tbljudgeseventaccess,
};
