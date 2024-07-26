import React, { ReactNode } from "react";
import classes from "./CardSearch.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { fetchUserById } from "../../redux/users/userSlice";

interface CardPropsSearch {
  children: ReactNode;
  userId: number;
}

const CardSearch: React.FC<CardPropsSearch> = ({ children, userId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCardClick = () => {
    dispatch(fetchUserById(userId)).then(() => {
      navigate(`/chef/${userId}`);
    });
  };
  return (
    <div className={classes.search_card} onClick={handleCardClick}>
      <div className={classes.search_box}>{children}</div>
    </div>
  );
};

export default CardSearch;
