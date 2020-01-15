let s = 50;
let x = 50;
let y = 50;
let mode = 1;
let show = 0;

function setup() {
	  createCanvas(1515, 745);
	  fill(150);
	  stroke(90);
}

function draw() {
	rect(x, y, 50, 50);
}

function keyPressed() {

  if (keyCode === UP_ARROW) {
    y = y - 50;
  } else if (keyCode === DOWN_ARROW) {
    y = y + 50;
  } else if (keyCode === LEFT_ARROW) {
    x = x - 50;  
} else if (keyCode === RIGHT_ARROW) {
	x = x + 50;
} else if (key === "`") {
	alert(x +", "+ y);
} else if (key === " ") {
    if (mode === 0) { fill(256); mode = 1; } else
    if (mode === 1) { fill(150); mode = 0; }
} else if (key === "r") { x = 50; y = 50; clear(); }
    else if (key === "s") { 
        if (show === 0) { fill(256, 0, 0); show = 1; } else 
        if (show === 1) { show = 0; if (mode === 1) { fill(256); } else if (mode === 0) { fill(150); } }
    } else if (key === "g") { 
        if (show === 0) { fill(0, 256, 0); show = 1; } else 
        if (show === 1) { show = 0; if (mode === 1) { fill(256); } else if (mode === 0) { fill(150); } }
    } else if (key === "b") { 
        if (show === 0) { fill(0, 0, 256); show = 1; } else 
        if (show === 1) { show = 0; if (mode === 1) { fill(256); } else if (mode === 0) { fill(150); } }
    }

}