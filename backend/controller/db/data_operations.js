const dotenvconfig = require("../../configs/server/dotenvconfig");
const {
  tblusers,
  tblroles,
  tblevent,
  tbljudgeseventaccess,
} = require("../../model/db/db_tabulation_system");
const jwt = require("jsonwebtoken");

const POST_login = async function (req, res) {
  const { username, password } = req.body;
  try {
    const user = await tblusers.findOne({
      where: { username: username, userpassword: password },
    });

    if (user) {
      const role = await tblroles.findOne({
        where: { roleid: user.roleid },
      });
      const token = jwt.sign(
        {
          userid: user.userid,
          userFName: user.userfirstname,
          userSurname: user.usersurname,
          roleid: user.roleid,
          roleName: role.rolename,
          username: user.username,
          userEmail: user.useremail,
          isVoided: user.isvoided,
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
    console.log(token);
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

    const { role_id, user_id } = req.body;
    console.log(role_id);
    if (!role_id) {
      return res
        .status(400)
        .json({ message: "Role ID is missing in request body" });
    }

    if (role_id === 3) {
      const judgeEventAccess = await tbljudgeseventaccess.findAll({
        where: { userid: user_id },
        attributes: ["eventid"],
      });
      const eventIds = judgeEventAccess.map((access) => access.eventid);
      const judge_events = await tblevent.findAll({
        where: { eventid: eventIds },
      });
      const events = JSON.stringify(judge_events);
      return res.status(200).json(events);
    }
    if (role_id === 2) {
      const allEvents = await tblevent.findAll();
      const events = JSON.stringify(allEvents);
      return res.status(200).json(events);
    }
  } catch (error) {
    console.error("Error retrieving events:", error);
    return;
  }
};

module.exports = { POST_login, POST_events };
