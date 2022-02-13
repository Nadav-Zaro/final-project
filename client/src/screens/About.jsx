import React from "react";
import style from "../components/about.module.css";
import { Redirect } from "react-router-dom/";

export default function About({ auth, isRedirectEdit, isRedirectView }) {
  if (!auth) {
    return <Redirect to="/" />;
  }
  if (isRedirectEdit) {
    return <Redirect to="/EditProfile" />;
  }
  if (isRedirectView) {
    return <Redirect to="/ViewProfile" />;
  }

  return (
    <div className={style.about}>
      <div className={style.intro}>
        <img src="https://www.dlf.pt/dfpng/maxpng/226-2266065_lebron-james-heat-png.png" />
        <div className={style.aboutText}>
          <h1>About Baller's Court</h1>
          <p>
            Hey Everybody and welcome to baller's court.
            <br />
            Home of the Original Hoopers. At Baller's Court we provide
            <br />
            You the newest NBA content including the latest NBA games.
            <br />
            At Baller's Court You can also conenct with old or
            <br />
            New friend and got the platfom the uupload posts and chat
            <br />
            With close friends.
          </p>
        </div>
      </div>
    </div>
  );
}
