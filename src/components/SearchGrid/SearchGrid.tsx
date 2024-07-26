import React from "react";
import CardSearch from "../CardSearch/CardSearch";
import { IUserSummary } from "../../api/users/types";
import classes from "./SearchGrid.module.css";

interface SearchCardGridProps {
  users: IUserSummary[];
}

const SearchCardGrid: React.FC<SearchCardGridProps> = ({ users }) => {
  return (
    <div className={classes.search_grid}>
      {users.map((user, index) => (
        <CardSearch key={index} userId={index}>
          <img
            src={user.profileImageUrl}
            alt={user.name}
            className={classes.card_img}
          />
          <h4 className={classes.card_name}>{user.name}</h4>
        </CardSearch>
      ))}
    </div>
  );
};

export default SearchCardGrid;
