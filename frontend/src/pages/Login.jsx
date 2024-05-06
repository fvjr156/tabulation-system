import { useState, useEffect, useRef, useContext } from "react";
import "./Login.css";
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

  const [token, set_token] = useState(localStorage.getItem("token") || null);

  useEffect(
    function () {
      set_errormsg("");
    },
    [username, password]
  );

  useEffect(function () {
    const savedToken = window.localStorage.getItem('token');
    if(savedToken){
      set_token({savedToken});
    }
  },[]);

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
        <body className="login-body">
          <ToastContainer />
            <div className="login-main">
              <div className="login-header">
                <h2>Log-in to TSPro Tabulation System</h2>
                <div
                  style={{
                    display: errormsg ? "block" : "none",
                    color: "red",
                    backgroundColor: "#ffdcdc",
                    paddingLeft: "10px",
                    border: "1px solid red",
                  }}
                >
                  <p ref={errRef} aria-live="assertive">
                    {errormsg}
                  </p>
                </div>
              </div>
              <div className="login-form-box">
                <label htmlFor="username">Username: </label>
                <input
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
                  required
                  type={showpassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => set_password(e.target.value)}
                />
                <label htmlFor="checkbox">Show Password: </label>
                <input
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
        </body>
      ) : (
        <div className="login-main">
          <h2>You are now logged in.</h2>
          <p>
            In production, you'll be redirected to the Tabulation System's
            homepage.
          </p>
            <button onClick={()=>{
              const logoutmsg = loginerrmsglogout();
              set_errormsg(logoutmsg);
            }}>Log out</button>
        </div>
      )}
    </>
  );
}

export default Login;
