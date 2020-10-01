class Body {
	constructor(bodyName, mass, radius, color, pos, vel) {
		this.bodyName = bodyName;
		this.mass = mass;
		this.radius = radius;
		this.color = color;
		this.position = pos;
		this.velocity = vel;

		this.force = null;
		
		this.collisionBodies = [];
		this.collisionVelocity = null;
	}

	distance(body) {
		return this.position.distance(body.position);
	}

	addForce(force) {
		if (this.force === null) {
			this.force = force;
		} else {
			this.force.x += force.x;
			this.force.y += force.y; 
		}
	}

	addCollisionBody(body) {
		this.collisionBodies.push(body);
	}
	
	collision(velocity) {
		this.collisionVelocity = velocity;
	}
}
