function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

function subtractColors(color1, color2) {
	rgb1 = hexToRgb(color1);
	rgb2 = hexToRgb(color2);
	return rgbToHex(rgb1.r - rgb2.r, rgb1.g - rgb2.g, rgb1.b - rgb2.b);
}
