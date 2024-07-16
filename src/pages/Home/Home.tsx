import React from "react";
import classes from "./Home.module.css";
import CardGrid from "../../components/CardGrid/CardGrid";

function Home() {
  return (
    <div className={classes.home}>
      <h6 className={classes.user_welcome}>Hi, Sarthak. UI Designer & Cook</h6>
      <div className={classes.category_container}>
        <h6 className={classes.category}>Category</h6>
        <div className={classes.display_box}>
          <ul className={classes.categories}>
            <li>Breakfast</li>
            <li>Lunch</li>
            <li>Dinner</li>
          </ul>
          <CardGrid />
        </div>
      </div>
    </div>
  );
}

export default Home;
