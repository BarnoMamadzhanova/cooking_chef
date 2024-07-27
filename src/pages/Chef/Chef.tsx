import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  fetchUserById,
  selectViewedProfile,
  followUserAsync,
} from "../../redux/users/userSlice";
import { fetchRecipes, selectRecipes } from "../../redux/recipes/recipeSlice";
import CardGrid from "../../components/CardGrid/CardGrid";
import classes from "./Chef.module.css";

const Chef: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useAppDispatch();
  const viewedProfile = useAppSelector(selectViewedProfile);
  const userRecipes = useAppSelector(selectRecipes);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(Number(userId)));
      dispatch(fetchRecipes({ userId: Number(userId) }));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (viewedProfile) {
      setIsFollowed(viewedProfile.isFollowed);
    }
  }, [viewedProfile]);

  const handleFollowToggle = () => {
    if (viewedProfile) {
      dispatch(followUserAsync(viewedProfile.id)).then(() => {
        setIsFollowed((prev) => !prev);
      });
    }
  };

  if (!viewedProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.chef}>
      <div className={classes.author_info}>
        <div className={classes.author__wrapper}>
          <figure>
            <img
              src={viewedProfile.profileImageUrl}
              alt={viewedProfile.name}
              className={classes.author__avatar}
            />
            <figcaption>
              <h2 className={classes.author__name}>{viewedProfile.name}</h2>
            </figcaption>
          </figure>

          <div className={classes.stats}>
            <div className={`${classes.stat} ${classes.stats__recipe}`}>
              <span className={classes.stat__number}>
                {viewedProfile.recipeCount}
              </span>
              <span className={classes.stat__label}>Recipe</span>
            </div>
            <div className={`${classes.stat} ${classes.stats__followers}`}>
              <span className={classes.stat__number}>
                {viewedProfile.followerCount}
              </span>
              <span className={classes.stat__label}>Followers</span>
            </div>
            <div className={`${classes.stat} ${classes.stats__following}`}>
              <span className={classes.stat__number}>
                {viewedProfile.followingCount}
              </span>
              <span className={classes.stat__label}>Following</span>
            </div>
          </div>
          <div className={classes.bio}>
            <p>{viewedProfile.bio}</p>
          </div>
        </div>
        <div className={classes.button_wrapper}>
          <button
            className={isFollowed ? classes.following_btn : classes.follow_btn}
            onClick={handleFollowToggle}
          >
            {isFollowed ? "Following" : "Follow"}
          </button>
        </div>
      </div>

      <div className={classes.recipes_wrapper}>
        <h3>{viewedProfile.name}'s Recipes</h3>
        <CardGrid recipes={userRecipes} />{" "}
      </div>
    </div>
  );
};

export default Chef;
