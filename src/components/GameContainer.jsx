import React from "react";
import {ReactComponent as Arrow} from "../resources/arrow.svg";

export default function GameContainer({
  bgColor = "#9ACEEB",
  isFirst = false,
  isLast = false,
  nextPage,
  previousPage,
  children,
}) {
  return (
    <div className="game-container" style={{backgroundColor: bgColor}}>
      <div className="game">{children}</div>
      <div className="game-footer">
        <Arrow className={`arrow arrow-inverted ${isFirst && "arrow-hidden"}`} onClick={previousPage} />
        <Arrow className={`arrow ${isLast && "arrow-hidden"}`} onClick={nextPage} />
      </div>
    </div>
  );
}
