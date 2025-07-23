let canvas: any;

type spritesType = {
  red: HTMLImageElement | null;
  blue: HTMLImageElement | null;
  green: HTMLImageElement | null;
  yellow: HTMLImageElement | null;
  purple: HTMLImageElement | null;
  orange: HTMLImageElement | null;
  silver: HTMLImageElement | null;
}
let sprites: spritesType = {
  red: null,
  blue: null,
  green: null,
  yellow: null,
  purple: null,
  orange: null,
  silver: null,
}

// type spritesKey = keyof spritesType;

Object.keys(sprites).forEach((key: string) => {
  const color = key as keyof spritesType;
  sprites[color] = new Image(400, 400);
  sprites[color].src = `./player-icons/${key}.png`

})

const convertCoord = (x: number, y: number) => {
  if (!canvas) return;
  return {
    drawX: x, drawY: canvas.height - y,
  }
}

const fillCircle = (context: any, x: number, y: number, radius: number, color: string) => {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

const drawPlayer = (context: any, x: number, y: number, radius: number, color: string) => {
  const {drawX, drawY} = convertCoord(x, y);
  fillCircle(context, drawX, drawY, radius, color);
}

const drawCircle = (context: any, x: number, y: number, radius: number, color: string) => {
  const { drawX, drawY } = convertCoord(x, y);
  fillCircle(context, drawX, drawY, radius, color);
};

type circle = {
      position: {x: number, y: number},
      radius: number,
      color: string,
}

type state = {
  players: {
    [id: string]: circle,
  },
  food: circle[],
}

export const drawCanvas = (drawState: state, convasRef:any) => {
  canvas = convasRef.current;
  if (!canvas) return;

  const context = canvas.getContext("2d");

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  Object.values(drawState.players).forEach((p) => {
    drawPlayer(context, p.position.x, p.position.y, p.radius, p.color);
  })

  Object.values(drawState.food).forEach((f) => {
    drawCircle(context, f.position.x, f.position.y, f.radius, f.color);
  })
};
