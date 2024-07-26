import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchUserById, selectUserProfile } from "../../redux/users/userSlice";
import classes from "./Chef.module.css";

const Chef: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(selectUserProfile);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(Number(userId)));
    }
  }, [userId, dispatch]);

  if (!userProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.chef}>
      <h3>Author's Page</h3>
      <div className={classes.profile}>
        <img
          src={userProfile.profileImageUrl}
          alt={userProfile.name}
          className={classes.profile_img}
        />
        <h4>{userProfile.name}</h4>
        <p>{userProfile.bio}</p>
        <p>Recipes: {userProfile.recipeCount}</p>
        <p>Followers: {userProfile.followerCount}</p>
        <p>Following: {userProfile.followingCount}</p>
      </div>
    </div>
  );
};

export default Chef;
