import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import classes from "./Home.module.css";
import CardGrid from "../../components/CardGrid/CardGrid";
import Categories from "../../components/Categories/Categories";
import {
  fetchCategories,
  selectCategories,
} from "../../redux/categories/categorySlice";

function Home() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId: number) => {
    // Handle category click logic here (e.g., fetch recipes based on categoryId)
    console.log("Category clicked:", categoryId);
    // Example: Dispatch action to fetch recipes based on categoryId
    // dispatch(fetchRecipesByCategory(categoryId));
  };

  return (
    <div className={classes.home}>
      <h6 className={classes.user_welcome}>Hi, Sarthak. UI Designer & Cook</h6>
      <div className={classes.category_container}>
        <h6 className={classes.category}>Category</h6>
        <div className={classes.display_box}>
          <Categories
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
          <CardGrid />
        </div>
      </div>
    </div>
  );
}

export default Home;
