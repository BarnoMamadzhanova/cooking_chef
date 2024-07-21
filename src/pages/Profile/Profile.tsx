import React from "react";
import classes from "./Profile.module.css";
import UserProfile from "../../components/ProfileInfo/ProfileInfo";
import CardGrid from "../../components/CardGrid/CardGrid";

function Profile() {
  return (
    <div className={classes.profile}>
      <UserProfile />
      {/* <CardGrid /> */}
    </div>
  );
}

export default Profile;
