import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import classes from "./Home.module.css";
import CardGrid from "../../components/CardGrid/CardGrid";
import Categories from "../../components/Categories/Categories";
import {
  fetchCategories,
  selectCategories,
} from "../../redux/categories/categorySlice";
import { selectAuthState } from "../../redux/auth/authSlice";

function Home() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const { isAuth } = useAppSelector(selectAuthState);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchCategories());
    }
  }, [dispatch, isAuth]);

  const handleCategoryClick = (categoryId: number) => {
    console.log("Category clicked:", categoryId);
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
          <CardGrid />
        </div>
      </div>
    </div>
  );
}

export default Home;
