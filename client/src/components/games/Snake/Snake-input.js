let inputDirection = { x: 0, y: 1 };
let lastInputDirection = {};

window.addEventListener("keydown", (event) => {
  // console.log(event.key);
  if (event.key === "ArrowUp" && lastInputDirection.y === 0) {
    inputDirection = { x: 0, y: -1 };
  } else if (event.key === "ArrowDown" && lastInputDirection.y === 0) {
    inputDirection = { x: 0, y: 1 };
  } else if (event.key === "ArrowLeft" && lastInputDirection.x === 0) {
    inputDirection = { x: -1, y: 0 };
  } else if (event.key === "ArrowRight" && lastInputDirection.x === 0) {
    inputDirection = { x: 1, y: 0 };
  }
});

export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}

export const initializeInputDirection = () => {
  inputDirection = { x: 0, y: 1 };
  lastInputDirection = {};
};
