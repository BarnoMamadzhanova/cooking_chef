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
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchCategories());
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
    console.log("Category clicked:", categoryId);
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
      <h6 className={classes.user_welcome}>Hi, Sarthak. UI Designer & Cook</h6>
      <div className={classes.category_container}>
        <p className={classes.category}>Category</p>
        <div className={classes.display_box}>
          <Categories
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
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
