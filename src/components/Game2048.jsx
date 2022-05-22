import React, {useCallback, useEffect, useState} from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function copyArray(currentArray) {
  return currentArray.map(function (arr) {
    return arr.slice();
  });
}

function getRandomAvailableTile(grid) {
  const availableTiles = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) availableTiles.push([i, j]);
    }
  }
  const randTile = availableTiles[getRandomInt(availableTiles.length)];
  return randTile;
}

export default function Game2048() {
  const defaultGrid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  defaultGrid[getRandomInt(4)][getRandomInt(4)] = 2;
  const [grid, setGrid] = useState(defaultGrid);

  const goLeft = useCallback(() => {
    const newGrid = copyArray(grid);
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        if (newGrid[i][j] !== 0) {
          let l = j;
          for (let k = j - 1; k >= 0; k--) {
            if (newGrid[i][k] === 0) {
              newGrid[i][k] = newGrid[i][l];
              newGrid[i][l] = 0;
              l--;
            } else {
              if (newGrid[i][k] === newGrid[i][l]) {
                newGrid[i][k] *= 2;
                newGrid[i][l] = 0;
              }
              break;
            }
          }
        }
      }
    }
    const randTile = getRandomAvailableTile(newGrid);
    newGrid[randTile[0]][randTile[1]] = 2;
    setGrid(newGrid);
  }, [grid]);
  const goUp = useCallback(() => {
    const newGrid = copyArray(grid);
    for (let j = 0; j < 4; j++) {
      for (let i = 1; i < 4; i++) {
        if (newGrid[i][j] !== 0) {
          // 3 3
          let l = i; // l = 3
          for (let k = i - 1; k >= 0; k--) {
            // k = 2
            if (newGrid[k][j] === 0) {
              newGrid[k][j] = newGrid[l][j];
              newGrid[l][j] = 0;
              l--;
            } else {
              // oui
              if (newGrid[k][j] === newGrid[l][j]) {
                newGrid[k][j] *= 2;
                newGrid[l][j] = 0;
              }
              break;
            }
          }
        }
      }
    }
    const randTile = getRandomAvailableTile(newGrid);
    newGrid[randTile[0]][randTile[1]] = 2;
    setGrid(newGrid);
  }, [grid]);
  const goRight = useCallback(() => {
    const newGrid = copyArray(grid);
    for (let i = 0; i < 4; i++) {
      for (let j = 2; j >= 0; j--) {
        if (newGrid[i][j] !== 0) {
          let l = j;
          for (let k = j + 1; k < 4; k++) {
            if (newGrid[i][k] === 0) {
              newGrid[i][k] = newGrid[i][l];
              newGrid[i][l] = 0;
              l++;
            } else {
              if (newGrid[i][k] === newGrid[i][l]) {
                newGrid[i][k] *= 2;
                newGrid[i][l] = 0;
              }
              break;
            }
          }
        }
      }
    }
    const randTile = getRandomAvailableTile(newGrid);
    newGrid[randTile[0]][randTile[1]] = 2;
    setGrid(newGrid);
  }, [grid]);
  const goDown = useCallback(() => {
    const newGrid = copyArray(grid);
    for (let j = 0; j < 4; j++) {
      for (let i = 2; i >= 0; i--) {
        if (newGrid[i][j] !== 0) {
          let l = i;
          for (let k = i + 1; k < 4; k++) {
            if (newGrid[k][j] === 0) {
              newGrid[k][j] = newGrid[l][j];
              newGrid[l][j] = 0;
              l++;
            } else {
              if (newGrid[k][j] === newGrid[l][j]) {
                newGrid[k][j] *= 2;
                newGrid[l][j] = 0;
              }
              break;
            }
          }
        }
      }
    }
    const randTile = getRandomAvailableTile(newGrid);
    setGrid(newGrid);
    newGrid[randTile[0]][randTile[1]] = 2;
    setGrid(newGrid);
  }, [grid]);

  // Game is played with keyboard arrows
  const handleKeyDown = useCallback(
    (event) => {
      const code = event.keyCode;
      if (code === 37) {
        goLeft();
      } else if (code === 38) {
        goUp();
      } else if (code === 39) {
        goRight();
      } else if (code === 40) {
        goDown();
      }
    },
    [goLeft, goRight, goUp, goDown]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="container-2048">
      {grid.map((row) => {
        return row.map((tile, i) => (
          <div className="tileContainer" key={`tile-${i}`}>
            {tile ? (
              <div className={`tile tile-${tile}`}>
                <div className="tileInner noselect">{tile}</div>
              </div>
            ) : null}
          </div>
        ));
      })}
    </div>
  );
}
