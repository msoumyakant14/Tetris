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

shapes = [];
for(let i=0; i<7; i++) {
	shapes[i] = [];
	for(let j=0; j<3; j++) {
		shapes[i][j] = [];
		for(let k=0; k<3; k++)
			shapes[i][j][k] = 0;
	}
}

for(let i=0; i<3; i++) {
	shapes[0][i][3] = 0;
}

shapes[0][3] = [];

for(let i=0; i<4; i++)
	shapes[0][3][i] = 0;

shapes[0][0][1] = 1;	// I SHAPE
shapes[0][1][1] = 1;	
shapes[0][2][1] = 1;
shapes[0][3][1] = 1;

shapes[1][0][1] = 1;	// L SHAPE
shapes[1][1][1] = 1;
shapes[1][2][1] = 1;
shapes[1][2][2] = 1;

shapes[2][0][1] = 1;	// J SHAPE
shapes[2][1][1] = 1;
shapes[2][2][1] = 1;
shapes[2][2][0] = 1;

shapes[3][0][0] = 1;	// O SHAPE
shapes[3][0][1] = 1;
shapes[3][1][0] = 1;
shapes[3][1][1] = 1;

shapes[4][0][1] = 1;	// S SHAPE
shapes[4][0][2] = 1;
shapes[4][1][1] = 1;
shapes[4][1][0] = 1;

shapes[5][0][0] = 1;	// Z SHAPE
shapes[5][0][1] = 1;
shapes[5][1][1] = 1;
shapes[5][1][2] = 1;


shapes[6][0][0] = 1;	// T SHAPE
shapes[6][0][1] = 1;
shapes[6][0][2] = 1;
shapes[6][1][1] = 1;

let heights = [];
heights[0] = [4,2,4,3];
heights[1] = [3,3,3,2];
heights[2] = [3,2,3,3];
heights[3] = 2;
heights[4] = [2,3,3,3];
heights[5] = [2,3,3,3];
heights[6] = [2,3,3,3];

let leftsides = [];
leftsides[0] = [1,0,2,0];
leftsides[1] = [1,0,0,0];
leftsides[2] = [0,0,1,0];
leftsides[3] = 0;
leftsides[4] = [0,1,0,0];
leftsides[5] = [0,1,0,0];
leftsides[6] = [0,1,0,0];

let rightsides = [];
rightsides[0] = [1,3,2,3];
rightsides[1] = [2,2,1,2];
rightsides[2] = [1,2,2,2];
rightsides[3] = 1;
rightsides[4] = [2,2,2,1];
rightsides[5] = [2,2,2,1];
rightsides[6] = [2,2,2,1];

let line = [];
let shape = [];

function rotate3() {
	let x = [];
	for(let i=0;i<3;i++) {
		x[i] = [];
		for(let j=0; j<3; j++)
			x[i][j] = 0;
	}
	for(let i=0;i<3;i++) {
		for(let j=0;j<3;j++)
			x[i][j] = shape[2-j][i];
	}
	for(let i=0;i<3;i++)
		for(let j=0;j<3;j++)
			shape[i][j] = x[i][j];
}

function rotate4() {
	let x = [];
	for(let i=0;i<4;i++) {
		x[i] = [];
		for(let j=0; j<4; j++)
			x[i][j] = 0;
	}
	for(let i=0;i<4;i++) {
		for(let j=0;j<4;j++)
			x[i][j] = line[3-j][i];
	}
	for(let i=0;i<4;i++)
		for(let j=0;j<4;j++)
			line[i][j] = x[i][j];
}

const right = new Image();
right.src = "img/right.png";

const music = new Audio();
music.src = "audio/Tetris.mp3";


let d="";

var button1 = document.createElement("buttonL");
button1.innerHTML = "L";

var body = document.getElementsByTagName("body")[0];
body.appendChild(button1);

var button2 = document.createElement("buttonR");
button2.innerHTML = "R";

body.appendChild(button2);

var button3 = document.createElement("buttonU");
button3.innerHTML = "C";

body.appendChild(button3);

var button4 = document.createElement("buttonD");
button4.innerHTML = "D";

body.appendChild(button4);

button1.addEventListener("mousedown", function() {
	d="LEFT";
})
button2.addEventListener("mousedown", function() {
	d="RIGHT";
})
button3.addEventListener("mousedown", function() {
	d="UP";
})
button4.addEventListener("mousedown", function() {
	d="DOWN";
})

button1.addEventListener("mouseup", function() {
	d="";
})
button2.addEventListener("mouseup", function() {
	d="";
})
button3.addEventListener("mouseup", function() {
	d="";
})
button4.addEventListener("mouseup", function() {
	d="";
})
document.addEventListener("keydown", direction);
document.addEventListener("keyup", stop);
function direction(event) {
	if(event.keyCode == 37)
		d = "LEFT";
	else if(event.keyCode == 38)
		d = "UP";
	else if(event.keyCode == 39)
		d = "RIGHT";
	else if(event.keyCode == 40)
		d = "DOWN";
}

function stop(event) {
	d = "";
}

var val = Math.floor(Math.random()*7);
var height;
if(val==0)
	height = 4;
else
	height = 3;
var side = 8;
var mode = 0;

for(let i=0; i<4; i++) {
	line[i] = [];
	for(let j=0; j<4; j++)
		line[i][j] = 0;
}

for(let i=0; i<4; i++) {
	line[i] = [];
	for(let j=0; j<4; j++)
		line[i][j] = 0;
}

for(let i=0; i<3; i++) {
	shape[i] = [];
	for(let j=0; j<3; j++)
		shape[i][j] = 0;
}

if(val==0)
	for(let i=0; i<4; i++) {
		for(let j=0; j<4; j++)
			line[i][j] = shapes[0][i][j];
	}
else
	for(let i=0; i<3; i++) {
		for(let j=0; j<3; j++)
			shape[i][j] = shapes[val][i][j];
	}

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


function draw() {
	let flag=0;
	music.play();
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 19*box, 20*box);
	if(board[0][9]==1) {
		window.alert("GAME OVER!");
		clearInterval(game);
	}
	for(let i=0; i<20; i++)
		for(let j=0; j<19; j++)
			if(board[i][j]==1) {
				ctx.fillStyle = "green";
				ctx.fillRect(j*box, i*box, box, box);
				ctx.strokeStyle = "red";
				ctx.strokeRect(j*box, i*box, box, box);
			}

	if(val==0) {
		for(let i=0; i<4; i++)
			for(let j=0; j<4; j++)
				if(line[i][j]==1) {
					ctx.fillStyle = colors[val];
					ctx.fillRect((j+side)*box, (height-4+i)*box, box, box);
					ctx.strokeStyle = "black";
					ctx.strokeRect((j+side)*box, (height-4+i)*box, box, box);
				}
		height+=0.5;
		if(d=="LEFT") {
			if(side + leftsides[val][mode] >0) {
				let l=0;
				for(let i=0;i<4;i++) {
					for(let j=0;j<4;j++) {
						if(line[i][j]==1 && board[Math.floor(height)-4+i][side+j-1]==1) {
							l=1;
							break;
						}
					}
					if(l==1)
						break;
				}
				if(l==0) {
					side--;
				}
			}
		}
		else if(d=="RIGHT") {
			if(side + rightsides[val][mode] <18) {
				let l=0;
				for(let i=0;i<4;i++) {
					for(let j=0;j<4;j++) {
						if(line[i][j]==1 && board[Math.floor(height)-4+i][side+j+1]==1) {
							l=1;
							break;
						}
					}
					if(l==1)
						break;
				}
				if(l==0) {
					side++;
				}
			}
		}
		else if(d=="UP") {
			let linei = [];
			for(let i=0; i<4; i++) {
				linei[i] = [];
				for(let j=0; j<4; j++)
					linei[i][j] = line[i][j];
			}
			//rotate4();


			let x = [];
			for(let i=0;i<4;i++) {
				x[i] = [];
				for(let j=0; j<4; j++)
					x[i][j] = 0;
			}
			for(let i=0;i<4;i++) {
				for(let j=0;j<4;j++)
					x[i][j] = line[3-j][i];
			}
			for(let i=0;i<4;i++)
				for(let j=0;j<4;j++)
					line[i][j] = x[i][j];


			let l=0;
			for(let i=0;i<4;i++) {
				for(let j=0;j<4;j++)
					if(line[i][j]==1 && (Math.floor(height)-4+i>19 || side+j<0 || side+j>18 || board[Math.floor(height)-4+i][side+j]==1)) {
						l=1;
						break;
					}
				if(l==1)
					break;
			}
			if(l==1)
				for(let i=0;i<4;i++)
					for(let j=0;j<4;j++)
						line[i][j] = linei[i][j];
			else
				mode = (mode + 1)%4;
		}
		if(Math.floor(height) - 4 + heights[val][mode] > 19)
			flag=1;
		else
			for(let i=0; i<4; i++) {
				for(let j=0; j<4; j++) {
					if(line[i][j]==1 && board[Math.floor(height)-3+i][side+j]==1) {
						flag=1;
						break;
					}
				}
				if(flag==1)
					break;
			}
		if(flag==1) {
			for(let i=0; i<4; i++)
				for(let j=0; j<4; j++)
					if(line[i][j]==1)
						board[Math.floor(height)-4+i][side+j] = 1;
			val = Math.floor(Math.random()*7);
			if(val == 0) {
				for(let i=0; i<4; i++)
					for(let j=0; j<4; j++)
						line[i][j] = shapes[0][i][j];
				height = 4;
			}
			else {
				for(let i=0; i<3; i++)
					for(let j=0; j<3; j++)
						shape[i][j] = shapes[val][i][j];
				height = 3;
			}
			side = 8;
			mode = 0;
		}
		if(d=="DOWN")
			height+=0.5;
	}
	else if(val==3) {
		for(let i=0; i<3; i++)
			for(let j=0; j<3; j++)
				if(shape[i][j]==1) {
					ctx.fillStyle = colors[val];
					ctx.fillRect((j+side)*box, (height-3+i)*box, box, box);
					ctx.strokeStyle = "black";
					ctx.strokeRect((j+side)*box, (height-3+i)*box, box, box);
				}
		height+=0.5;
		if(d=="LEFT") {
			if(side + leftsides[val] >0) {
				let l=0;
				for(let i=0;i<3;i++) {
					for(let j=0;j<3;j++) {
						if(shape[i][j]==1 && board[Math.floor(height)-3+i][side+j-1]==1) {
							l=1;
							break;
						}
					}
					if(l==1)
						break;
				}
				if(l==0) {
					side--;
				}
			}
		}
		else if(d=="RIGHT") {
			if(side + rightsides[val] <18) {
				let l=0;
				for(let i=0;i<3;i++) {
					for(let j=0;j<3;j++) {
						if(shape[i][j]==1 && board[Math.floor(height)-3+i][side+j+1]==1) {
							l=1;
							break;
						}
					}
					if(l==1)
						break;
				}
				if(l==0) {
					side++;
				}
			}
		}
		if(Math.floor(height) - 3 + heights[val] > 19)
			flag=1;
		else
			for(let i=0; i<3; i++) {
				for(let j=0; j<3; j++) {
					if(shape[i][j]==1 && board[Math.floor(height)-2+i][side+j]==1) {
						flag=1;
						break;
					}
				}
				if(flag==1)
					break;
			}
		if(flag==1) {
			for(let i=0; i<3; i++)
				for(let j=0; j<3; j++)
					if(shape[i][j]==1)
						board[Math.floor(height)-3+i][side+j] = 1;
			val = Math.floor(Math.random()*7);
			if(val == 0) {
				for(let i=0; i<4; i++)
					for(let j=0; j<4; j++)
						line[i][j] = shapes[0][i][j];
				height = 4;
			}
			else {
				for(let i=0; i<3; i++)
					for(let j=0; j<3; j++)
						shape[i][j] = shapes[val][i][j];
				height = 3;
			}
			side = 8;
			mode = 0;
		}
		if(d=="DOWN")
			height+=0.5;
	}
	else {
		for(let i=0; i<3; i++)
			for(let j=0; j<3; j++)
				if(shape[i][j]==1) {
					ctx.fillStyle = colors[val];
					ctx.fillRect((j+side)*box, (height-3+i)*box, box, box);
					ctx.strokeStyle = "black";
					ctx.strokeRect((j+side)*box, (height-3+i)*box, box, box);
				}
		height+=0.5;
		if(d=="LEFT") {
			if(side + leftsides[val][mode] >0) {
				let l=0;
				for(let i=0;i<3;i++) {
					for(let j=0;j<3;j++) {
						if(shape[i][j]==1 && board[Math.floor(height)-3+i][side+j-1]==1) {
							l=1;
							break;
						}
					}
					if(l==1)
						break;
				}
				if(l==0) {
					side--;
				}
			}
		}
		else if(d=="RIGHT") {
			if(side + rightsides[val][mode] <18) {
				let l=0;
				for(let i=0;i<3;i++) {
					for(let j=0;j<3;j++) {
						if(shape[i][j]==1 && board[Math.floor(height)-3+i][side+j+1]==1) {
							l=1;
							break;
						}
					}
					if(l==1)
						break;
				}
				if(l==0) {
					side++;
				}
			}
		}
		else if(d=="UP") {
			let shapei = [];
			for(let i=0; i<3; i++) {
				shapei[i] = [];
				for(let j=0; j<3; j++)
					shapei[i][j] = shape[i][j];
			}


			let x = [];
			for(let i=0;i<3;i++) {
				x[i] = [];
				for(let j=0; j<3; j++)
					x[i][j] = 0;
			}
			for(let i=0;i<3;i++) {
				for(let j=0;j<3;j++)
					x[i][j] = shape[2-j][i];
			}
			for(let i=0;i<3;i++)
				for(let j=0;j<3;j++)
					shape[i][j] = x[i][j];



			let l=0;
			for(let i=0;i<3;i++) {
				for(let j=0;j<3;j++)
					if(shape[i][j]==1 && (Math.floor(height)-3+i>19 || side+j<0 || side+j>18 || board[Math.floor(height)-3+i][side+j]==1)) {
						l=1;
						break;
					}
				if(l==1)
					break;
			}
			if(l==1)
				for(let i=0;i<3;i++)
					for(let j=0;j<3;j++)
						shape[i][j] = shapei[i][j];
			else
				mode = (mode + 1)%4;
		}
		if(Math.floor(height) - 3 + heights[val][mode] > 19)
			flag=1;
		else
			for(let i=0; i<3; i++) {
				for(let j=0; j<3; j++) {
					if(shape[i][j]==1 && board[Math.floor(height)-2+i][side+j]==1) {
						flag=1;
						break;
					}
				}
				if(flag==1)
					break;
			}
		if(flag==1) {
			for(let i=0; i<3; i++)
				for(let j=0; j<3; j++)
					if(shape[i][j]==1)
						board[Math.floor(height)-3+i][side+j] = 1;
			val = Math.floor(Math.random()*7);
			if(val == 0) {
				for(let i=0; i<4; i++)
					for(let j=0; j<4; j++)
						line[i][j] = shapes[0][i][j];
				height = 4;
			}
			else {
				for(let i=0; i<3; i++)
					for(let j=0; j<3; j++)
						shape[i][j] = shapes[val][i][j];
				height = 3;
			}
			side = 8;
			mode = 0;
		}
		if(d=="DOWN")
			height+=0.5;
	}

	scorer();
	ctx.fillStyle = "blue";
	ctx.fillRect(0,20*box, 19*box, 3*box);

	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score, 2*box, 22*box);

	ctx.drawImage(right, 19*box, 0);

}

let game = setInterval(draw, 300);