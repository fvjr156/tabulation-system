import React, { useContext, useState } from "react";
import "./Toolbar.css";
import AuthContext from "../../api/context_api/AuthProvider";
import { useNavigate } from "react-router-dom";

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
        <li><a href="/login">Home</a></li>
        <li><a href="/">Test</a></li>
        <li><a href="/helloworld">Test</a></li>
        <li>
          <a href="#" onClick={toggleDropdown}>
            {firstname ? `${firstname} ${lastname} (${rolename})` : "User"}
          </a>
          {dropdownVisible && (
            <ul className="dropdown-menu">
              <li><a href="#">Account</a></li>
              <li><a href="#" onClick={handleLogout}>Log Out</a></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Toolbar;
