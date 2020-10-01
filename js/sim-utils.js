muData = [];

class Orbit {
	constructor(a, e, ap, pe) {
		this.a = a;
		this.e = e;
		this.ap = ap;
		this.pe = pe;
	}
}

function calcMaxDistance(simulator) {
	var distance = 0;
	for (var i = 0; i < simulator.bodies.length - 1; i++) {
		for (var j = i + 1; j < simulator.bodies.length; j++) {
			var b1 = simulator.bodies[i];
			var b2 = simulator.bodies[j];
			var currDst = b1.distance(b2);
			if (currDst > distance) {
				distance = currDst;
			}
		}
	}
	return distance;
}

function calcMinDistance(simulator, body) {
	var distance = 1e100;
	for (var i = 0; i < simulator.bodies.length; i++) {
		var curBody = simulator.bodies[i];
		if (curBody.bodyName != body.bodyName) {
			var currDst = body.distance(curBody);
			if (currDst < distance) {
				distance = currDst;
			}
		}
	}
	return distance;
}

