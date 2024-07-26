import * as yup from "yup";

export const updateSchema = yup.object({
  name: yup.string().required("Name is required"),
  bio: yup.string(),
  profileImageId: yup.number(),
});
