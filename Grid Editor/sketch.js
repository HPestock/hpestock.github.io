var gridsz = 1400;
var mode = 1;
var sz = 23;
var x = 0;
var y = 0;
var i;
var j;
var forceQuitOp = 0;
var tx;
var ty;
var edit = 1;
var drops = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var posx = 2;
var posy = 1;
var pos2x = 2;
var pos2y = 1;
var pos = [
	["0", "0"],
	["2", "2"]
];
var DropType = 1;

function setup() {
createCanvas(gridsz, gridsz);
background(150);
fill(255);
for(i = 0; i < sz; i++) {
for(j = 0; j < sz; j++) {
x = j*(gridsz/sz);
y = i*(gridsz/sz);
rect(x, y, (gridsz/sz), (gridsz/sz));
}
}
}

function resetup(){
background(150);
fill(255);
for(i = 0; i < sz; i++) {
for(j = 0; j < sz; j++) {
x = j*(gridsz/sz);
y = i*(gridsz/sz);
rect(x, y, (gridsz/sz), (gridsz/sz));
}
}	
drops = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
}

function keyPressed() {
    if(key == 'a'){
		if(posx > (0)){
			if(drops[posy][posx - 1] == 0 || drops[posy][posx - 1] == 2){
               posx--;
            }
		}
	} else if(key == 'd'){
		if(posx < (gridsz - sz)){
			if(drops[posy][posx + 1] == 0 || drops[posy][posx + 1] ==  2){
               posx++
            }
		}
	}
	if(key == 'w'){
		if(posy > (0)){
			if(drops[posy - 1][posx] == 0 || drops[posy - 1][posx] == 2){
               posy--;
            }
		}
	} else if(key == 's'){
		if(posy < (gridsz - sz)){
			if(drops[posy + 1][posx] == 0 || drops[posy + 1][posx] == 2){
               posy++;
            }
		}
	}
    
	if(key == "1"){
		mode = 1;
	} else if(key == "2"){
		mode = 0;
	} else if(key == "0"){
		if(edit == 1){
			edit = 0;
		} else if(edit == 0){
			edit = 1;
		}
	} else if(key == "r" && edit == 1){
		resetup();
	}
}

function mouseDragged() {
  if(edit == 1){
	  tx = mouseX - (gridsz/sz);
  ty = mouseY - (gridsz/sz);
  for(i = 0; i < sz; i++) {
    for(j = 0; j < sz; j++) {
      if(forceQuitOp == 0){
        if(((j*(gridsz/sz)) > tx) && ((j*(gridsz/sz)) < (tx + (gridsz/sz)))){
        if(((i*(gridsz/sz)) > ty) && ((i*(gridsz/sz)) < (ty + (gridsz/sz)))){
          x = j*(gridsz/sz);
          y = i*(gridsz/sz);
          fill(1);
		  if(mode == 1){
			  drops[i][j] = 1;
		  } else if(mode == 0){
			  drops[i][j] = 2;
		  }
		  // rect(x, y, (gridsz/sz), (gridsz/sz));
          // alert(x/(gridsz/sz));
          // alert(y/(gridsz/sz));
          forceQuitOp = 1;
          }
        }
      }
    }
  }
  forceQuitOp = 0;
  }
}

function mousePressed() {
  if(edit == 1){
	  tx = mouseX - (gridsz/sz);
  ty = mouseY - (gridsz/sz);
  for(i = 0; i < sz; i++) {
    for(j = 0; j < sz; j++) {
      if(forceQuitOp == 0){
        if(((j*(gridsz/sz)) > tx) && ((j*(gridsz/sz)) < (tx + (gridsz/sz)))){
        if(((i*(gridsz/sz)) > ty) && ((i*(gridsz/sz)) < (ty + (gridsz/sz)))){
          x = j*(gridsz/sz);
          y = i*(gridsz/sz);
          fill(1);
		  if(mode == 1){
			  drops[i][j] = 1;
		  } else if(mode == 0){
			  drops[i][j] = 2;
		  }
		  // rect(x, y, (gridsz/sz), (gridsz/sz));
          // alert(x/(gridsz/sz));
          // alert(y/(gridsz/sz));
          forceQuitOp = 1;
          }
        }
      }
    }
  }
  forceQuitOp = 0;
  }
}

function draw() {
	
	if(keyIsDown(LEFT_ARROW)){
		if(pos2x > (0)){
			if(drops[pos2y][pos2x - 1] == 0 || drops[pos2y][pos2x - 1] == 2){
               pos2x--;
            }
		}
	} else if(keyIsDown(RIGHT_ARROW)){
		if(pos2x < (gridsz - sz)){
			if(drops[pos2y][pos2x + 1] == 0 || drops[pos2y][pos2x + 1] ==  2){
               pos2x++
            }
		}
	}
	if(keyIsDown(UP_ARROW)){
		if(pos2y > (0)){
			if(drops[pos2y - 1][pos2x] == 0 || drops[pos2y - 1][pos2x] == 2){
               pos2y--;
            }
		}
	} else if(keyIsDown(DOWN_ARROW)){
		if(pos2y < (gridsz - sz)){
			if(drops[pos2y + 1][pos2x] == 0 || drops[pos2y + 1][pos2x] == 2){
               pos2y++;
            }
		}
	}
	if(edit == 1){
		stroke(0);
		fill(0, 255, 5);
		textSize(32);
		text('edit mode', (width/3)*2, 10);
	} else if(edit == 0){
		noStroke();
	}
	fill(255, 255, 0);
	for(i = 0; i < (gridsz/sz); i++){
		for(j = 0; j < (gridsz/sz); j++){
			if(j == 1) {
				x = i;
			}
			y = j;
			x = (gridsz/sz)*x;
			y = (gridsz/sz)*y;
			rect(x, y, (gridsz/sz), (gridsz/sz));
		}
	}
	if(posx > (sz - 1)){
		posx--
	}
	if(posy > (sz - 1)){
		posy--
	}
	if(pos2x > (sz - 1)){
		pos2x--
	}
	if(pos2y > (sz - 1)){
		pos2y--
	}
	background(150);
	fill(150);
	x = 0;
	y = 0;
	for(i = 0; i < (gridsz/sz); i++) {
		for(j = 0; j < (gridsz/sz); j++) {
			y = i;
			x = j;
			x = (gridsz/sz)*x;
			y = (gridsz/sz)*y;
			rect(x, y, (gridsz/sz), (gridsz/sz));
		}
	}
	fill(255);
	for(i = 0; i < 2; i++) {
		for(j = 0; j < 3; j++) {
			y = i;
			x = pos[i][j];
			x = (gridsz/sz)*x;
			y = (gridsz/sz)*y;
			rect(x, y, (gridsz/sz), (gridsz/sz));
		}
	}
	for(i = 0; i < sz; i++) {
		for(j = 0; j < sz; j++) {
			if(drops[i][j] == 1) {
				fill(255, 255, 0);
				rect(j*(gridsz/sz), i*(gridsz/sz), (gridsz/sz), (gridsz/sz));
			}
			if(drops[i][j] == 2) {
				fill(150);
				rect(j*(gridsz/sz), i*(gridsz/sz), (gridsz/sz), (gridsz/sz));
			}
		}
	}
	fill(0, 0, 255);
	rect((gridsz/sz)*pos2x, (gridsz/sz)*pos2y, (gridsz/sz), (gridsz/sz));
	fill(255, 0, 0);
	rect((gridsz/sz)*posx, (gridsz/sz)*posy, (gridsz/sz), (gridsz/sz));
    
    if(edit == 1){
		fill(0, 255, 5);
		textSize(32);
		text('edit mode', (width/3)*2.15, 30);
	}

}
