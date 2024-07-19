import React from "react";
import classes from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={classes.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          className={`${classes.page_button} ${
            page === currentPage ? classes.active : ""
          }`}
          onClick={() => onPageChange(page - 1)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
