let x = 25;
let y = 25;
let dir = "r";
function setup() {
	createCanvas(1500,720);
	background(0);
	fill(256);
}
function draw() {
	rect(x,y,25,25);
	if (dir === "u") { y = y - 25; y = y + 12.5; y = y - 12.5;} else
	if (dir === "d") { y = y + 25; y = y - 12.5; y = y + 12.5;} else
	if (dir === "l") { x = x - 25; x = x + 12.5; x = x - 12.5; } else
	if (dir === "r") { x = x + 25; x = x - 12.5; x = x + 12.5; }
	
	
}
function keyPressed() {
	if (keyCode === UP_ARROW) { dir = "u"; } else
	if (keyCode === DOWN_ARROW) { dir = "d"; } else
	if (keyCode === LEFT_ARROW) { dir = "l"; } else
	if (keyCode === RIGHT_ARROW) { dir = "r"; } else
	if (keyCode === SHIFT) { 
	
	if (dir === "u") { y = y - 25; } else
	if (dir === "d") { y = y + 25; } else
	if (dir === "l") { x = x - 25; } else
	if (dir === "r") { x = x + 25; }
	
	}
}