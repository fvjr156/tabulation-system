import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";
import Toolbar from "./Toolbar";
import WarningMessage from "./WarningMessage";
import "./Main.css";

const HomePageToolbar = function () {
  return <div className="home-toolbar"></div>;
};
const HomePageSidebar = function () {
  return <div className="home-sidebar"></div>;
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
      <Toolbar
        firstname={userFName}
        lastname={userSurname}
        rolename={roleName}
      />
      <div className="home-main">
      {roleID === 1 && (
          <>
            <p>You are an admin.</p>
            <p>Your permissions as an admin are to create, modify, and remove users; assign their roles for the system.</p>
          </>
        )}
        {roleID === 2 && (
          <>
            <p>You are a manager.</p>
            <p>Your permissions as a manager:</p>
            <ul>
              <li>Create, modify, and remove Events</li>
              <li>Create, modify, and remove Contestants and Criteria for each event</li>
              <li>Manage judge's access of the events</li>
            </ul>
          </>
        )}
        {roleID === 3 && (
          <>
            <p>You are a judge.</p>
            <p>Your permissions as a judge are to attend events and answer the event tabulation scoresheets.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
//todo: now build the homepage, render homepage based on role id
