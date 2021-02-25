import React, { useContext } from "react";
import { Router ,Redirect, Switch} from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Artists from "./Artists";
import UserProvider from "../providers/UserProvider";
import ProfilePage from "./ProfilePage";
import { UserContext } from "../providers/UserProvider";
import PasswordReset from "./PasswordReset";


function Application() {
  const user = useContext(UserContext);
  return (
        user ?
        <ProfilePage />
      :
        <Router>
          <SignUp path="/SignUp" />
          <SignUp path="/signUp" />
          <SignIn path="/" />
          <Redirect from='/SignIn' to="/Artists" />
          <Artists path = "Artists" />
          <PasswordReset path = "passwordReset" />
        </Router>
      
  );
}

export default Application;