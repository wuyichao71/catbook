import { move } from "./socket-client.ts";

export const handleInput = (e:KeyboardEvent) => {
  let direction;
  switch (e.key) {
    case 'ArrowUp':
      move('up');
      break;
    case 'ArrowDown':
      move('down');
      break;
    case 'ArrowLeft':
      move('left');
      break;
    case 'ArrowRight':
      move('right');
      break;
  }
}
