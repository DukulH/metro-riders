import React, { useContext, useState} from "react";
import "./Login.css";
import Header from "../Header/Header";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { initializeLoginFramework, handleGoogleSignIn, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';
import { userContext } from "../../App";


const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser ] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const fbSignIn = () => {
      handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
      })

  }

  const handleResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
  }

  const handleBlur = (event) => {
    let isFieldValid = true;
    if(event.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name === 'password' || event.target.name ==='confirmPassword'){
      const isPasswordValid = event.target.value.length > 6;
      isFieldValid = isPasswordValid;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (event) => {
    if(newUser && user.email && user.password && user.password === user.confirmPassword){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        if(res.error){
          handleResponse(res, false);
        }
        else{
          handleResponse(res, true);
        }
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        if(res.error){
          handleResponse(res, false);
        }
        else{
          handleResponse(res, true);
        }
      })
    }
    event.preventDefault();
  }
  return (
    <>
      <Header></Header>
      <div className="container">
        <form className="formStyle" onSubmit={handleSubmit}>
          <h3 className="ml-5 mt-4">{newUser ? "Create Account" : "Login"}</h3>
          
          {
            loggedInUser.error ? <h5 className='text-center' style={{color: 'red'}}>{loggedInUser.error}</h5> : ""
          }
          {
            loggedInUser.error && user.password !== user.confirmPassword && <h5 className='text-center mt-2' style={{color: 'red'}}>Password & Confirm Password not matched</h5>
          }
          {newUser && (
            <input
              type="text"
              className="ml-5 w-75 mt-5"
              placeholder="Name"
              name="name"
              onBlur={handleBlur}
            />
          )}
          <br />
          <input
            type="text"
            className="ml-5 w-75 mt-5"
            placeholder="Email"
            name="email"
            onBlur={handleBlur}
            required
          />
          <br />
          <input
            type="password"
            className="ml-5 w-75 mt-5"
            placeholder="Password"
            name="password"
            onBlur={handleBlur}
            required
          />
          {newUser && (
            <input
              type="password"
              className="ml-5 w-75 mt-5"
              placeholder="Confirm Password"
              name="confirmPassword"
              onBlur={handleBlur}
            />
          )}
          <br />
          {newUser && (
            <input
              className="w-75 ml-5 border-0 p-2 mt-5 mb-3"
              style={{ backgroundColor: "#FF6E40", color: "white" }}
              value="Create an account"
              type="submit"
            />
          )}
          {!newUser && (
            <div className="d-inline-flex mt-4">
              <div className="ml-5 pr-5">
                <input
                  type="checkbox"
                  value="Remember Me"
                  className="mr-1"
                  name="remember"
                  id="remember"
                />
                <label htmlFor="remember"> Remember Me</label>
              </div>
              <div className="forgotPass mb-5">
                <Link to="/" style={{ color: "#FF6E40" }}>
                  Forgot Password
                </Link>
              </div>
            </div>
          )}
          <br />
          {!newUser && (
            <input
              className="w-75 ml-5 border-0 p-2 mb-3"
              style={{ backgroundColor: "#FF6E40", color: "white" }}
              value="Login"
              type="submit"
            />
          )}

          {!newUser && (
            <p className="text-center">
              Don't have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#FF6E40" }}
                onClick={() => setNewUser(!newUser)}
              >
                Create an account
              </Link>
            </p>
          )}
          {newUser && (
            <p className="text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#FF6E40" }}
                onClick={() => setNewUser(!newUser)}
              >
                Login
              </Link>
            </p>
          )}
        </form>

        <p className="text-center design mb-4 mt-5">
          <span>or</span>
        </p>
        <div className="mt-4">
          <button
            className="p-2  bg-white border otherSignInMethod"
            onClick={fbSignIn}
          >
            <FontAwesomeIcon className="icon" icon={faFacebook} />
            <span>Continue with Facebook</span>
          </button>
          <br />
          <button
            className="p-2  bg-white border otherSignInMethod"
            onClick={googleSignIn}
          >
            <FontAwesomeIcon className="icon" icon={faGoogle} />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
