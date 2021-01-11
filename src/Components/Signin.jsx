import React, {useState} from "react";
import { Link } from "@reach/router";
import { signInWithGoogle } from "../firebase";
import { auth } from "../firebase";


const SignIn = () => { //Has three pieces of state:
    const [email, setEmail] = useState(''); //For storing user email
    const [password, setPassword] = useState(''); //For storing user password
    const [error, setError] = useState(null);//For displaying error message 

    const signInWithEmailAndPasswordHandler = 
            (event,email, password) => {
                event.preventDefault();
                auth.signInWithEmailAndPassword(email, password).then((user) => {
                  document.getElementById('userEmail').style.display = 'none';
                  document.getElementById('userPassword').style.display = 'none';
                  document.getElementById('signin-button').style.display = 'none';
                  document.getElementById('signup-button').style.display = 'none';
                  document.getElementById('google-button').style.display = 'none';
                  document.getElementById('links').style.display = 'none';

                  document.getElementById('message').innerHTML = "WELCOME\n" + "" + document.getElementById('userEmail').value;
                  // document.getElementById('userInfo').innerHTML = document.getElementById('userEmail').value;
                  // document.getElementById('email').value;
                  // document.getElementById('title').style.display = 'inline-block';
                  // document.getElementById('userInfo').style.display = 'inline-block';
                  // document.getElementById('userInfo').innerHTML = document.getElementById('userEmail').value;
                  document.getElementById('signout-button').style.display = 'inline-block';
                })
                .catch(error => {
                  setError("Error signing in with password and email!");
                    console.error("Error signing in with password and email", error);
                });
    };

    const signOutHandler =
      (event) => {
        event.preventDefault();
        auth.signOut().then(() => {
          document.getElementById('userEmail').style.display = 'inline-block';
          document.getElementById('userPassword').style.display = 'inline-block';
          document.getElementById('signin-button').style.display = 'inline-block';
          document.getElementById('signup-button').style.display = 'inline-block';
          document.getElementById('google-button').style.display = 'inline-block';
          document.getElementById('links').style.display = 'relative';

          document.getElementById('message').innerHTML = "Sign In";
          alert("Signed Out Successfully");
          document.getElementById('signout-button').style.display = 'none';
        });

      }

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
          setPassword(value);
        }
    };

  return (
    <div className="container">
      <h1 id="message">Sign In</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        <form className="">
          <input
            type="email"
            className="signin-field"
            name="userEmail"
            value = {email}
            placeholder="Email"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          <br></br>
          <input
            type="password"
            className="signin-field"
            name="userPassword"
            value = {password}
            placeholder="Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />      
        </form>

        <div className="signin-signup-buttons">
        <button className="button-email" id="signin-button"onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            Sign In
        </button>
        <button className="button-email" id="signup-button" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            SignUp
        </button>
        <button className = "button-signout" id="signout-button" onClick = {(event) => {signOutHandler(event)}}>Sign out</button>
        </div>

        <button
          onClick={() => {
            try {
              signInWithGoogle();
            } catch (error) {
              console.error("Error signing in with Google", error);
            }
          }}
          className="button-google" id="google-button">
          Sign in with Google
        </button>
        <p className="text-center my-3" id="links">
          Don't have an account?{" "}
          {/*Link component that Reach Router provides:similar to the anchor element in HTML, 
          and similar in function to the href attribute of the anchor element.*/}
          <Link to="signUp" className="text-blue-500 hover:text-blue-600" id="signup-link"> 
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to = "passwordReset" className="text-blue-500 hover:text-blue-600" id="forgotpassword-link">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;