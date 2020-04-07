function SC(x, y, r) {
  var options = {
	friction: 0.3,
	restitution: 0.1,
	slop: 0,
	isStatic: true
  }
  this.body = Bodies.circle(x, y, r);
  this.r = r;
  this.body.isStatic = true;
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
	ellipseMode(CENTER);
	strokeWeight(1);
	stroke(255);
	fill(127);
	ellipse(0,0,this.r*2);
	pop();
  }
}