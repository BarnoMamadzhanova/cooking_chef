import React from "react";
import classes from "./CardGrid.module.css";
// import Card from "../Card/Card";
// import TextContainer from "../TextContainer/TextContainer";

function CardGrid() {
  return (
    <div className={classes.card_grid}>
      {/* {cards.map((card) => (
      <Card key={card.id} image={card.image}>
        <TextContainer>
          <div className={classes.title_box}>
            <h4>{card.title}</h4>
            <p>{card.author}</p>
          </div>
          <div className={classes.icon_box}>
          </div>
        </TextContainer>
      </Card>
    ))} */}
    </div>
  );
}

export default CardGrid;
