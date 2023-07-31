const width = 400;
const height = 400;
const margin = 100;
let playButton;
let maze = [];

let state = {
  gameStartTime: 0,
  level: 1,
  timeAllotment: 15000,
  page: 'instructions'
};

function setup() {
  createCanvas(width, height);
  playButton = createButton('Play');
  playButton.position(width/2.2, height/2);
  playButton.mousePressed(startGame);
}

function draw() {
background('#000');
  switch(state.page) {
      case 'instructions':
      background('#000');
      instructions();
      break;
    case 'playing':
      background('#000');
      playing();
      break;
    case 'won':
      background('#00aa00');
      won();
      break;
    case 'lost':
      background('#aa0000');
      lost();
      break;
  }
}

const instructions = () => {
  fill('#fff');
  textSize(30);
  textAlign(CENTER)
  text(`MAZING RACE`, width * 0.5 , 50);
  textSize(15);
  text(`Use the arrow keys to reach the green block before`, width * 0.5 , 150);
  text(` the time runs out!`, width * 0.5 , 170);
}


const playing = () => {
  playButton.hide();
  const timeRemaining = ((state.timeAllotment - (Date.now() - state.gameStartTime)) / 1000).toFixed(2);
  if(timeRemaining < 0) state.page = 'lost';
  fill('#fff');
  textSize(15);
  textAlign(LEFT)
  text(`Level: ${state.level}`, width * 0.13, 380);
  text(`Time Remaining:`, width * 0.3, 30);
  textSize(20);
  text(timeRemaining, width * 0.6, 30);
  const size = width > height ? height - (margin) : width - (margin);
  const blockSize = size / maze.length;

  for(let i = 0; i < maze.length; i++) {
    for(let j = 0; j < maze.length; j++) {
      const block = maze[i][j];
      switch(block.type){
        case 'empty':
          fill('#fff');
          break;
        case 'wall':
          fill('#333');
          break;
        case 'agent':
          fill('#0000ff');
          break;
        case 'finish':
          fill('#00ff00');
          break;
      }
      const x = blockSize * i + (margin/2);
      const y = blockSize * j + (margin/2);
      square(x, y, blockSize);
    }
  }
}



const startGame = () => {
  setMaze();
  state.gameStartTime = Date.now();
  state.page = 'playing';
}

const won = () => {
  state.page = 'won';
  fill('#fff');
  textSize(35);
  textAlign(CENTER)
  text(`Congratulations!!!`, width/2, 50);
  textSize(20);
  text(`Now play the next level which you will`, width/2, 150);
  text(`have 10% less time to complete!`, width/2, 170);
  text(`(press space bar to play again)`, width/2, 190);
  playButton.show();
}

const es = async  () => {
  const resp = await fetch('/0', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      l: state.level,
      m: Date.now() - state.gameStartTime,
      u: state.user
    })
  });
  console.log(resp.body);
}

const lost = () => {
  fill('#fff');
  textSize(35);
  textAlign(CENTER)
  text(`Time's up!`, width/2, 50);
  textSize(20);
  text(`Better luck next time!`, width/2, 150);
  text(`(press space bar to play again)`, width/2, 170);
  playButton.show();
  playButton.show();
}

const move = (dir) => {
  let {x, y} = agentPosition();
  switch(dir) {
    case LEFT_ARROW:
        x--;
      break;
    case 65:
        x--;
      break;
    case RIGHT_ARROW:
        x++;
        break;
    case 68:
        x++;
      break;
    case UP_ARROW:
        y--;
      break;
    case 87:
        y--;
      break;
    case DOWN_ARROW:
        y++;
        break;
    case 83:
        y++;
      break;
      default: 
      break;
  }
  
  if(!maze[x]) return;
  if(!maze[x][y]) return;
  
  switch(maze[x][y].type) {
    case 'empty': 
      removeAgent();
      maze[x][y].type = 'agent';
      break;
      
    case 'finish': 
      won();
      es();
      state.timeAllotment = state.timeAllotment * 0.9;
      state.level++;
      break;
  }
}

const removeAgent = () => {
  const {x, y} = agentPosition();
  maze[x][y].type = 'empty';
}

const agentPosition = () => {
  for(let x = 0; x < maze.length; x++) {
    for(let y = 0; y < maze[x].length; y++) {
      if(maze[x][y].type === 'agent') {
        return {x, y}
      }
    }
  }
}

function keyPressed() {
  if (state.page === 'playing') move(keyCode);
  else {
    if(keyCode === 32) startGame();
  }
}

const setMaze = () => {
  maze = [
    [
      {type: 'agent'},
      {type: 'wall'},
      {type: 'wall'},
      {type: 'wall'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'}
    ],
    [
      {type: 'empty'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'wall'},
      {type: 'wall'},
      {type: 'empty'}
    ],
    [
      {type: 'wall'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'}
    ],
    [
      {type: 'empty'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'wall'}
    ],
    [
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'}
    ],
    [
      {type: 'wall'},
      {type: 'wall'},
      {type: 'wall'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'wall'},
      {type: 'wall'},
    ],
    [
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'wall'} 
    ],
    [
      {type: 'wall'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'wall'}
    ],
    [
      {type: 'empty'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'wall'}
    ],
    [
      {type: 'finish'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'empty'},
      {type: 'wall'},
      {type: 'wall'}
    ],
  ];

}

