function getBorderColor(color) {
	return subtractColors(color, "#202020");
}

function drawBody(body) {
	var pos = canvasTransformer.transform(body.position);
	ctx.beginPath();
	ctx.arc(pos.x, pos.y, body.radius, 0, Math.PI * 2, false);
	ctx.closePath();

	ctx.fillStyle = body.color;
	ctx.fill();

	ctx.lineWidth = 1;
	ctx.strokeStyle = getBorderColor(body.color);
	ctx.stroke();

	drawTail(body);
}

function drawLink(body1, body2) {
	var pos1 = canvasTransformer.transform(body1.position);
	var pos2 = canvasTransformer.transform(body2.position);

	ctx.beginPath();
	ctx.moveTo(pos1.x, pos1.y);
	ctx.lineTo(pos2.x, pos2.y);
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#F8F8F8";
	ctx.stroke();
}

function drawTail(body) {
	var bodyTail = simulator.tail(body);
	if (bodyTail.length > 2) {
		var pos0 = canvasTransformer.transformTail(body, 0);
		ctx.beginPath();
		ctx.moveTo(pos0.x, pos0.y);

		for (i = 1; i < bodyTail.length - 2; i++) {
			var posi = canvasTransformer.transformTail(body, i);
			var posii = canvasTransformer.transformTail(body, i + 1);
			var xc = (posi.x + posii.x) / 2;
			var yc = (posi.y + posii.y) / 2;
			ctx.quadraticCurveTo(posi.x, posi.y, xc, yc);
		}

		var posi = canvasTransformer.transformTail(body, i);
		var posii = canvasTransformer.transformTail(body, i + 1);

		ctx.quadraticCurveTo(posi.x, posi.y, posii.x, posii.y);
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#059999";
		ctx.stroke();
	}	
}

class CanvasTransformer {
	constructor(cnv) {
		this.cnv = cnv;

		this.zoom = 0;
		this.translateX = 0;
		this.translateY = 0;

		this.targetBody = null;
	}

	calcZoom(maxDst) {
		var cnvWidth = this.cnv.width;
		var cnvHeight = this.cnv.height;
		var minD = 0.9 * (Math.min(cnvWidth, cnvHeight) / 2);
		return minD / maxDst;
	}

	focusTarget(body) {
		this.targetBody = body;
		this.zoom = this.calcZoom(calcMinDistance(simulator, body));
		
	}

	focusFromRefTarget(body) {
		this.targetBody = body;
		if (body.refBody != null) {
			this.zoom = this.calcZoom(body.distance(body.refBody));
		} else {
			this.zoom = this.calcZoom(calcMaxDistance(simulator));
		}
	}

	transform(pos) {
		if (this.targetBody != null) {
			this.translateX = cnv.width / 2.0 - this.zoom * this.targetBody.position.x;
			this.translateY = cnv.height / 2.0 - this.zoom * this.targetBody.position.y;
		}
		return new Position(this.zoom * pos.x + this.translateX, this.zoom * pos.y + this.translateY);
	}

	transformTail(body, i) {
		var bodyTail = simulator.tail(body);
		if (this.targetBody != null) {
			var targetBodyTail = simulator.tail(this.targetBody);

			this.translateX = cnv.width / 2.0 - this.zoom * targetBodyTail[i].x;
			this.translateY = cnv.height / 2.0 - this.zoom * targetBodyTail[i].y;
		}
		return new Position(this.zoom * bodyTail[i].x + this.translateX, this.zoom * bodyTail[i].y + this.translateY);
	}
}
