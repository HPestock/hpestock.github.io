// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine;
var world;
var boxes = [];
var circles = [];
var staticcir = [];
var box1sz = 20;
var cir1sz = 10;
var tri1vert = [
	{ x: 0, y: 0 },
	{ x: 10, y: 0 },
	{ x: 10, y: 10 },
];
var triangle = Bodies.fromVertices(10, 15, tri1vert);

var ground;

var eMode = "long";
var lastbutton = "left";

function setup() {
  createCanvas(960,540);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  var options = {
	  isStatic: true
  }
  ground = Bodies.rectangle(480, height - 30, width, 10, options);
  World.add(world, ground);
  World.add(world, triangle);
}

function mouseDragged() {
  if(lastbutton == "left"){
    boxes.push(new Box(mouseX, mouseY, box1sz, box1sz));
  }
}

function mousePressed() {
  if (mouseButton == LEFT) {
	  lastbutton = "left";
      if(eMode == "long") {
		boxes.push(new Box(mouseX, mouseY, 300, box1sz));
	  } else if(eMode == "reg") {
		boxes.push(new Box(mouseX, mouseY, box1sz, box1sz));
	  } else if(eMode == "r") {
		boxes.push(new Box(mouseX, mouseY, (Math.floor(Math.random() * 31)), (Math.floor(Math.random() * 31))));
	  } else if(eMode == "c1") {
		circles.push(new Circle(mouseX, mouseY, cir1sz));
	  }
    }
    if (mouseButton == RIGHT) {
      lastbutton = "right";
	  eMode = (prompt("long = 300 * 20, reg = 20 * 20, r = random betweem 0 and 31"));
    }
	if (mouseButton == CENTER) {
      lastbutton = "middle";
	  staticcir.push(new SC(mouseX, mouseY, cir1sz));
    }
  }

function draw() {
  background(51);
  for (var i = 0; i < boxes.length; i++) {
	boxes[i].show();
	if(boxes[i].isOffScreen()) {
	  boxes[1].removeFromWorld();
	  boxes.splice(i, 1);
	  i--;
	}
  }
  for (var i = 0; i < circles.length; i++) {
	circles[i].show();
	if(circles[i].isOffScreen()) {
	  circles[1].removeFromWorld();
	  circles.splice(i, 1);
	  i--;
	}
  }
  for (var i = 0; i < staticcir.length; i++) {
	staticcir[i].show();
  }
  fill(170);
  noStroke(255);
  strokeWeight(4);
  rectMode(CENTER);
  ellipseMode(CENTER);
  rect(ground.position.x, ground.position.y + 0, width, 10);
}
