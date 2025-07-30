let gridSize = 21;

export const getGridSize = () => {
  return gridSize;
};

export const setGridSize = (value) => {
  gridSize = value;
};

export const overlap = (pos, posList) => {
  for (const aPos of posList) {
    if (aPos.x === pos.x && aPos.y === pos.y) {
      return true;
    }
  }
  return false;
};
