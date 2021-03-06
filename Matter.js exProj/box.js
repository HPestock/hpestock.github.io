function Box(x, y, w, h) {
  var options = {
	friction: 0.3,
	restitution: 0.1,
	slop: 0
  }
  this.body = Bodies.rectangle(x, y, w, h);
  this.w = w;
  this.h = h;
  World.add(world, this.body);
  
  this.isOffScreen = function() {
	var pos = this.body.position;
	if (pos.y > height + 100) {
	  return true;
	} else {
	  return false;
	}
  }
  
  this.removeFromWorld = function() {
	World.remove(world, this.body);
  }
  
  this.show = function() {
    var pos = this.body.position;
	var angle = this.body.angle;
	
	push();
	translate(pos.x, pos.y);
	rotate(angle);
	rectMode(CENTER);
	strokeWeight(1);
	stroke(255);
	fill(127);
	rect(0,0,this.w,this.h);
	pop();
  }
}