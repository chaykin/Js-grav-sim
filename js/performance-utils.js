class PerformanceTransformer {
	constructor() {
		this.lastFPSCall = performance.now();
		this.fps = 60;

		this.performanceMultiplier = 1;
		this.stepsPerFrame = 0;
		this.userTimeZoom = 0; // Пользовательское время, дней/с
	}

	calcFPS(frameCount) {
		if (frameCount % 10 == 0) {
			this.fps = 10000 / (performance.now() - this.lastFPSCall);
			this.lastFPSCall = performance.now();
		}
		return this.fps;
	}

	ajustPerformance() {
		this.performanceMultiplier *= 0.75;
		console.log("ajusted performance. Multiplier: " + this.performanceMultiplier);
	}

	transformStepsPerFrame() {
		return Math.round(this.performanceMultiplier * this.stepsPerFrame);
	}

	transformDt() {
		var stepsPerSecond = this.fps * this.transformStepsPerFrame();
		return 24 * 60 * 60 * this.userTimeZoom / stepsPerSecond;
	}

	onStart() {
		this.lastFPSCall = performance.now();
	}
}

var perfTrm = new PerformanceTransformer();
