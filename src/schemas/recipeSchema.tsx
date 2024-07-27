import * as yup from "yup";

export const recipeSchema = yup.object().shape({
  name: yup.string().required("Required"),
  preparationTime: yup
    .number()
    .min(1, "Must be greater than 0")
    .required("Required"),
  description: yup.string().required("Required"),
  difficulty: yup
    .string()
    .oneOf(["EASY", "MEDIUM", "HARD"])
    .required("Required"),
  imageId: yup.number().required("Required"),
  categoryId: yup.number().required("Required"),
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Required"),
        quantity: yup
          .number()
          .min(0.1, "Must be greater than 0")
          .required("Required"),
        measure: yup.string().required("Required"),
      })
    )
    .required("At least one ingredient is required"),
});
