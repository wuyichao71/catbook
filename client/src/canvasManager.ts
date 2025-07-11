let canvas: any;

const convertCoord = (x: number, y: number) => {
  return {
    drawX: x, drawY: canvas.height - y,
  }
}

const fillCircle = (context: any, x: number, y: number, radius: number, color: string) => {
  context.beginPath();
  context.arc(x, y, radius, 0, radius * 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

const drawPlayer = (context: any, x: number, y: number, radius: number, color: string) => {
  const {drawX, drawY} = convertCoord(x, y);
  fillCircle(context, drawX, drawY, radius, color);
}

type state = {
  players: {
    [id: string]: {
      position: {x: number, y: number},
      radius: number,
      color: string,
    }
  }
}

export const drawCanvas = (drawState: state, convasRef:any) => {
  canvas = convasRef.current;
  if (!canvas) return;

  const context = canvas.getContext("2d");

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  Object.values(drawState.players).forEach((p) => {
    drawPlayer(context, p.position.x, p.position.y, p.radius, p.color);
    // context.fillStyle = drawState.players[p].color;
    // context.fillCircle(drawState.players[p].position.x, drawState.players[p].position.x, drawState.players[p].radius)
  })
};
