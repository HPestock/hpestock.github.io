let size = 60;
let cmd;
let expswap = 0;
let bkg = 256;
function setup() {
	  createCanvas(980, 385);
	  background(0);
	  fill(256);
	  stroke(255);
}

function cons() {
	cmd = prompt("");
	if (cmd === "drawOutlines.on") { stroke(0); }
	if (cmd === "drawOutlines.off") { stroke(256); }
	if (cmd === "experimental.swap.on") { expswap = 1; bkg = 0; stroke(0); }
	if (cmd === "experimental.swap.off") { expswap = 0; bkg = 256; stroke(256); }
}

function draw() {
	ellipse(mouseX, mouseY, size, size);
}
function keyPressed() {

  if (keyCode === UP_ARROW) {
    size = size + 15;
  } else if (keyCode === DOWN_ARROW) {
    size = size - 15;
  } else if (keyCode === SHIFT) {
    if (expswap === 0) { clear(0); fill(256); background(0); } else
	if (expswap === 1) { clear(256); fill(0); background(256); }

} else if (key === "1") {
	stroke(0);
} else if (key === "0") {
	stroke(255);
} else if (key === "`") {
	cons();
}

}