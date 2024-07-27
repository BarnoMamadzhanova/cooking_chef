import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useFormik } from "formik";
import { recipeSchema } from "../../schemas/recipeSchema";
import classes from "./Search.module.css";
import {
  plus,
  search,
  close,
  add_recipe,
  camera,
  imageDefault,
} from "../../assests";
import Modal from "../../components/Modal/Modal";
import {
  fetchRecipes,
  selectRecipes,
  clearRecipes,
  createRecipe,
} from "../../redux/recipes/recipeSlice";
import {
  fetchUsers,
  selectUsers,
  clearUsers,
} from "../../redux/users/userSlice";
import {
  createCategory,
  selectCategories,
} from "../../redux/categories/categorySlice";
import useDebounce from "../../components/Hook/useDebounce";
import CardGrid from "../../components/CardGrid/CardGrid";
import SearchCardGrid from "../../components/SearchGrid/SearchGrid";
import { uploadImageAsync, clearImage } from "../../redux/images/imageSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Search: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Recipes" | "Chefs">("Recipes");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(camera);
  const [newCategoryName, setNewCategoryName] = useState("");
  const dispatch = useAppDispatch();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const recipes = useAppSelector(selectRecipes);
  const users = useAppSelector(selectUsers);
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    if (activeTab === "Recipes") {
      dispatch(clearUsers());
    } else {
      dispatch(clearRecipes());
    }

    if (debouncedSearchTerm) {
      if (activeTab === "Recipes") {
        dispatch(fetchRecipes({ searchTerm: debouncedSearchTerm }));
      } else {
        dispatch(fetchUsers({ searchTerm: debouncedSearchTerm }));
      }
    }
  }, [debouncedSearchTerm, activeTab, dispatch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      if (activeTab === "Recipes") {
        dispatch(clearUsers());
        dispatch(fetchRecipes({ searchTerm }));
      } else {
        dispatch(clearRecipes());
        dispatch(fetchUsers({ searchTerm }));
      }
    }
  };

  const handleSearchIconClick = () => {
    if (searchTerm) {
      if (activeTab === "Recipes") {
        dispatch(clearUsers());
        dispatch(fetchRecipes({ searchTerm }));
      } else {
        dispatch(clearRecipes());
        dispatch(fetchUsers({ searchTerm }));
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const recipeList = recipes;
  const userList = users ? users.content : [];

  const formik = useFormik({
    initialValues: {
      name: "",
      preparationTime: 0,
      description: "",
      difficulty: "EASY" as "EASY" | "MEDIUM" | "HARD",
      imageId: 0,
      categoryId: 0,
      ingredients: [{ name: "", quantity: 0, measure: "TEASPOON" }],
    },
    validationSchema: recipeSchema,
    onSubmit: (values) => {
      dispatch(createRecipe(values))
        .unwrap()
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          console.error("Failed to create recipe:", error);
        });
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));

      if (["image/jpeg", "image/png", "image/svg+xml"].includes(file.type)) {
        try {
          const actionResult = await dispatch(uploadImageAsync(file));
          const result = unwrapResult(actionResult);
          if (result) {
            formik.setFieldValue("imageId", result.id);
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
      setPreviewImage(camera);
    }
  };

  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      try {
        const actionResult = await dispatch(
          createCategory({ name: newCategoryName })
        );
        unwrapResult(actionResult);
        setNewCategoryName("");
      } catch (error) {
        console.error("Failed to add category:", error);
      }
    }
  };

  return (
    <div className={classes.search}>
      <div className={classes.search_content}>
        <h3>What to eat today?</h3>
        <div className={classes.search_tabs}>
          <span
            className={activeTab === "Chefs" ? classes.active : ""}
            onClick={() => setActiveTab("Chefs")}
          >
            Chefs
          </span>
          <span
            className={activeTab === "Recipes" ? classes.active : ""}
            onClick={() => setActiveTab("Recipes")}
          >
            Recipes
          </span>
        </div>
        <form className={classes.search_form} onSubmit={handleSearchSubmit}>
          <div className={classes.search_container}>
            <label htmlFor="search" className={classes.search_label}>
              <input
                type="search"
                placeholder={`Search ${activeTab.toLowerCase()}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img src={search} alt="search" onClick={handleSearchIconClick} />
            </label>
          </div>
        </form>
      </div>

      {activeTab === "Recipes" && recipes.length === 0 && (
        <p>No recipes found</p>
      )}

      {activeTab === "Chefs" && userList.length === 0 && <p>No chefs found</p>}

      {activeTab === "Recipes" && <CardGrid recipes={recipeList} />}

      {activeTab === "Chefs" && <SearchCardGrid users={userList} />}

      <div className={classes.add_recipe}>
        <button onClick={openModal}>
          <img src={plus} alt="add" />
          Add your recipe
        </button>
      </div>

      {isModalOpen && (
        <Modal active={isModalOpen} setActive={setIsModalOpen}>
          <div className={classes.modal_content}>
            <form onSubmit={formik.handleSubmit}>
              <div className={classes.modal_header}>
                <h2>Add Recipe</h2>
                <img
                  src={close}
                  alt="close"
                  onClick={closeModal}
                  className={classes.modal_close}
                />
              </div>

              <div className={classes.input_group}>
                <label htmlFor="image">Add a recipe photo</label>
                <div className={classes.image_container}>
                  <img
                    src={formik.values.imageId ? previewImage : imageDefault}
                    alt="Preview"
                    className={classes.image_preview}
                  />
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/jpeg, image/png, image/svg+xml"
                    onChange={handleFileChange}
                    placeholder="Change photo"
                  />
                </div>

                {formik.errors.imageId && (
                  <div className={classes.error}>{formik.errors.imageId}</div>
                )}
              </div>

              <div className={classes.input_group}>
                <label htmlFor="name">Recipe Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className={classes.input}
                  placeholder="Recipe Name"
                />
                {/* {formik.errors.name && (
                  <div className={classes.error}>{formik.errors.name}</div>
                )} */}
              </div>

              <div className={classes.input_group}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  className={classes.input}
                  placeholder="Description"
                />
                {/* {formik.errors.description && (
                  <div className={classes.error}>
                    {formik.errors.description}
                  </div>
                )} */}
              </div>

              <div className={classes.input_group}>
                <label>Ingredients</label>
                {formik.values.ingredients.map((ingredient, index) => (
                  <div key={index} className={classes.ingredient_input_group}>
                    <input
                      name={`ingredients[${index}].name`}
                      type="text"
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={formik.handleChange}
                    />
                    <input
                      name={`ingredients[${index}].quantity`}
                      type="number"
                      placeholder="Quantity"
                      value={ingredient.quantity}
                      onChange={formik.handleChange}
                    />
                    <select
                      name={`ingredients[${index}].measure`}
                      value={ingredient.measure}
                      onChange={formik.handleChange}
                    >
                      <option value="TEASPOON">Teaspoon</option>
                      <option value="TABLESPOON">Tablespoon</option>
                      <option value="CUP">Cup</option>
                      <option value="GRAM">Gram</option>
                      <option value="KILOGRAM">Kilogram</option>
                      <option value="OUNCE">Ounce</option>
                      <option value="POUND">Pound</option>
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        formik.setFieldValue("ingredients", [
                          ...formik.values.ingredients,
                          { name: "", quantity: 0, measure: "TEASPOON" },
                        ])
                      }
                    >
                      <img src={add_recipe} alt="plus" />
                    </button>
                  </div>
                ))}
              </div>

              <div className={classes.input_group}>
                <label htmlFor="difficulty">Difficulty</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  onChange={formik.handleChange}
                  value={formik.values.difficulty}
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
                {formik.errors.difficulty && (
                  <div className={classes.error}>
                    {formik.errors.difficulty}
                  </div>
                )}
              </div>

              <div className={classes.input_group}>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="categoryId"
                  onChange={formik.handleChange}
                  value={formik.values.categoryId}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {formik.errors.categoryId && (
                  <div className={classes.error}>
                    {formik.errors.categoryId}
                  </div>
                )}
              </div>

              <div className={classes.input_group}>
                <label htmlFor="newCategory">Add New Category:</label>
                <input
                  id="newCategory"
                  name="newCategory"
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                >
                  <img src={add_recipe} alt="plus" />
                </button>
              </div>

              <div className={classes.input_group}>
                <label htmlFor="preparationTime">Preparation Time:</label>
                <input
                  id="preparationTime"
                  name="preparationTime"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.preparationTime}
                />
                {/* {formik.errors.preparationTime && (
                  <div className={classes.error}>
                    {formik.errors.preparationTime}
                  </div>
                )} */}
              </div>

              <div className={classes.modal_actions}>
                <button
                  type="submit"
                  className={classes.save_button}
                  onClick={closeModal}
                >
                  Save Recipe
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Search;
