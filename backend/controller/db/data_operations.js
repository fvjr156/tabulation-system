const { tblUsers, tblRoles } = require("../../model/db/db_tabulation_system");
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
        process.env.JWT_SECRET_KEY,
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

module.exports = { POST_login };
