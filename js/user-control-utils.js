function initControls() {
	$("focusSelect").value = "star";
	$("timeSelect").value = "1";
}

function addWheelListener() {
	$("content").addEventListener("wheel", function(e) {
		e = e || window.event;
		var delta = e.deltaY || e.detail || e.wheelDelta;
		zoom(delta > 0 ? -5 : 5);
	});
}

function onBodyFocusChanged(tag) {
	var value = getSelectValue(tag);
	if (value === "star") {
		canvasTransformer.focusFromRefTarget(star);
	} else if (value === "planetA") {
		canvasTransformer.focusFromRefTarget(planetA);
	} else if (value === "planetB") {
		canvasTransformer.focusFromRefTarget(planetB);
	} else if (value === "planetC") {
		canvasTransformer.focusFromRefTarget(planetC);
	}
}

function onTimeChanged(tag) {
	var value = getSelectValue(tag);
	perfTrm.userTimeZoom = parseInt(value);
}

function zoom(value) {
	var dZoom = zoomData[this.canvasTransformer.targetBody.bodyName] * value / 100.0;
	while (this.canvasTransformer.zoom <= Math.abs(2 * dZoom)) {
		dZoom /= 2;
	}
	this.canvasTransformer.zoom += dZoom;
	if (this.canvasTransformer.zoom < 10) {
		this.canvasTransformer.zoom = 10;
	}
}

function changeVelocity(valPercent) {
	var planet = null;
	var velocity = null;
	var value = $("forceForPlanet").options[$("forceForPlanet").selectedIndex].value;
	if (value === "planetA") {
		planet = planetA;
		velocity = Vaupa;
	} else if (value === "planetB") {
		planet = planetB;
		velocity = Vaupb;
	} else if (value === "planetC") {
		planet = planetC;
		velocity = Vaupc;
	}

	simulator.changeVelocity(planet, velocity * valPercent / 100.0);
}

function startSim() {
	stop = false;
	hideTag("startSimBtn");
	inlineTag("stopSimBtn");

	cnv.width = cnv.offsetWidth;
	cnv.height = cnv.offsetHeight;

	perfTrm.onStart();
	drawScene();
}

function stopSim() {
	stop = true;
	inlineTag("startSimBtn");
	hideTag("stopSimBtn");
}
