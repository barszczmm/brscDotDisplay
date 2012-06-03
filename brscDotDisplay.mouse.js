// requires jQuery

brscDotDisplay.prototype.onMouseClick = function(row, column) {
	//console.log('[click] row: ' + row + ', column: ' + column);
}

brscDotDisplay.prototype.onMouseMove = function(row, column) {
	//console.log('[move] row: ' + row + ', column: ' + column);
}

brscDotDisplay.prototype.onMouseEnter = function() {
	//console.log('[enter display]');
}

brscDotDisplay.prototype.onMouseLeave = function() {
	//console.log('[leave display]');
}

brscDotDisplay.prototype.detectMouse = function() {

	var selfobject = this,
		$display = $(this.display);

	function getRowPosition(e) {
		return Math.floor((e.pageY - $display.offset().top) / (selfobject.height + selfobject.space));
	}

	function getColumnPosition(e) {
		return Math.floor((e.pageX - $display.offset().left) / (selfobject.width + selfobject.space));
	}

	$display.click(
		function(e) {
			selfobject.onMouseClick(getRowPosition(e), getColumnPosition(e));
		}
	).mousemove(
		function(e) {
			selfobject.onMouseMove(getRowPosition(e), getColumnPosition(e));
		}
	).mouseenter(
		function(e) {
			selfobject.onMouseEnter();
		}
	).mouseleave(
		function(e) {
			selfobject.onMouseLeave();
		}
	);
};
