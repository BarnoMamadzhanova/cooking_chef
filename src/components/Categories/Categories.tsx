import React, { useEffect } from "react";
import classes from "./Categories.module.css";

interface Category {
  id: number;
  name: string;
}

interface Props {
  categories: Category[];
  selectedCategoryId: number | null;
  onCategoryClick: (categoryId: number) => void;
}

const Categories: React.FC<Props> = ({
  categories,
  selectedCategoryId,
  onCategoryClick,
}) => {
  useEffect(() => {
    if (!selectedCategoryId && categories.length > 0) {
      const defaultCategory = categories.find(
        (category) => category.name.toLowerCase() === "breakfast"
      );
      if (defaultCategory) {
        onCategoryClick(defaultCategory.id);
      } else {
        onCategoryClick(categories[0].id);
      }
    }
  }, [categories, selectedCategoryId, onCategoryClick]);

  return (
    <ul className={classes.list}>
      {categories.map((category) => (
        <li
          key={category.id}
          className={`${classes.link} ${
            selectedCategoryId === category.id ? classes.active : ""
          }`}
          onClick={() => onCategoryClick(category.id)}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
