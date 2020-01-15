let size = 90;
function setup() {
	  createCanvas(1532, 750);
	  background(0);
	  fill(256);
	  alert("MY GAME BASIC EXAMPLE");
}
function draw() {
	ellipse(mouseX, mouseY, size, size);
}
function keyPressed() {

  if (keyCode === UP_ARROW) {
    size = size + 15;
  } else if (keyCode === DOWN_ARROW) {
    size = size - 15;
  }
}