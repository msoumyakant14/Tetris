const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

let box = 32;

let board = [];
for(let i=0; i<20; i++) {
	board[i] = [];
	for(let j=0;j<19;j++)
		board[i][j] = 0;
}

let colors = ["green", "blue", "red", "yellow", "orange", "white", "purple"];
let shapes = [];
shapes[0] = [];

for(let i=0; i<4; i++)
	shapes[0][i] = {
		x : 9*box,
		y : (i-3)*box
	}

shapes[0][4] = 9*box;
shapes[0][5] = 9*box;
//shapes[0][6] = 3*box;
//shapes[0][7] = 4;

shapes[1] = [];
for(let i=0; i<3; i++)
	shapes[1][i] = {
		x : 9*box,
		y : (i-2)*box
	}
shapes[1][3] = {
	x : 10*box,
	y : 0
}

shapes[1][4] = 9*box;
shapes[1][5] = 10*box;
//shapes[1][6] = 2*box;
//shapes[1][7] = 3;

shapes[2] = [];
for(let i=0; i<3; i++)
	shapes[2][i] = {
		x : 9*box,
		y : (i-2)*box
	}
shapes[2][3] = {
	x : 8*box,
	y : 0
	//y : 2*box
}

shapes[2][4] = 8*box;
shapes[2][5] = 9*box;
//shapes[2][6] = 2*box;
//shapes[2][7] = 3;

shapes[3] = [];
for(let i=0;i<4;i++)
	shapes[3][i] = {
		x : (8+i%2)*box,
		y : (Math.floor(i/2)-1)*box
	}

shapes[3][4] = 8*box;
shapes[3][5] = 9*box;
//shapes[3][6] = box;
//shapes[3][7] = 2;

shapes[4] = [];
for(let i=0;i<4;i++)
	shapes[4][i] = {
		x : (8+Math.floor(i/2)+i%2)*box,
		y : (Math.floor(i/2)-1)*box
	}

shapes[4][4] = 8*box;
shapes[4][5] = 10*box;
//shapes[4][6] = box;
//shapes[4][7] = 2;

shapes[5] = [];
for(let i=0;i<4;i++)
	shapes[5][i] = {
		x : (9-Math.floor(i/2)+i%2)*box,
		y : (Math.floor(i/2)-1)*box
	}

shapes[5][4] = 8*box;
shapes[5][5] = 10*box;
//shapes[5][6] = box;
//shapes[5][7] = 2;

shapes[6] = [];
for(let i=0;i<4;i++)
	shapes[6][i] = {
		x : (8+i - 2*(Math.floor(i/2)*(i%2)))*box,
		y : (Math.floor(i/2)*(i%2)-1)*box
	}

shapes[6][4] = 8*box;
shapes[6][5] = 10*box;
//shapes[6][6] = box;
//shapes[6][7] = 2;

const music = new Audio();
music.src = "audio/Tetris.mp3";


let d="";

document.addEventListener("keydown", direction);
document.addEventListener("keyup", stop);
function direction(event) {
	if(event.keyCode == 37)
		d = "LEFT";
	else if(event.keyCode == 38)
		d = "UP";
	else if(event.keyCode == 39)
		d = "RIGHT";
}

function stop(event) {
	d = "";
}

var val = 0;
var height = box;
var mode = 0;

shape = [];
for(let i=0; i<4; i++)
	shape[i] = {
		x : shapes[0][i].x,
		y : shapes[0][i].y
	}

shape[4] = shapes[0][4];
shape[5] = shapes[0][5];
//shape[6] = box;
//shape[6] = shapes[0][6];
//shape[7] = shapes[0][7];

let score = 0;

function scorer() {
	for(let i=0;i<20;i++) {
		let j=0;
		while(j<19 && board[i][j]==1)
			j++;
		if(j==19) {
			score+=100;
			for(let k=i;k>0;k--) {
				for(j=0;j<19;j++)
					board[k][j] = board[k-1][j];
			}
		}
	}
}

let X = [];
let Y = [];

function draw() {
	let flag=0;
	music.play();
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 19*box, 20*box);
	for(let i=0; i<20; i++)
		for(let j=0; j<19; j++)
			if(board[i][j]==1) {
				ctx.fillStyle = "green";
				ctx.fillRect(j*box, i*box, box, box);
				ctx.strokeStyle = "red";
				ctx.strokeRect(j*box, i*box, box, box);
			}

	for(let i=0; i<4; i++) {
		if(shape[i].y>=0) {
			ctx.fillStyle = colors[val];
			//ctx.fillRect(shape[i].x, shape[i].y+height*box, box, box);
			ctx.fillRect(shape[i].x, shape[i].y, box, box);
			ctx.strokeStyle = "black";
			//ctx.strokeRect(shape[i].x, shape[i].y+height*box, box, box);
			ctx.strokeRect(shape[i].x, shape[i].y, box, box);
		}
	}

	for(let i=0; i<4; i++)
		shape[i].y+=box;
	
	height += box;
	//shape[6]+=box;
	if(d=="LEFT") {
		let l=0;
		if(shape[4]>0) {
			for(let i=0;i<4;i++)
				if(shape[i].y>=0 && board[Math.floor(shape[i].y/box)][Math.floor(shape[i].x/box)-1]==1) {
					l=1;
					break;
				}
			if(l==0) {
				for(let i=0; i<4; i++)
					shape[i].x-=box;
				shape[4]-=box;
				shape[5]-=box;
			}
		}
	}
	else if(d=="RIGHT") {
		let l=0;
		if(shape[5] < 18*box) {
			for(let i=0;i<4;i++)
				if(shape[i].y>=0 && board[Math.floor(shape[i].y/box)][Math.floor(shape[i].x/box)+1]==1) {
					l=1;
					break;
				}
			if(l==0) {
				for(let i=0; i<4; i++)
					shape[i].x+=box;
				shape[5]+=box;
				shape[4]+=box;
			}
		}
	}
	else if(d=="UP") {
		if(val==1) {
			if(mode == 0) {
				if(shape[4]>0) {
					if(board[Math.floor(shape[0].y/box)+1][Math.floor(shape[0].x/box)+1]==0 && board[Math.floor(shape[2].y/box)-1][Math.floor(shape[2].x/box)-1]==0 && board[Math.floor(shape[3].y/box)][Math.floor(shape[3].x/box)-2]==0) {
						for(let i=0;i<4;i++) {
							X[i] = shape[i].x;
							Y[i] = shape[i].y;
						}
						shape[0] = {
							x : X[2] - box,
							y : Y[2] - box
						}
						shape[2] = {
							x : X[0] + box,
							y : Y[0] + box
						}
						shape[3] = {
							x : X[3] - 2*box,
							y : Y[3]
						}
						mode = (mode+1)%4;
						shape[4]-=box;
					}
					else if(board[Math.floor(shape[0].y/box)+1][Math.floor(shape[0].x/box)+2]==0 && board[Math.floor(shape[1].y/box)][Math.floor(shape[1].x/box)+1]==0 && board[Math.floor(shape[2].y/box)-1][Math.floor(shape[2].x/box)]==0 && board[Math.floor(shape[3].y/box)][Math.floor(shape[3].x/box)-1]==0) {
						for(let i=0;i<4;i++) {
							X[i] = shape[i].x;
							Y[i] = shape[i].y;
						}
						shape[0] = {
							x : X[2],
							y : Y[2] - box
						}
						shape[1] = {
							x : X[1] + box,
							y : Y[1]
						}
						shape[2] = {
							x : X[0] + 2*box,
							y : Y[0] + box
						}
						shape[3] = {
							x : X[3] - box,
							y : Y[3]
						}
						mode = (mode+1)%4;
						shape[5]-=box;
					}
				}
				else {
					if(board[Math.floor(shape[0].y/box)+1][Math.floor(shape[0].x/box)+2]==0 && board[Math.floor(shape[1].y/box)][Math.floor(shape[1].x/box)+1]==0 && board[Math.floor(shape[2].y/box)-1][Math.floor(shape[2].x/box)]==0 && board[Math.floor(shape[3].y/box)][Math.floor(shape[3].x/box)-1]==0) {
						for(let i=0;i<4;i++) {
							X[i] = shape[i].x;
							Y[i] = shape[i].y;
						}
						shape[0] = {
							x : X[2],
							y : Y[2] - box
						}
						shape[1] = {
							x : X[1] + box,
							y : Y[1]
						}
						shape[2] = {
							x : X[0] + 2*box,
							y : Y[0] + box
						}
						shape[3] = {
							x : X[3] - box,
							y : Y[3]
						}
						mode = (mode+1)%4;
						shape[5]-=box;
					}
				}
			}
			else if(mode == 1) {
				if(shape[0].y>0 && shape[1].y>0 && board[Math.floor(shape[0].y/box)-1][Math.floor(shape[0].x/box)]==0 && board[Math.floor(shape[1].y/box)-1][Math.floor(shape[1].x/box)]==0) {
					if(board[Math.floor(shape[0].y/box)-1][Math.floor(shape[0].x/box)+1]==0 && board[Math.floor(shape[2].y/box)+1][Math.floor(shape[2].x/box)-1]==0 && board[Math.floor(shape[3].y/box)-2][Math.floor(shape[3].x/box)]==0) {
						for(let i=0;i<4;i++) {
							X[i] = shape[i].x;
							Y[i] = shape[i].y;
						}
						shape[0] = {
							x : X[2] - box,
							y : Y[2] - box
						}
						shape[2] = {
							x : X[0] + box,
							y : Y[0] + box
						}
						shape[3] = {
							x : X[3] - 2*box,
							y : Y[3]
						}
						mode = (mode+1)%4;
						shape[4]-=box;
					}
				}
			}
		}
	}
	
	//height++;
	
	if(height==20*box) 
		flag=1;
	else
		for(let i=0; i<4; i++)																	//There might be a problem here in future
			if(shape[i].y>=0 && board[Math.floor(shape[i].y/box)+1][Math.floor(shape[i].x/box)] == 1) {
				flag=1;
				break;
			}
	if(flag==1) {
		for(let i=0;i<4;i++)
			if(shape[i].y>=0)
				board[Math.floor(shape[i].y/box)][Math.floor(shape[i].x/box)] = 1;
		val = (val+1)%7;
		for(let i=0;i<4;i++)
			shape[i] = {
				x : shapes[val][i].x,
				y : shapes[val][i].y
			}
		shape[4] = shapes[val][4];
		shape[5] = shapes[val][5];
		//shape[6] = shapes[val][6];
		height = box;
		mode = 0;
		//height = 0;
	}
	scorer();
	ctx.fillStyle = "blue";
	ctx.fillRect(0,20*box, 19*box, 3*box);

	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score, 2*box, 22*box);
}

let game = setInterval(draw, 200);