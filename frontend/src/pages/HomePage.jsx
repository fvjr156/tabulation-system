import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";
import WarningMessage from "./WarningMessage";
import "./Main.css";
import AuthContext from "../../api/context_api/AuthProvider";

const Toolbar = ({
  firstname,
  lastname,
  rolename,
  onToggleSideBarOpenState,
}) => {
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
      <div>
        <button
          onClick={() => {
            onToggleSideBarOpenState();
          }}
        >
          Open Sidebar
        </button>
      </div>
      <div>
        <ul>
          <li>
            <a href="/login">Home</a>
          </li>
          <li>
            <a href="/pomodoro">Pomodoro Timer</a>
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
    </div>
  );
};

const Sidebar = function ({ roleID, isOpen }) {
  return (
    <>
      <div
        id="sidebar"
        className="sidebar"
        style={{ width: isOpen ? "4%" : "26%" }}
      >
        <div className="sidebar-logobox">
          <img
            src="android-chrome-192x192.png"
            alt="versatily"
            className="sidebar-logo"
          />
          <span className="sidebar-iconname">Versatily-TSPro</span>
        </div>
        {roleID === 1 && (
          <>
            <p id="sidebartext" className="sidebar-smalltxt">
              Admin
            </p>
            <div className="sidebar-optionbox">
              <img src="vite.svg" alt="placeholder" className="sidebar-icon" />
              <span>User Management</span>
            </div>
          </>
        )}
        {roleID === 2 && (
          <>
            <p className="sidebar-smalltxt">Manager</p>
            <div className="sidebar-optionbox">
              <img src="vite.svg" alt="placeholder" className="sidebar-icon" />
              <span>Event Management</span>
            </div>
          </>
        )}
        {roleID === 3 && (
          <>
            <p className="sidebar-smalltxt">Judge</p>
            <div className="sidebar-optionbox">
              <img src="vite.svg" alt="placeholder" className="sidebar-icon" />
              <span>Event Selection</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

function HomePage() {
  const [userinfo, set_userinfo] = useState(null);
  const [sidebarOpenState, toggleSidebarOpenState] = useState(false);
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

  const handle_onToggleSideBarOpenState = function () {
    toggleSidebarOpenState(!sidebarOpenState);
  };

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
  } = userinfo || {};

  return (
    <div className="home-body">
      <WarningMessage />
      <div className="home-body-container">
        <Sidebar roleID={roleID} isOpen={sidebarOpenState} />
        <div className="home-main">
          <Toolbar
            firstname={userFName}
            lastname={userSurname}
            rolename={roleName}
            onToggleSideBarOpenState={handle_onToggleSideBarOpenState}
          />
          <div className="home-main-content">
            {roleID === 1 && (
              <>
                <p>You are an admin.</p>
              </>
            )}
            {roleID === 2 && (
              <>
                <p>You are a manager.</p>
              </>
            )}
            {roleID === 3 && (
              <>
                <p>You are a judge.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
//todo: now build the homepage, render homepage based on role id
