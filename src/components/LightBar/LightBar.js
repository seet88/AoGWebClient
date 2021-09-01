import { useEffect, useState } from "react";
import classes from "./LightBar.module.css";
import LightFigure from "./LightSquare";

const borderColor = "rgb(223, 221, 221)";

const squaresInitial = [
  {
    showErrorValue: false,
    backgroundColor: "yellow",
    active: false,
    borderColor,
    id: 0,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(240, 100%, 90%)",
    active: false,
    borderColor,
    id: 1,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(240, 100%, 80%)",
    active: false,
    borderColor,
    id: 2,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(240, 100%, 70%)",
    active: false,
    borderColor,
    id: 3,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(240, 100%, 60%)",
    active: false,
    borderColor,
    id: 4,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(240, 100%, 50%)",
    active: false,
    borderColor,
    id: 5,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(240, 100%, 40%)",
    active: false,
    borderColor,
    id: 6,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(240, 100%, 30%)",
    active: false,
    borderColor,
    id: 7,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(240, 100%, 20%)",
    active: false,
    borderColor,
    id: 8,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(0, 100%, 90%)",
    active: false,
    borderColor,
    id: -1,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(0, 100%, 80%)",
    active: false,
    borderColor,
    id: -2,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(0, 100%, 70%)",
    active: false,
    borderColor,
    id: -3,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(0, 100%, 60%)",
    active: false,
    borderColor,
    id: -4,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(0, 100%, 50%)",
    active: false,
    borderColor,
    id: -5,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(0, 100%, 40%)",
    active: false,
    borderColor,
    id: -6,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(0, 100%, 30%)",
    active: false,
    borderColor,
    id: -7,
  },
  {
    showErrorValue: false,
    backgroundColor: "hsl(0, 100%, 20%)",
    active: false,
    borderColor,
    id: -8,
  },
];

const LightBar = ({ errorDistance }) => {
  const errorDistancePerSquare = 4;
  const calcActiveSquare = (errorDistance, squaresIn) => {
    let remainingErrorDistance = errorDistance;
    squaresIn?.map((square) => (square.active = false));
    if (errorDistance < 0) {
      squaresIn
        ?.filter((s) => s.id >= 0)
        ?.sort((a, b) => a.id - b.id)
        ?.map((square) => {
          if (remainingErrorDistance < 0) square.active = true;
          remainingErrorDistance =
            remainingErrorDistance + errorDistancePerSquare;
          return square;
        });
    } else {
      squaresIn
        ?.filter((s) => s.id <= 0)
        ?.sort((a, b) => b.id - a.id)
        ?.map((square) => {
          if (remainingErrorDistance > 0) square.active = true;
          remainingErrorDistance =
            remainingErrorDistance - errorDistancePerSquare;
          return square;
        });
    }
    return squaresIn;
  };

  const [squares, setSquares] = useState(
    calcActiveSquare(errorDistance, squaresInitial)
  );
  useEffect(() => {
    setSquares(calcActiveSquare(errorDistance, squaresInitial));
  }, [squaresInitial, errorDistance]);

  return (
    <ul className={classes.ul}>
      {squares
        ?.sort((a, b) => a.id - b.id)
        ?.map((square) => (
          <li key={square.id} className={classes.li}>
            <LightFigure props={square} />
          </li>
        ))}
    </ul>
  );
};

export default LightBar;
