import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/hook";
import classes from "./Search.module.css";
import { plus, search, close } from "../../assests";
import Modal from "../../components/Modal/Modal";
import { fetchRecipes } from "../../redux/recipes/recipeSlice";
import { fetchUsers } from "../../redux/users/userSlice";
import useDebounce from "../../components/Hook/useDebounce";

const Search: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Recipes" | "Chefs">("Recipes");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
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
        dispatch(fetchRecipes({ searchTerm }));
      } else {
        dispatch(fetchUsers({ searchTerm }));
      }
    }
  };

  const handleSearchIconClick = () => {
    if (searchTerm) {
      if (activeTab === "Recipes") {
        dispatch(fetchRecipes({ searchTerm }));
      } else {
        dispatch(fetchUsers({ searchTerm }));
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      <div className={classes.add_recipe}>
        <button onClick={openModal}>
          <img src={plus} alt="add" />
          Add your recipe
        </button>
      </div>
      {isModalOpen && (
        <Modal active={isModalOpen} setActive={setIsModalOpen}>
          <h2>Add Your Recipe</h2>
          <img
            src={close}
            alt="close"
            onClick={closeModal}
            className={classes.closeButton}
          />
          {/* Add the form for creating a recipe here */}
        </Modal>
      )}
    </div>
  );
};

export default Search;
