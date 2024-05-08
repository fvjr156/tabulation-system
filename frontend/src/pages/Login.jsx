import { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Main.css";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hashPassword } from "../../api/hash";
import AuthContext from "../../api/context_api/AuthProvider";

function Login() {
  const { auth, login, loginerrmsglogout } = useContext(AuthContext);

  useEffect(function () {
    document.title = "TSPro Login Page";
  }, []);

  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [showpassword, set_showpassword] = useState(false);

  const [errormsg, set_errormsg] = useState("");

  const userRef = useRef();
  const errRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const [token, set_token] = useState(localStorage.getItem("token") || null);

  useEffect(
    function () {
      set_errormsg("");
    },
    [username, password]
  );

  useEffect(function () {
    const savedToken = window.localStorage.getItem("token");
    if (savedToken) {
      set_token({ savedToken });
    }
  }, []);

  useEffect(function () {
    set_errormsg(location.state?.errormsg);
  }, []);

  useEffect(function () {
    document.title = "Login to TSPro";
  }, []);

  const handleSubmit = async function (event) {
    event.preventDefault();
    const hashedpassword = await hashPassword(password);
    const hash_str = hashedpassword.toString();
    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({
          username: username,
          password: hash_str,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const token = response.data.token;
      login(token);

      set_username("");
      set_password("");
      navigate("/home");
    } catch (err) {
      if (username === "" || password === "") {
        set_errormsg("Missing username or password");
        return;
      }
      if (!err?.response) {
        set_errormsg("No server response");
      } else if (err.response?.status === 400) {
        set_errormsg("Missing username or password");
      } else if (err.response?.status === 401) {
        set_errormsg("Unauthorized: Invalid username or password");
      } else {
        set_errormsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  axios.interceptors.request.use(
    function (config) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return (
    <>
      {!auth.token ? (
        <div className="login-body">
          <ToastContainer />
          <div className="login-main">
            <div className="login-header">
              <h2>Log-in to TSPro Tabulation System</h2>
              <div
                style={{ display: errormsg ? "block" : "none" }}
                className="login-errormessage"
              >
                <p ref={errRef} aria-live="assertive">
                  {errormsg}
                </p>
              </div>
            </div>
            <div className="login-form-box">
              <label htmlFor="username">Username: </label>
              <input
                className="login-input"
                required
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                value={username}
                onChange={(e) => set_username(e.target.value)}
              />
              <label htmlFor="password">Password: </label>
              <input
                className="login-input"
                required
                type={showpassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => set_password(e.target.value)}
              />
              <label htmlFor="checkbox">Show Password: </label>
              <input
                className="login-input-checkbox"
                type="checkbox"
                id="checkbox"
                value={showpassword}
                onChange={(e) => set_showpassword(!showpassword)}
              />
              <div className="login-action-btn-box">
                <button onClick={handleSubmit}>Log-in</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="login-main">
          <h2>You are now logged in.</h2>
          <p>Click to log out of TSPro or go to Home page.</p>
          <div>
            <button
              onClick={() => {
                const logoutmsg = loginerrmsglogout();
                set_errormsg(logoutmsg);
              }}
            >
              Log out
            </button>
            <button
              onClick={() => {
                navigate("/home");
              }}
              style={{ marginLeft: "10px" }}
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
