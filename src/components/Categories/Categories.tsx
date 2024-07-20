import React, { useState, useEffect } from "react";
import classes from "./Categories.module.css";

interface Category {
  id: number;
  name: string;
}

interface Props {
  categories: Category[];
  onCategoryClick: (categoryId: number) => void;
}

const Categories: React.FC<Props> = ({ categories, onCategoryClick }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const defaultCategory = categories.find(
      (category) => category.name.toLowerCase() === "breakfast"
    );
    if (defaultCategory) {
      setSelectedCategoryId(defaultCategory.id);
      onCategoryClick(defaultCategory.id);
    }
  }, [categories, onCategoryClick]);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    onCategoryClick(categoryId);
  };

  return (
    <ul className={classes.list}>
      {categories.map((category) => (
        <li
          key={category.id}
          className={`${classes.link} ${
            selectedCategoryId === category.id ? classes.active : ""
          }`}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
