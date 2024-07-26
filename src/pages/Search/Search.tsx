import React from "react";
import classes from "./Search.module.css";
import { plus } from "../../assests";
import Modal from "../../components/Modal/Modal";

function Search() {
  return (
    <div className={classes.search}>
      <div className={classes.search_content}>
        <h3>What to eat today?</h3>
        <div className={classes.search_tabs}>
          <span>Chefs</span>
          <span>Recipes</span>
        </div>
        <div className={classes.search_container}>
          <form>
            <label htmlFor="search">
              <input type="search" placeholder="Search recipes" />
            </label>
          </form>
        </div>
      </div>
      <div className={classes.add_recipe}>
        <button>
          <img src={plus} alt="add" />
          Add your recipe
        </button>
      </div>
    </div>
  );
}

export default Search;
