import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Form.module.css";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useLocation } from "react-router-dom";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const Form = (props) => {
  const location = useLocation();
  const [userFocus, setUserFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUserName(+event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSignUp = (event) => {
    event.preventDefault();
    props.handleSignUp({ userName, password });
  };
  const handleLogIn = (event) => {
    event.preventDefault();
    props.handleLogIn({ userName, password });
  };
  return (
    <div className={classes.form}>
      <NavLink
        style={{
          textDecoration: "none",
          color: "inherit",
          marginRight: "1rem",
        }}
        to="/signup"
        className={(navData) => (navData.isActive ? classes.active : "")}
      >
        SignUp
      </NavLink>
      <NavLink
        style={{
          textDecoration: "none",
          color: "inherit",
          marginRight: "1rem",
        }}
        to="/login"
        className={(navData) => (navData.isActive ? classes.active : "")}
      >
        Login
      </NavLink>

      <main className={classes.inputFields}>
        <form
          onSubmit={
            location.pathname === "/login"
              ? handleLogIn
              : location.pathname === "/signup"
              ? handleSignUp
              : () => {}
          }
        >
          <div className={classes.username}>
            <input
              autoComplete="off"
              onChange={handleUsername}
              onFocus={() => {
                setPassFocus(false);
                setUserFocus(true);
              }}
              className={`${classes.input} ${userFocus ? classes.focus : ""}`}
              type="number"
              placeholder="username"
            />
            <PersonIcon
              className={`${classes.icon} ${
                userFocus ? classes.iconFocus : ""
              }`}
            />
          </div>
          <div className={classes.password}>
            <input
              autoComplete="off"
              onChange={handlePassword}
              onFocus={() => {
                setPassFocus(true);
                setUserFocus(false);
              }}
              className={`${classes.input} ${passFocus ? classes.focus : ""}`}
              type="password"
              placeholder="password"
            />
            <VpnKeyIcon
              className={`${classes.icon} ${
                passFocus ? classes.iconFocus : ""
              }`}
            />
            <div className={classes.forgetPass}>
              <span>forgot password</span>
            </div>
          </div>
          <main className={classes.footer}>
            <div className={classes.btn}>
              <button type="submit">
                {location.pathname === "/login" ? "LogIn" : "signup"}{" "}
              </button>
              <ArrowRightAltIcon />
            </div>
          </main>
        </form>
      </main>
    </div>
  );
};

export default Form;
