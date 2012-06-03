
function roundRectAdv(ctx, x, y, width, height, radius_top_left, radius_top_right, radius_bottom_right, radius_bottom_left,  fill, stroke) {
	if (typeof stroke == "undefined" ) {
		stroke = false;
	}
	if (typeof radius === "undefined") {
		radius = 0;
	}
	ctx.beginPath();
	ctx.moveTo(x + radius_top_left, y);
	ctx.lineTo(x + width - radius_top_right, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius_top_right);
	ctx.lineTo(x + width, y + height - radius_bottom_right);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius_bottom_right, y + height);
	ctx.lineTo(x + radius_bottom_left, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius_bottom_left);
	ctx.lineTo(x, y + radius_top_left);
	ctx.quadraticCurveTo(x, y, x + radius_top_left, y);
	ctx.closePath();
	if (stroke) {
		ctx.stroke();
	}
	if (fill) {
		ctx.fill();
	}
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
	roundRectAdv(ctx, x, y, width, height, radius, radius, radius, radius,  fill, stroke);
}
