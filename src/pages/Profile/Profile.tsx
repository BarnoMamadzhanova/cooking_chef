import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  fetchSavedRecipes,
  fetchUserRecipes,
  updateUserProfile,
} from "../../redux/users/userSlice";
import { uploadImageAsync, clearImage } from "../../redux/images/imageSlice";
import UserProfile from "../../components/ProfileInfo/ProfileInfo";
import CardGrid from "../../components/CardGrid/CardGrid";
import Modal from "../../components/Modal/Modal";
import { close, camera, userDefault } from "../../assests";
import classes from "./Profile.module.css";
import { unwrapResult } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import { updateSchema } from "../../schemas/updateSchema";

function Profile() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"my" | "saved">("my");
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState(camera);

  const userRecipes = useAppSelector(
    (state) => state.users.userRecipes?.content || []
  );
  const savedRecipes = useAppSelector(
    (state) => state.users.savedRecipes?.content || []
  );
  const status = useAppSelector((state) => state.users.status);
  const profile = useAppSelector((state) => state.users.profile);

  const formik = useFormik<{
    name: string;
    bio: string;
    profileImageId: undefined | number;
    profileImageUrl: string;
  }>({
    // enableReinitialize,
    initialValues: {
      name: profile?.name || "",
      bio: profile?.bio || "",
      profileImageId: undefined,
      profileImageUrl: profile?.profileImageUrl || "",
    },
    validationSchema: updateSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(
          updateUserProfile({
            name: values.name,
            bio: values.bio,
            profileImageId: values.profileImageId,
          })
        );
        handleCloseModal();
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    },
  });

  useEffect(() => {
    if (profile) {
      formik.setValues({
        name: profile.name,
        bio: profile.bio,
        profileImageId: profile.profileImageId || undefined,
        profileImageUrl: profile.profileImageUrl || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (activeTab === "my") {
      dispatch(fetchUserRecipes({}));
    } else {
      dispatch(fetchSavedRecipes({}));
    }
  }, [dispatch, activeTab]);

  const handleTabChange = (tab: "my" | "saved") => {
    setActiveTab(tab);
  };

  const handleManageProfileClick = () => {
    setIsModalActive(true);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));

      if (["image/jpeg", "image/png", "image/svg+xml"].includes(file.type)) {
        try {
          const actionResult = await dispatch(uploadImageAsync(file));
          const result = unwrapResult(actionResult);
          if (result) {
            formik.setFieldValue("profileImageId", result.id);
            formik.setFieldValue("profileImageUrl", result.imageUrl);

            dispatch(clearImage());
            setPreviewImage(result.imageUrl);
          }
        } catch (error) {
          console.error("Failed to upload image:", error);
        }
      } else {
        alert("Please select a valid image file (jpg, png, svg).");
      }
    } else {
      setPreviewImage(userDefault);
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
          <form onSubmit={formik.handleSubmit} className={classes.update_form}>
            <label htmlFor="name" className={classes.update_label}>
              Change your name
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className={classes.update_input}
              />
              {formik.errors.name && <div>{formik.errors.name}</div>}
            </label>
            <label htmlFor="bio" className={classes.update_label}>
              Change your bio
              <textarea
                id="bio"
                name="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                className={classes.update_input}
              ></textarea>
              {formik.errors.bio && <div>{formik.errors.bio}</div>}
            </label>
            <label htmlFor="profile_photo" className={classes.update_label}>
              Add a profile photo:
              <div className={classes.update_image_container}>
                <img
                  src={formik.values.profileImageUrl || previewImage}
                  alt="img"
                />
                <input
                  type="file"
                  id="profile_photo"
                  name="profile_photo"
                  onChange={handleFileChange}
                  className={classes.update_input}
                  accept="image/jpeg, image/png, image/svg+xml"
                />
              </div>
            </label>
            <button type="submit" className={classes.update_btn}>
              Save changes
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
