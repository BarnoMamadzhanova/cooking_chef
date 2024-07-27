import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  fetchUserById,
  selectViewedProfile,
} from "../../redux/users/userSlice";
import classes from "./Chef.module.css";

const Chef: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useAppDispatch();
  const viewedProfile = useAppSelector(selectViewedProfile);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(Number(userId)));
    }
  }, [userId, dispatch]);

  if (!viewedProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.chef}>
      <h3>Author's Page</h3>
      <div className={classes.profile}>
        <img
          src={viewedProfile.profileImageUrl}
          alt={viewedProfile.name}
          className={classes.profile_img}
        />
        <h4>{viewedProfile.name}</h4>
        <p>{viewedProfile.bio}</p>
        <p>Recipes: {viewedProfile.recipeCount}</p>
        <p>Followers: {viewedProfile.followerCount}</p>
        <p>Following: {viewedProfile.followingCount}</p>
      </div>
    </div>
  );
};

export default Chef;
