import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";
import WarningMessage from "./WarningMessage";
import "./Main.css";
import AuthContext from "../../api/context_api/AuthProvider";

const Toolbar = ({ firstname, lastname, rolename }) => {
  const { loginerrmsglogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    loginerrmsglogout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="toolbar">
      <ul>
        <li>
          <a href="/login">Home</a>
        </li>
        <li>
          <a href="/">Test</a>
        </li>
        <li>
          <a href="/helloworld">Test</a>
        </li>
        <li>
          <a href="#" onClick={toggleDropdown}>
            {firstname ? `${firstname} ${lastname} (${rolename})` : "User"}
          </a>
          {dropdownVisible && (
            <ul className="dropdown-menu">
              <li>
                <a href="#">Account</a>
              </li>
              <li>
                <a href="#" onClick={handleLogout}>
                  Log Out
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

const Sidebar = function ({ roleID }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logobox">
        <img
          src="android-chrome-192x192.png"
          alt="versatily"
          className="sidebar-logo"
        />
        <span>Versatily-TSPro</span>
      </div>
      {roleID === 1 && (
        <>
          <p className="sidebar-smalltxt">Admin</p>
          <div className="sidebar-optionbox">
            <img src="vite.svg" alt="placeholder" className="sidebar-icon"/>
            <span>User Management</span>
          </div>
          <div className="sidebar-optionbox">
            <img src="vite.svg" alt="placeholder" className="sidebar-icon"/>
            <span>User Management</span>
          </div>
        </>
      )}
    </div>
  );
};

function HomePage() {
  const [userinfo, set_userinfo] = useState(null);
  const navigate = useNavigate();

  useEffect(function () {
    try {
      const token = localStorage.getItem("token");
      const decode = jose.decodeJwt(token);
      set_userinfo(decode);
    } catch (error) {
      navigate("/login", { state: { errormsg: "You must login first." } });
    }
  }, []);
  const {
    userFName,
    userSurname,
    roleName,
    userID,
    roleID,
    username,
    userEmail,
    isVoided,
    iat,
    exp,
  } = userinfo || {}; // Use default empty object to avoid errors when userinfo is null

  return (
    <div className="home-body">
      <WarningMessage />
      <Sidebar roleID={roleID} />
      <Toolbar
        firstname={userFName}
        lastname={userSurname}
        rolename={roleName}
      />
      <div className="home-main">
        {roleID === 1 && (
          <>
            <p>You are an admin.</p>
            <p>
              Your permissions as an admin are to create, modify, and remove
              users; assign their roles for the system.
            </p>
          </>
        )}
        {roleID === 2 && (
          <>
            <p>You are a manager.</p>
            <p>Your permissions as a manager:</p>
            <ul>
              <li>Create, modify, and remove Events</li>
              <li>
                Create, modify, and remove Contestants and Criteria for each
                event
              </li>
              <li>Manage judge's access of the events</li>
            </ul>
          </>
        )}
        {roleID === 3 && (
          <>
            <p>You are a judge.</p>
            <p>
              Your permissions as a judge are to attend events and answer the
              event tabulation scoresheets.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
//todo: now build the homepage, render homepage based on role id
