function brscDotDisplay(container, rows, columns, dot_width, dot_height, space_between_dots, dot_default_color, dot_corner_radius, display_corner_radius) {

	var current_map = [],
		selfobject = this;

	this.display_bg = document.createElement('canvas');
	this.display = document.createElement('canvas');

	this.bg_ctx = this.display_bg.getContext('2d');
	this.ctx = this.display.getContext('2d');

	this.display_bg.setAttribute('id', 'brscDotDisplayBg');
	this.display_bg.style.position = 'absolute';
	this.display_bg.style.top = 0;
	this.display_bg.style.left = 0;
	this.display.setAttribute('id', 'brscDotDisplay');
	this.display.style.position = 'relative';

	container.style.position = 'relative';
	container.appendChild(this.display_bg);
	container.appendChild(this.display);



	// -------------------------- //
	//    helpers                 //
	// -------------------------- //
	function callCallback(callback) {
		if (callback) {
			callback.call();
		}
	}


	// ------------------------- //
	//    bg helper functions    //
	// ------------------------- //

	this.clearBg = function() {
		this.bg_ctx.clearRect(0, 0, this.columns*(this.width+this.space), this.rows*(this.height+this.space));
	}

	this.drawBg = function() {
		this.clearBg();
		this.bg_ctx.fillStyle = this.color;
		for (var row=0; row < this.rows; row++) {
			for (var column=0; column < this.columns; column++) {
				//bg_ctx.fillRect(column*(this.width+this.space), row*(this.height+this.space), this.width, this.height);
				if (row == 0 && column == 0) {
					roundRectAdv(this.bg_ctx, column*(this.width+this.space), row*(this.height+this.space), this.width, this.height, this.canvas_radius, this.radius, this.radius, this.radius, true, false);
				} else if (row == 0 && column == this.columns - 1) {
					roundRectAdv(this.bg_ctx, column*(this.width+this.space), row*(this.height+this.space), this.width, this.height, this.radius, this.canvas_radius, this.radius, this.radius, true, false);
				} else if (row == this.rows - 1 && column == this.columns - 1) {
					roundRectAdv(this.bg_ctx, column*(this.width+this.space), row*(this.height+this.space), this.width, this.height, this.radius, this.radius, this.canvas_radius, this.radius, true, false);
				} else if (row == this.rows - 1 && column == 0) {
					roundRectAdv(this.bg_ctx, column*(this.width+this.space), row*(this.height+this.space), this.width, this.height, this.radius, this.radius, this.radius, this.canvas_radius, true, false);
				} else {
					roundRect(this.bg_ctx, column*(this.width+this.space), row*(this.height+this.space), this.width, this.height, this.radius, true, false);
				}
			}
		}
	}

	this.animateBgDot = function(row, column) {
		var frame = 0,
			interval = setInterval(
			function() {
				selfobject.bg_ctx.clearRect(column*(selfobject.width+selfobject.space), row*(selfobject.height+selfobject.space), selfobject.width, selfobject.height);
				selfobject.bg_ctx.fillRect(column*(selfobject.width+selfobject.space) + (10-frame)/2, row*(selfobject.height+selfobject.space) + (10-frame)/2, frame, frame);
				frame++;
				if (frame > 10) {
					clearInterval(interval);
					selfobject.bg_ctx.clearRect(column*(selfobject.width+selfobject.space), row*(selfobject.height+selfobject.space), selfobject.width, selfobject.height);
					if (row == 0 && column == 0) {
						roundRectAdv(selfobject.bg_ctx, column*(selfobject.width+selfobject.space), row*(selfobject.height+selfobject.space), selfobject.width, selfobject.height, selfobject.canvas_radius, selfobject.radius, selfobject.radius, selfobject.radius, true, false);
					} else if (row == 0 && column == selfobject.columns - 1) {
						roundRectAdv(selfobject.bg_ctx, column*(selfobject.width+selfobject.space), row*(selfobject.height+selfobject.space), selfobject.width, selfobject.height, selfobject.radius, selfobject.canvas_radius, selfobject.radius, selfobject.radius, true, false);
					} else if (row == selfobject.rows - 1 && column == selfobject.columns - 1) {
						roundRectAdv(selfobject.bg_ctx, column*(selfobject.width+selfobject.space), row*(selfobject.height+selfobject.space), selfobject.width, selfobject.height, selfobject.radius, selfobject.radius, selfobject.canvas_radius, selfobject.radius, true, false);
					} else if (row == selfobject.rows - 1 && column == 0) {
						roundRectAdv(selfobject.bg_ctx, column*(selfobject.width+selfobject.space), row*(selfobject.height+selfobject.space), selfobject.width, selfobject.height, selfobject.radius, selfobject.radius, selfobject.radius, selfobject.canvas_radius, true, false);
					} else {
						roundRect(selfobject.bg_ctx, column*(selfobject.width+selfobject.space), row*(selfobject.height+selfobject.space), selfobject.width, selfobject.height, selfobject.radius, true, false);
					}
				}
			},
			50
		);
	}

	this.showBg = function(callback) {
		this.clearBg();
		this.bg_ctx.fillStyle = this.color;

		var map = [],
			dots,
			row,
			column,
			interval;

		for (var row=0; row < this.rows; row++) {
			map[row] = [];
			for (var column=0; column < this.columns; column++) {
				map[row][column] = false;
			}
		}

		function checkSpace() {
			var has_space = false;
			for (var row=0; row < map.length; row++) {
				if (has_space) {
					break;
				}
				for (var column=0; column < map[0].length; column++) {
					if (!map[row][column]) {
						has_space = true;
						break;
					}
				}
			}
			return has_space;
		}

		interval = setInterval(
			function() {
				dots = Math.floor(Math.random()*40) + 1;
				for (var dot=0; dot<dots; dot++) {
					row = Math.floor(Math.random()*selfobject.rows);
					column = Math.floor(Math.random()*selfobject.columns);
					while(map[row][column]) {
						row = Math.floor(Math.random()*selfobject.rows);
						column = Math.floor(Math.random()*selfobject.columns);
					}
					map[row][column] = true;
					selfobject.animateBgDot(row, column);
					if (!checkSpace()) {
						clearInterval(interval);
						setTimeout(
							function() {
								callCallback(callback);
							},
							500
						);
						return;
					}
				}
			},
			100
		);

	}

	// ------------------------------ //
	//    drawing helper functions    //
	// ------------------------------ //

	this.activateDot = function(row, column, color) {
		this.ctx.clearRect(column*(this.width+this.space), row*(this.height+this.space), this.width, this.height);
		this.ctx.fillStyle = color;

		if (row == 0 && column == 0) {
			roundRectAdv(this.ctx, column*(this.width+this.space), row*(this.height+this.space), this.width, this.height, this.canvas_radius, this.radius, this.radius, this.radius, true, false);
		} else if (row == 0 && column == this.columns - 1) {
			roundRectAdv(this.ctx, column*(this.width+this.space), row*(this.height+this.space), this.width, this.height, this.radius, this.canvas_radius, this.radius, this.radius, true, false);
		} else if (row == this.rows - 1 && column == this.columns - 1) {
			roundRectAdv(this.ctx, column*(this.width+this.space), row*(this.height+this.space), this.width, this.height, this.radius, this.radius, this.canvas_radius, this.radius, true, false);
		} else if (row == this.rows - 1 && column == 0) {
			roundRectAdv(this.ctx, column*(this.width+this.space), row*(this.height+this.space), this.width, this.height, this.radius, this.radius, this.radius, this.canvas_radius, true, false);
		} else {
			roundRect(this.ctx, column*(this.width+this.space), row*(this.height+this.space), this.width, this.height, this.radius, true, false);
		}
	}

	this.animateDot = function(row, column, color) {
		this.ctx.fillStyle = color;
		var frame = 0,
			interval = setInterval(
			function() {
				selfobject.ctx.clearRect(column*(selfobject.width+selfobject.space), row*(selfobject.height+selfobject.space), selfobject.width, selfobject.height);
				selfobject.ctx.fillRect(column*(selfobject.width+selfobject.space) + (10-frame)/2, row*(selfobject.height+selfobject.space) + (10-frame)/2, frame, frame);
				frame++;
				if (frame > 10) {
					clearInterval(interval);
					selfobject.ctx.clearRect(column*(selfobject.width+selfobject.space), row*(selfobject.height+selfobject.space), selfobject.width, selfobject.height);
					if (row == 0 && column == 0) {
						roundRectAdv(selfobject.ctx, column*(selfobject.width+selfobject.space), row*(selfobject.height+selfobject.space), selfobject.width, selfobject.height, selfobject.canvas_radius, selfobject.radius, selfobject.radius, selfobject.radius, true, false);
					} else if (row == 0 && column == selfobject.columns - 1) {
						roundRectAdv(selfobject.ctx, column*(selfobject.width+selfobject.space), row*(selfobject.height+selfobject.space), selfobject.width, selfobject.height, selfobject.radius, selfobject.canvas_radius, selfobject.radius, selfobject.radius, true, false);
					} else if (row == selfobject.rows - 1 && column == selfobject.columns - 1) {
						roundRectAdv(selfobject.ctx, column*(selfobject.width+selfobject.space), row*(selfobject.height+selfobject.space), selfobject.width, selfobject.height, selfobject.radius, selfobject.radius, selfobject.canvas_radius, selfobject.radius, true, false);
					} else if (row == selfobject.rows - 1 && column == 0) {
						roundRectAdv(selfobject.ctx, column*(selfobject.width+selfobject.space), row*(selfobject.height+selfobject.space), selfobject.width, selfobject.height, selfobject.radius, selfobject.radius, selfobject.radius, selfobject.canvas_radius, true, false);
					} else {
						roundRect(selfobject.ctx, column*(selfobject.width+selfobject.space), row*(selfobject.height+selfobject.space), selfobject.width, selfobject.height, selfobject.radius, true, false);
					}
				}
			},
			50
		);
	}

	this.clearDot = function(row, column) {
		this.activateDot(row, column, this.color);
	}

	this.deleteDot = function(row, column) {
		this.ctx.clearRect(column*(this.width+this.space), row*(this.height+this.space), this.width, this.height);
	}

	this.clearDisplay = function() {
		this.ctx.clearRect(0, 0, this.columns*(this.width+this.space), this.rows*(this.height+this.space));
		// for (var row=0; row < this.rows; row++) {
			// for (var column=0; column < this.columns; column++) {
				// this.clearDot(row, column);
			// }
		// }
	}

	// ----------------------- //
	//    drawing functions    //
	// ----------------------- //

	// draw
	this.drawFromMap = function(map) {
		this.clearDisplay();
		for (var row=0; row<map.length; row++) {
			for (var column=0; column<map[row].length; column++) {
				if (map[row][column] != '') {
					this.activateDot(row, column, map[row][column]);
				}
			}
		}
		current_map = map.slice();
	}

	// animate
	this.animateFromMap = function(map, frame_delay, callback) {
		var frame = 0,
			interval = setInterval(
			function() {
				selfobject.drawFromMap(map[frame]);
				frame++;
				if (frame >= map.length) {
					clearInterval(interval);
					callCallback(callback);
				}
			},
			frame_delay
		);
	}


	// ------------------------- //
	//    scrolling functions    //
	// ------------------------- //

	// scroll out
	this.scrollMapOut = function(mapOrg, frame_delay, direction, callback) {

		var frame = 0,
			frames = 0,
			interval
			map = mapOrg.slice();

		if (direction == 'up') {

			frames = map.length;

			interval = setInterval(
				function() {
					selfobject.drawFromMap(map);
					frame++;
					map = map.slice(1);
					if (frame > frames) {
						clearInterval(interval);
						callCallback(callback);
					}
				},
				frame_delay
			);

		} else if (direction == 'down') {

			// TODO

		} else if (direction == 'right') {

			frames = this.columns;

			for (var row=0; row<map.length; row++) {
				map[row] = map[row].slice();
			}

			interval = setInterval(
				function() {
					selfobject.drawFromMap(map);
					frame++;
					for (var row=0; row<map.length; row++) {
						map[row] = [''].concat(map[row]);
					}
					if (frame > frames) {
						clearInterval(interval);
						callCallback(callback);
					}
				},
				frame_delay
			);


		} else { // left

			frames = map[0].length;

			interval = setInterval(
				function() {
					selfobject.drawFromMap(map);
					frame++;
					for (var row=0; row<map.length; row++) {
						map[row] = map[row].slice(1);
					}
					if (frame > frames) {
						clearInterval(interval);
						callCallback(callback);
					}
				},
				frame_delay
			);

		}

		return frames;
	}

	// scroll in
	this.scrollMapIn = function(mapOrg, frame_delay, direction, callback) {

		var frame = 0,
			frames = 0,
			interval
			map = [];

		if (direction == 'up') {

			// TODO

		} else if (direction == 'down') {

			// TODO

		} else if (direction == 'right') {

			frames = mapOrg[0].length;

			interval = setInterval(
				function() {
					for (var row=0; row<mapOrg.length; row++) {
						map[row] = mapOrg[row].slice(mapOrg[0].length-1-frame);
					}
					frame++;
					selfobject.drawFromMap(map);
					if (frame >= frames) {
						clearInterval(interval);
						callCallback(callback);
					}
				},
				frame_delay
			);

		} else { // left

			frames = this.columns;

			for (var row=0; row<mapOrg.length; row++) {
				map[row] = [];
				for (var column=0; column<this.columns; column++) {
					map[row][column] = '';
				}
				map[row] = map[row].concat(mapOrg[row]);
			}

			interval = setInterval(
				function() {
					selfobject.drawFromMap(map);
					for (var row=0; row<mapOrg.length; row++) {
						map[row] = map[row].slice(1);
					}
					frame++;

					if (frame > frames) {
						clearInterval(interval);
						callCallback(callback);
					}
				},
				frame_delay
			);

		}

		return frames;
	}

	// scroll through
	this.scrollMapThrough = function(mapOrg, frame_delay, direction, callback) {

		var frame = 0,
			frames = 0,
			interval,
			map = [];

		if (direction == 'up') {

			// TODO

		} else if (direction == 'down') {

			// TODO

		} else if (direction == 'right') {

			frames = mapOrg[0].length + this.columns;

			interval = setInterval(
				function() {
					for (var row=0; row<mapOrg.length; row++) {
						if (frame < mapOrg[0].length) {
							map[row] = mapOrg[row].slice(mapOrg[0].length-1-frame);
						} else {
							map[row] = [''].concat(map[row]);
						}
					}
					frame++;
					selfobject.drawFromMap(map);

					if (frame > frames) {
						clearInterval(interval);
						callCallback(callback);
					}
				},
				frame_delay
			);

		} else { // left

			for (var row=0; row<mapOrg.length; row++) {
				map[row] = [];
				for (var column=0; column<this.columns; column++) {
					map[row][column] = '';
				}
				map[row] = map[row].concat(mapOrg[row]);
			}

			frames = map[0].length;

			interval = setInterval(
				function() {
					selfobject.drawFromMap(map);
					for (var row=0; row<map.length; row++) {
						map[row] = map[row].slice(1);
					}
					frame++;

					if (frame > frames) {
						clearInterval(interval);
						callCallback(callback);
					}
				},
				frame_delay
			);

		}

		return frames;
	}


	// ----------------------- //
	//    util functions       //
	// ----------------------- //

	this.init = function(rows, columns, width, height, space, color, radius, canvas_radius) {
		this.rows = rows;
		this.columns = columns;
		this.width = width;
		this.height = height;
		this.space = space;
		this.color = color;
		this.radius = radius;
		this.canvas_radius = canvas_radius;

		this.display.setAttribute('width', this.columns * (this.width + this.space));
		this.display.setAttribute('height', this.rows * (this.height + this.space));
		this.display_bg.setAttribute('width', this.columns * (this.width + this.space));
		this.display_bg.setAttribute('height', this.rows * (this.height + this.space));
	}

	this.resize = function(rows, columns, width, height, space, color, radius, canvas_radius) {

		this.init(rows, columns, width, height, space, color, radius, canvas_radius);

		this.drawBg();
		this.clearDisplay();
		this.drawFromMap(current_map);
	}

	this.init(rows, columns, dot_width, dot_height, space_between_dots, dot_default_color, dot_corner_radius, display_corner_radius);

}