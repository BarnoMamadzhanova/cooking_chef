import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchProfile, updateUserProfile } from "../../redux/users/userSlice";
import classes from "./ProfileInfo.module.css";

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.users.profile);
  const status = useAppSelector((state) => state.users.status);
  const error = useAppSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleUpdateProfile = () => {
    dispatch(
      updateUserProfile({ name: "New Name", bio: "New Bio", profileImageId: 1 })
    );
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      {profile && (
        <div className={classes.profile_container}>
          <img src={profile.profileImageUrl} alt="Profile" />
          <div className={classes.info_box}>
            <div className={classes.info}>
              <div className={classes.infos}>
                <p className={classes.infos_count}>{profile.recipeCount}</p>
                <p className={classes.infos_text}>Recipe</p>
              </div>
              <div className={classes.infos}>
                <p className={classes.infos_count}>{profile.followerCount}</p>
                <p className={classes.infos_text}>Followers</p>
              </div>
              <div className={classes.infos}>
                <p className={classes.infos_count}>{profile.followingCount}</p>
                <p className={classes.infos_text}>Following</p>
              </div>
            </div>
            <div className={classes.bio_box}>
              <h3>{profile.name}</h3>
              <p>{profile.bio}</p>
            </div>
            <button
              onClick={handleUpdateProfile}
              className={classes.profile_btn}
            >
              Manage Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
