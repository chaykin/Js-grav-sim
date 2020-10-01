class Simulator {
	constructor(bodies) {
		this.bodies = bodies;
		this.time = 0; // Время в днях

		this.extraBody = null;
		this.extraV = null;

		this.bodyTails = [];
		this.tickCount = 0;
	}

	next() {
		var dt = perfTrm.transformDt();

		if (this.extraBody != null && this.extraV != null) {
			var vel = calcRelativeVelocity(this.extraBody);
			var vMag = vel.magnitude();
			this.extraBody.velocity.x += vel.x / vMag * this.extraV;
			this.extraBody.velocity.y += vel.y / vMag * this.extraV;

			this.extraBody = null;
			this.extraV = null;
		}

		for (var i = 0; i < this.bodies.length - 1; i++) {
			var b1 = this.bodies[i];
			for (var j = i + 1; j < this.bodies.length; j++) {
				var b2 = this.bodies[j];
				var f = new GravForce(b1, b2);
				b1.addForce(f);
				b2.addForce(f.negate());
			}
		}

		for (var i = 0; i < this.bodies.length; i++) {
			var b = this.bodies[i];
			var tmp = dt / b.mass;

			b.velocity.x += b.force.x * tmp;
			b.velocity.y += b.force.y * tmp;

			b.position.x += b.velocity.x * dt;
			b.position.y += b.velocity.y * dt;
			b.force = null;

			if (this.tickCount % (2 * perfTrm.transformStepsPerFrame()) == 0) {
				if (this.bodyTails[b.bodyName].length >= 2048) {
					this.bodyTails[b.bodyName].shift();
				}
				this.bodyTails[b.bodyName].push(new Position(b.position.x, b.position.y));
			}
		}
		this.tickCount++;
		this.time += (dt / 60 / 60 / 24);
	}

	changeVelocity(body, dv) {
		this.extraBody = body;
		this.extraV = dv;
	}

	tail(body) {
		if (this.bodyTails[body.bodyName] == null) {
			this.bodyTails[body.bodyName] = [];
		}
		return this.bodyTails[body.bodyName];
	}
}
