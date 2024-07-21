import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import classes from "./Home.module.css";
import CardGrid from "../../components/CardGrid/CardGrid";
import Categories from "../../components/Categories/Categories";
import {
  fetchCategories,
  selectCategories,
} from "../../redux/categories/categorySlice";
import {
  fetchRecipes,
  selectRecipes,
  selectRecipesLoading,
  selectRecipesError,
  selectTotalPages,
  selectCurrentPage,
} from "../../redux/recipes/recipeSlice";
import { fetchProfile } from "../../redux/users/userSlice";
import { selectAuthState } from "../../redux/auth/authSlice";
import Pagination from "../../components/Pagination/Pagination";

function Home() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const { isAuth } = useAppSelector(selectAuthState);
  const recipes = useAppSelector(selectRecipes);
  const loading = useAppSelector(selectRecipesLoading);
  const error = useAppSelector(selectRecipesError);
  const totalPages = useAppSelector(selectTotalPages);
  const currentPage = useAppSelector(selectCurrentPage);
  const profile = useAppSelector((state) => state.users.profile);

  const defaultCategory = categories.find(
    (category) => category.name.toLowerCase() === "breakfast"
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    defaultCategory ? defaultCategory.id : null
  );

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchCategories());
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    if (selectedCategoryId !== null) {
      dispatch(
        fetchRecipes({ categoryId: selectedCategoryId, page: 0, size: 12 })
      );
    }
  }, [dispatch, selectedCategoryId]);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handlePageChange = (page: number) => {
    if (selectedCategoryId !== null) {
      dispatch(
        fetchRecipes({ categoryId: selectedCategoryId, page, size: 12 })
      );
    }
  };

  return (
    <div className={classes.home}>
      <h6 className={classes.user_welcome}>
        Hi, {profile?.name || "Guest"}. UI Designer & Cook
      </h6>
      <div className={classes.category_container}>
        <p className={classes.category}>Category</p>
        <div className={classes.display_box}>
          <Categories
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {!loading && recipes.length === 0 && <div>No recipes found.</div>}
          <CardGrid recipes={recipes} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
