const MySQLDatabase = require("../../configs/db/database_conf");

const GET_TestConnection = async function (req, res) {
  try {
    await MySQLDatabase.authenticate();
    res.status(200).json({ db_status_message: "MySQL Database is working!" });
  } catch (error) {
    res.status(500).json({
      db_status_message: "ERROR: Can't connect to MySQL Database! " + error,
    });
  }
};

const TestConnection = async function () {
  try {
    await MySQLDatabase.authenticate();
    console.log("MySQL Database is working!");
  } catch (error) {
    console.error("ERROR: Can't connect to MySQL Database! " + error);
  }
};

const SyncDatabase = async function () {
  MySQLDatabase.sync({ force: false })
    .then(() => {
      console.log("Database model synced.");
    })
    .catch((err) => {
      console.error("Unable to sync database: ", error);
    });
};

const GET_SyncDatabase = async function (req, res) {
  MySQLDatabase.sync({ force: false })
    .then(() => {
      res.status(200).json({
        db_status_message: "MySQL Database is working! Sync successful!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        db_status_message: "ERROR: Can't connect to MySQL Database! " + error,
      });
    });
};

module.exports = {
  GET_TestConnection,
  TestConnection,
  GET_SyncDatabase,
  SyncDatabase,
};
