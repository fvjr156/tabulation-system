const dotenvconfig = require("../../configs/server/dotenvconfig");
const {
  tblUsers,
  tblRoles,
  tblEvent,
  tblJudgesEventAccess,
} = require("../../model/db/db_tabulation_system");
const jwt = require("jsonwebtoken");

const POST_login = async function (req, res) {
  const { username, password } = req.body;
  try {
    const user = await tblUsers.findOne({
      where: { Username: username, UserPassword: password },
    });

    if (user) {
      const role = await tblRoles.findOne({
        where: { RoleID: user.RoleID },
      });
      const token = jwt.sign(
        {
          userID: user.UserID,
          userFName: user.UserFirstName,
          userSurname: user.UserSurname,
          roleID: user.RoleID,
          roleName: role.RoleName,
          username: user.Username,
          userEmail: user.UserEmail,
          isVoided: user.isVoided,
        },
        dotenvconfig.jwtSecret,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ message: "Login successful!", token });
    } else {
      return res.status(401).json({ message: "Invalid username or password!" });
    }
  } catch (error) {
    console.error("An error occurred!", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const POST_events = async function (req, res) {
  try {
    const token = req.headers["authorization"];
    console.log(token)
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: You're not authorized to access this resource",
      });
    }
    jwt.verify(token, dotenvconfig.jwtSecret, (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
    });

    const {role_id, user_id} = req.body;
    console.log(role_id);
    if (!role_id) {
      return res
        .status(400)
        .json({ message: "Role ID is missing in request body" });
    }

    if (role_id === 3) {
      const judgeEventAccess = await tblJudgesEventAccess.findAll({
        where: { UserID: user_id },
        attributes: ["EventID"],
      });
      const eventIds = judgeEventAccess.map((access) => access.EventID);
      const events = await tblEvent.findAll({
        where: { EventID: eventIds },
      });
      return res.status(200).json(events);
    }
    if (role_id === 2) {
      const allEvents = await tblEvent.findAll();
      const events = JSON.stringify(allEvents);
      console.log(events);
      return res.status(200).json(events);
    }
  } catch (error) {
    console.error("Error retrieving events:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { POST_login, POST_events };
