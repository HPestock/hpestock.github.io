var gridsz = 700;
var mode = 1;
var sz = 23;
var start = 1;
var quicksavev = 0;
var quicksaveg = 0;
var quickload = 0;
var x = 0;
var y = 0;
var i;
var j;
var forceQuitOp = 0;
var tx;
var ty;
var edit = 1;
var thisroundhasdots;
var dotscore = {
	t: 0,
	red: 0,
	blue: 0
};
// var quickloadg = 0;
var quickloadshow = 0;
var quicksavea = [
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
// var pos = [
// 	["0", "0"],
// 	["0", "0"]
// ];
var DropType = 1;

function setup() {
createCanvas(gridsz, gridsz);
// ellipseMode(CENTER);
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
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
			if(drops[posy][posx - 1] == 0 || drops[posy][posx - 1] == 2 || drops[posy][posx - 1] == 3 ){
               posx--;
            }
		}
	} else if(key == 'd'){
		if(posx < (gridsz - sz)){
			if(drops[posy][posx + 1] == 0 || drops[posy][posx + 1] ==  2 || drops[posy][posx + 1] ==  3 ){
               posx++
            }
		}
	}
	if(key == 'w'){
		if(posy > (0)){
			if(drops[posy - 1][posx] == 0 || drops[posy - 1][posx] == 2 || drops[posy - 1][posx] == 3 ){
               posy--;
            }
		}
	} else if(key == 's'){
		if(posy < (gridsz - sz)){
			if(drops[posy + 1][posx] == 0 || drops[posy + 1][posx] == 2 || drops[posy + 1][posx] == 3 ){
               posy++;
            }
		}
	} else if(key == 'q'){
		quicksavev = 1;
	} else if(key == 'l'){
		quickload = 1;
	}
    
	if(key == "1"){
		mode = 1;
	} else if(key == "2"){
		mode = 0;
	} else if(key == "3"){
		mode = 3;
	} else if(key == "0"){
		if(edit == 1){
			edit = 0;
			quicksaveg = 0;
			quickload = 0;
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
  thisrounhasdots = 0;
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
		  } else if(mode == 3){
              drops[i][j] = 3;
			  thisroundhasdots = 1;
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
		  } else if(mode == 3){
              drops[i][j] = 3;
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
	
	if(drops[posy][posx] == 3) {
		drops[posy][posx] = 2;
		dotscore.t += 1;
		dotscore.red += 1;
	};
	
	if(drops[pos2y][pos2x] == 3) {
		drops[pos2y][pos2x] = 2;
		dotscore.t += 1;
		dotscore.blue += 1;
	};
	
	if(keyIsDown(LEFT_ARROW)){
		if(pos2x > (0)){
			if(drops[pos2y][pos2x - 1] == 0 || drops[pos2y][pos2x - 1] == 2 || drops[pos2y][pos2x - 1] == 3 ){
               pos2x--;
            }
		}
	} else if(keyIsDown(RIGHT_ARROW)){
		if(pos2x < (gridsz - sz)){
			if(drops[pos2y][pos2x + 1] == 0 || drops[pos2y][pos2x + 1] ==  2 || drops[pos2y][pos2x + 1] ==  3 ){
               pos2x++
            }
		}
	}
	if(keyIsDown(UP_ARROW)){
		if(pos2y > (0)){
			if(drops[pos2y - 1][pos2x] == 0 || drops[pos2y - 1][pos2x] == 2 || drops[pos2y - 1][pos2x] == 3 ){
               pos2y--;
            }
		}
	} else if(keyIsDown(DOWN_ARROW)){
		if(pos2y < (gridsz - sz)){
			if(drops[pos2y + 1][pos2x] == 0 || drops[pos2y + 1][pos2x] == 2 || drops[pos2y + 1][pos2x] == 3 ){
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
    stroke(0);
    fill(255);
    if(edit == 0){
        noStroke();
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
    x = 0;
    y = 0;
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
			} else if(drops[i][j] == 2) {
				fill(150);
				rect(j*(gridsz/sz), i*(gridsz/sz), (gridsz/sz), (gridsz/sz));
			} else if(drops[i][j] == 3) {
				fill(255);
				stroke(0);
				ellipse(j*(gridsz/sz)+(sz/1.5), i*(gridsz/sz)+(sz/1.5), (gridsz/sz)/2);
				if(edit == 0) {
					noStroke();
				}
            } else {
                
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
	if(edit == 1){
		if(quicksavev == 1){
			text('quick saved. ', (width/3)*2.15, (gridsz - 20));
			for(i = 0; i < sz; i++){
				for(j = 0; j < sz; j++){
					quicksavea[i][j] = drops[i][j];
				}
			}
			quicksavev = 0;
			quicksaveg = 1;
		}
		if(quicksaveg == 1){
			text('quick saved. ', (width/3)*2.15, (gridsz - 20));
		}
		if(quickload == 1){
			quickloadshow = 1;
			//text('quick loaded. ', (width/3)*2.15, (gridsz - 20));
			quicksaveg = 0;
			for(i = 0; i < sz; i++){
				for(j = 0; j < sz; j++){
					drops[i][j] = quicksavea[i][j];
				}
			}
			quickload = 0;
		}
		if(quickloadshow == 1){
			text('quick loaded. ', (width/3)*2.15, (gridsz - 20));
			if(edit == 0){
				quickload = 0;
				quickloadshow = 0;
			}
		}
	} else {
		quicksaveg = 0;
		quickloadshow = 0;
	}

}
