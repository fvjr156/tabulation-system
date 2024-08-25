import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";
import WarningMessage from "./WarningMessage";
import "./Main.css";
import AuthContext from "../../api/context_api/AuthProvider";
import { EventManagement } from "./RoleComponents/EventManagement";
import { EventSelection } from "./RoleComponents/EventSelection";
import { UserManagement } from "./RoleComponents/UserManagement";

export const css_var = (varName) => {
  const styles = getComputedStyle(document.documentElement);
  const value = styles.getPropertyValue(`--${varName}`).trim();

  return value;
};

const Toolbar = ({
  firstname,
  lastname,
  rolename,
  onToggleSideBarOpenState,
  menuref,
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
    <div
      className="toolbar"
      style={{
        backgroundColor:
          rolename === "Admin"
            ? css_var("admin-light")
            : rolename === "Manager"
            ? css_var("manager-light")
            : css_var("judge-light"),
      }}
    >
      <div>
        <img
          src="assets/menu.png"
          onClick={() => {
            onToggleSideBarOpenState();
          }}
          style={{
            width: "30px",
            height: "30px",
            marginLeft: "10px",
          }}
          ref={menuref}
        />
      </div>
      <div>
        <ul>
          <li>
            <a href="/login">Home</a>
          </li>
          {/* <li>
            <a href="/pomodoro">Pomodoro Timer</a>
          </li>
          <li>
            <a href="/helloworld">Test</a>
          </li> */}
          <li>
            <a href="#" onClick={toggleDropdown}>
              {firstname ? `${firstname} ${lastname} (${rolename})` : "User"}
            </a>
            {dropdownVisible && (
              <ul
                className="dropdown-menu"
                style={{
                  backgroundColor:
                    rolename === "Admin"
                      ? css_var("admin-light")
                      : rolename === "Manager"
                      ? css_var("manager-light")
                      : css_var("judge-light"),
                  border: "1px solid black",
                }}
              >
                <li className="dropdown-menu-li">
                  <a href="#">Account</a>
                </li>
                <li className="dropdown-menu-li">
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

const Sidebar = ({ roleID, isOpen, fRef }) => {
  return (
    <>
      <div
        ref={fRef}
        id="sidebar"
        className="sidebar"
        style={{ width: isOpen ? "250px" : "60px" }}
      >
        <div className="sidebar-logobox">
          <img
            src="android-chrome-192x192.png"
            alt="versatily"
            className="sidebar-logo"
          />
          <span
            className="sidebar-iconname"
            style={{
              visibility: isOpen ? "visible" : "hidden",
            }}
          >
            Versatily-TSPro
          </span>
        </div>
        {roleID === 1 && (
          <>
            <p
              className="sidebar-smalltxt"
              style={{ visibility: isOpen ? "visible" : "hidden", color: "black" }}
            >
              Admin
            </p>
            <div className="sidebar-optionbox">
              <img
                src="assets/people.png"
                alt="placeholder"
                className="sidebar-icon"
              />
              <span style={{ visibility: isOpen ? "visible" : "hidden" }}>
                User Management
              </span>
            </div>
          </>
        )}
        {roleID === 2 && (
          <>
            <p
              className="sidebar-smalltxt"
              style={{ visibility: isOpen ? "visible" : "hidden", color: "black" }}
            >
              Manager
            </p>
            <div className="sidebar-optionbox">
              <img
                src="assets/document.png"
                alt="placeholder"
                className="sidebar-icon"
              />
              <span style={{ visibility: isOpen ? "visible" : "hidden" }}>
                Event Management
              </span>
            </div>
          </>
        )}
        {roleID === 3 && (
          <>
            <p
              className="sidebar-smalltxt"
              style={{ visibility: isOpen ? "visible" : "hidden", color: "black" }}
            >
              Judge
            </p>
            <div className="sidebar-optionbox">
              <img
                src="assets/document.png"
                alt="placeholder"
                className="sidebar-icon"
              />
              <span style={{ visibility: isOpen ? "visible" : "hidden" }}>
                Event Selection
              </span>
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
  const sidebarRef = useRef(null);
  const menuRef = useRef(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
      ) {
        toggleSidebarOpenState(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleSidebarClick = (event) => {
      if (sidebarRef.current.contains(event.target)) {
        toggleSidebarOpenState(true);
      }
    };
    document.addEventListener("click", handleSidebarClick);
    return () => {
      document.removeEventListener("click", handleSidebarClick);
    };
  }, []);

  useEffect(function () {
    try {
      const token = localStorage.getItem("token");
      const decode = jose.decodeJwt(token);
      set_userinfo(decode);
      setToken(token);
    } catch (error) {
      navigate("/login", { state: { errormsg: "You must login first." } });
    }
  }, []);

  const handle_onToggleSideBarOpenState = function () {
    toggleSidebarOpenState(!sidebarOpenState);
  };

  const {
    userid,
    userFName,
    userSurname,
    roleName,
    roleid,
    username,
    userEmail,
    isVoided,
    iat,
    exp,
  } = userinfo || {};
  console.log(userinfo);

  return (
    <div className="home-body">
      <WarningMessage />
      <Sidebar roleID={roleid} isOpen={sidebarOpenState} fRef={sidebarRef} />
      <div
        className="home-main"
        style={{
          marginLeft: sidebarOpenState ? "260px" : "71px",
          width: sidebarOpenState ? "1090px" : "1276px",
        }}
      >
        <Toolbar
          firstname={userFName}
          lastname={userSurname}
          rolename={roleName}
          onToggleSideBarOpenState={handle_onToggleSideBarOpenState}
          menuref={menuRef}
        />
        <div className="home-main-content" style={{ color: 'black' }}>
          {roleid === 1 && (
            <>
              <UserManagement />
            </>
          )}
          {roleid === 2 && (
            <>
              <EventManagement role={roleid} user={userid} token={token} />
            </>
          )}
          {roleid === 3 && (
            <>
              <EventSelection role={roleid} user={userid} token={token} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}


export default HomePage;
