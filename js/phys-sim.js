const COLLISTION_DISTANCE = 4000000000 / AU;
const K = 1;
const MAX_DT = 40 * 60/2;

class Simulator {
	constructor(bodies) {
		this.bodies = bodies;
		this.dt = MAX_DT;

		this.extraV = null;

		this.bodyTails = [];
		this.count = 0;
	}

	next() {
		var minCollisionTime = Number.MAX_VALUE;
		for (var i = 0; i < this.bodies.length; i++) {
			var b1 = this.bodies[i];
			for (var j = i + 1; j < this.bodies.length; j++) {
				var b2 = this.bodies[j];
				var f = new GravForce(b1, b2);
				b1.addForce(f);
				b2.addForce(f.negate());
				
				var distance = f.distance();
				var collisionTime = distance / new Velocity(b2.velocity.x - b1.velocity.x, b2.velocity.y - b1.velocity.y).magnitude();
				if (collisionTime < minCollisionTime) {
					minCollisionTime = collisionTime;
				}
				if (distance <= COLLISTION_DISTANCE && this.count <= 0) {
					this.count++;
					b1.addCollisionBody(b2);
					b2.addCollisionBody(b1);
				}
			}
			
			if (b1.collisionBodies.length > 0) {
				var b2 = b1.collisionBodies[0];
				var velx = b1.velocity.x - (1 + K) * b2.mass / (b1.mass + b2.mass) * (b1.velocity.x - b2.velocity.x);
				var vely = b1.velocity.y - (1 + K) * b2.mass / (b1.mass + b2.mass) * (b1.velocity.y - b2.velocity.y);
				b1.collision(new Velocity(velx, vely));
			
				b1.collisionBodies = [];
			}
		}
		
		for (var i = 0; i < this.bodies.length; i++) {
			var b = this.bodies[i];
			
			if (b.collisionVelocity) {
				b.velocity = b.collisionVelocity;
				b.collisionVelocity = null;
			} else {
				var tmp = this.dt / b.mass;
				var dVx = b.force.x * tmp;
				var dvy = b.force.y * tmp;
				
				/*var dPx = dVx * this.dt;
				var dPy = dVy * this.dt;
				var dpMag = dpX * dpX + dpY * dpY;
				if (dpMag > */

				b.velocity.x += b.force.x * tmp;
				b.velocity.y += b.force.y * tmp;

				b.position.x += b.velocity.x * this.dt;
				b.position.y += b.velocity.y * this.dt;
			}
			b.force = null;
		}
		
		/*if (minCollisionTime < 100 * MAX_DT) {
			this.dt = minCollisionTime / (minCollisionTime > MAX_DT ? 100 : 4);
		} else {
			this.dt = MAX_DT;
		}
		console.log(this.dt);*/
	}

	changeVelocity(body, dv) {
	}

	tail(body) {
		if (this.bodyTails[body.bodyName] == null) {
			this.bodyTails[body.bodyName] = [];
		}
		return this.bodyTails[body.bodyName];
	}
}
