import { useState, useEffect } from "react";
import * as jose from "jose";

const HomePageToolbar = function () {
  return <div className="home-toolbar"></div>;
};
const HomePageSidebar = function () {
  return <div className="home-sidebar"></div>;
};

function HomePage() {
  const [userinfo, set_userinfo] = useState(null);

  useEffect(function () {
    const token = localStorage.getItem("token");
    const decode = jose.decodeJwt(token);
    set_userinfo(JSON.stringify(decode));
  }, []);

  return <div className="home-main">{userinfo}</div>;
}

export default HomePage;
//todo: now build the homepage, render homepage based on role id