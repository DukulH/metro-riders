import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import "./Header.css";

const Header = () => {
  const [loggedInUser] = useContext(userContext);
  const [show, setShow]=useState(false);
  const {name , displayName} = loggedInUser;
  return (
    <header className="style">
      <div className="container text-left">
        <nav className="navbar navbar-expand-lg navbar-light pt-4">
          <div className="container-fluid">
            <Link
              style={{ fontFamily: " 'Dosis', 'sans-serif'", fontSize: "40px" }}
              className="navbar-brand"
              to="/home"
              alt=""
            >
              Metro Riders
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={()=>setShow(!show)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
              <div style={show?{display:"block"}:{display:'none'}} className={"collapse navbar-collapse justify-content-end"}>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link text-dark mx-4 fw-bold" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-dark mx-4 fw-bold "
                    to="/destination/1"
                  >
                    Destination
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark mx-4 fw-bold" to="/">
                    Blog
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark mx-4 fw-bold" to="/">
                    Contact us
                  </Link>
                </li>
                {loggedInUser.email ? (
                  <li className="nav-item">
                  <Link className="nav-link text-danger mx-4 fw-bold" to=''>
                   {name || displayName}
                  </Link>
                </li>
                ) : (
                  <li className="nav-item">
                    <Link to="/login">
                      <button className="loginBtnStyle">Login</button>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
