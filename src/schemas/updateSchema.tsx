import * as yup from "yup";

export const updateSchema = yup.object({
  name: yup.string().required("Name is required"),
  bio: yup.string().required("Bio is required"),
  profileImageId: yup.number().required("Profile Image ID is required"),
});
