import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  fetchSavedRecipes,
  fetchUserRecipes,
  updateUserProfile,
} from "../../redux/users/userSlice";
import UserProfile from "../../components/ProfileInfo/ProfileInfo";
import CardGrid from "../../components/CardGrid/CardGrid";
import Modal from "../../components/Modal/Modal";
import { close } from "../../assests";
import classes from "./Profile.module.css";

function Profile() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"my" | "saved">("my");
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    profileImageId: 0,
  });

  const userRecipes = useAppSelector(
    (state) => state.users.userRecipes?.content || []
  );
  const savedRecipes = useAppSelector(
    (state) => state.users.savedRecipes?.content || []
  );
  const status = useAppSelector((state) => state.users.status);
  const profile = useAppSelector((state) => state.users.profile);

  useEffect(() => {
    if (activeTab === "my") {
      dispatch(fetchUserRecipes({}));
    } else {
      dispatch(fetchSavedRecipes({}));
    }
  }, [dispatch, activeTab]);

  useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.name,
        bio: profile.bio,
        profileImageId: 0,
      });
    }
  }, [profile]);

  const handleTabChange = (tab: "my" | "saved") => {
    setActiveTab(tab);
  };

  const handleManageProfileClick = () => {
    setIsModalActive(true);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile(profileData));
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  return (
    <div className={classes.profile}>
      <UserProfile onManageProfileClick={handleManageProfileClick} />
      <div className={classes.recipe_box}>
        <div className={classes.user_recipes}>
          <p
            onClick={() => handleTabChange("my")}
            className={activeTab === "my" ? classes.activeTab : ""}
          >
            My recipes
          </p>
          <p
            onClick={() => handleTabChange("saved")}
            className={activeTab === "saved" ? classes.activeTab : ""}
          >
            Saved recipes
          </p>
        </div>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          <CardGrid recipes={activeTab === "my" ? userRecipes : savedRecipes} />
        )}
        {status === "succeeded" && !userRecipes && activeTab === "my" && (
          <p>You don't have recipes</p>
        )}
        <Modal active={isModalActive} setActive={setIsModalActive}>
          <div className={classes.modal_profile}>
            <div className={classes.update_title}>
              <h3>Update Profile</h3>
              <img
                src={close}
                alt="close"
                onClick={handleCloseModal}
                className={classes.closeButton}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              Change your name
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="bio">
              Change your bio
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
              ></textarea>
            </label>
            <label htmlFor="profile_photo">
              Add a profile photo:
              <input type="file" name="profileImageId" onChange={(e) => {}} />
            </label>
            <button type="submit">Save changes</button>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
