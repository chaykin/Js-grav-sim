class Position {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	distance(pos) {
		var xDst = this.x - pos.x;
		var yDst = this.y - pos.y;
		return Math.sqrt(xDst * xDst + yDst * yDst);
	}
}

class Velocity {
	constructor(vx, vy) {
		this.x = vx;
		this.y = vy;
	}

	magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
}

class GravForceLight {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

//Сила, действующая на первое тело со стороны второго
class GravForce {
	constructor(body1, body2) {
		this.body1 = body1;
		this.body2 = body2;

		this.mag = null;
		this.r = null;

		this.mag = this.magnitude();
		
		var dx = body2.position.x - body1.position.x;
		var dy = body2.position.y - body1.position.y;
		this.x = dx / this.r * this.mag;
		this.y = dy / this.r * this.mag;
		
	}

	magnitude() {
		if (this.mag === null) {
			this.r = this.body1.distance(this.body2);
			this.mag =  G * this.body1.mass * this.body2.mass / this.r / this.r; 
		}
		return this.mag;
	}
	
	distance() {
		if (this.r === null) {
			this.magnitude();
		}
		return this.r;
	}

	negate() {
		return new GravForceLight(-this.x, -this.y);
	}
}
