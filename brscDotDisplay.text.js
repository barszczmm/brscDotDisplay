
brscDotDisplay.prototype.getUnknownChar = function(width) {
	var unknown = [];
	for (var row=0; row<this.rows; row++) {
		unknown[row] = [];
		unknown[row][0] = 0;
		for (var column=1; column<width; column++) {
			if (row == 0 || row == this.rows-1 || column == 1 || column == width-1) {
				unknown[row][column] = 1;
			} else {
				unknown[row][column] = 0;
			}
		}
	}
	return unknown;
}

brscDotDisplay.prototype.getLetterMap = function(letter, font, color) {
	if (typeof(letter) == 'undefined') {
		return [];
	}
	font = this.fonts[font];
	if (typeof(font) == 'undefined') {
		letter = this.getUnknownChar(5);
	} else {
		letter = font[letter];
	}
	if (typeof(letter) == 'undefined') {
		letter = this.getUnknownChar(5);
	}

	for (var row=0; row<this.rows; row++) {
		for (var column=0; column<letter[0].length; column++) {
			if (typeof(letter[row]) == 'undefined') {
				letter[row] = [];
			}
			if (letter[row][column] == 0 || typeof(letter[row][column]) == 'undefined') {
				letter[row][column] = '';
			} else {
				letter[row][column] = color;
			}
		}
	}

	return letter;
}

brscDotDisplay.prototype.getTextMap = function(text, font, color) {
	var letter_map = this.getLetterMap(text[0], font, color),
		map = letter_map;
	for (var letter=1; letter<text.length; letter++) {
		letter_map = this.getLetterMap(text[letter], font, color);
		for (var row=0; row<map.length; row++) {
			map[row] = map[row].concat(letter_map[row]);
		}
	}

	return map;
}

brscDotDisplay.prototype.drawText = function(text, font, color) {
	this.drawFromMap(this.getTextMap(text, font, color));
}

brscDotDisplay.prototype.scrollTextOut = function(text, font, color, frame_delay, direction, callback) {
	this.scrollMapOut(this.getTextMap(text, font, color), frame_delay, direction, callback);
}

brscDotDisplay.prototype.scrollTextIn = function(text, font, color, frame_delay, direction, callback) {
	this.scrollMapIn(this.getTextMap(text, font, color), frame_delay, direction, callback);
}

brscDotDisplay.prototype.scrollTextThrough = function(text, font, color, frame_delay, direction, callback) {
	this.scrollMapThrough(this.getTextMap(text, font, color), frame_delay, direction, callback);
}


brscDotDisplay.prototype.fonts =  {
	'tpf': {
		' ':[
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			],
		'a':[
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 1, 1, 0],
				[0, 0, 0, 0, 1],
				[0, 0, 1, 1, 1],
				[0, 1, 0, 0, 1],
				[0, 0, 1, 1, 1],
				[0, 0, 0, 0, 0]
			],
		'b':[
				[0, 1, 0, 0, 0],
				[0, 1, 0, 0, 0],
				[0, 1, 1, 1, 0],
				[0, 1, 0, 0, 1],
				[0, 1, 0, 0, 1],
				[0, 1, 0, 0, 1],
				[0, 1, 1, 1, 0],
				[0, 0, 0, 0, 0]
			],
		'c':[
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
			    [0, 0, 1, 1, 0],
			    [0, 1, 0, 0, 1],
			    [0, 1, 0, 0, 0],
			    [0, 1, 0, 0, 1],
			    [0, 0, 1, 1, 0],
			    [0, 0, 0, 0, 0]
			],
		'd':[
				[0, 0, 0, 0, 1],
				[0, 0, 0, 0, 1],
			    [0, 0, 1, 1, 1],
			    [0, 1, 0, 0, 1],
			    [0, 1, 0, 0, 1],
			    [0, 1, 0, 0, 1],
			    [0, 0, 1, 1, 1],
			    [0, 0, 0, 0, 0]
			],
		'e':[
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
			    [0, 0, 1, 1, 0],
			    [0, 1, 0, 0, 1],
			    [0, 1, 1, 1, 1],
			    [0, 1, 0, 0, 0],
			    [0, 0, 1, 1, 0],
			    [0, 0, 0, 0, 0]
			],
		'f':[
				[0, 0, 0, 1],
				[0, 0, 1, 0],
			    [0, 1, 1, 1],
			    [0, 0, 1, 0],
			    [0, 0, 1, 0],
			    [0, 0, 1, 0],
			    [0, 0, 1, 0],
			    [0, 0, 0, 0]
			],
		'g':[
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
			    [0, 0, 1, 1, 1],
			    [0, 1, 0, 0, 1],
			    [0, 1, 0, 0, 1],
			    [0, 0, 1, 1, 1],
			    [0, 0, 0, 0, 1],
			    [0, 0, 1, 1, 0]
			],
		'h':[
				[0, 1, 0, 0, 0],
				[0, 1, 0, 0, 0],
			    [0, 1, 0, 0, 0],
			    [0, 1, 1, 1, 0],
			    [0, 1, 0, 0, 1],
			    [0, 1, 0, 0, 1],
			    [0, 1, 0, 0, 1],
			    [0, 0, 0, 0, 0]
			],
		'i':[
				[0, 1],
				[0, 0],
			    [0, 1],
			    [0, 1],
			    [0, 1],
			    [0, 1],
			    [0, 1],
			    [0, 0]
			],
		'j':[
				[0, 0, 0, 1],
				[0, 0, 0, 0],
			    [0, 0, 0, 1],
			    [0, 0, 0, 1],
			    [0, 0, 0, 1],
			    [0, 0, 0, 1],
			    [0, 0, 0, 1],
			    [0, 1, 1, 0]
			],
		'k':[
				[0, 1, 0, 0, 0],
				[0, 1, 0, 0, 0],
			    [0, 1, 0, 0, 1],
			    [0, 1, 0, 1, 0],
			    [0, 1, 1, 0, 0],
			    [0, 1, 0, 1, 0],
			    [0, 1, 0, 0, 1],
			    [0, 0, 0, 0, 0]
			],
		'l':[
				[0, 1, 0],
				[0, 1, 0],
			    [0, 1, 0],
			    [0, 1, 0],
			    [0, 1, 0],
			    [0, 1, 0],
			    [0, 0, 1],
			    [0, 0, 0]
			],
		'm':[
				[0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0],
			    [0, 1, 1, 0, 1, 0],
			    [0, 1, 0, 1, 0, 1],
			    [0, 1, 0, 1, 0, 1],
			    [0, 1, 0, 1, 0, 1],
			    [0, 1, 0, 1, 0, 1],
			    [0, 0, 0, 0, 0, 0]
			],
		'n':[
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
			    [0, 1, 1, 1, 0],
			    [0, 1, 0, 0, 1],
			    [0, 1, 0, 0, 1],
			    [0, 1, 0, 0, 1],
			    [0, 1, 0, 0, 1],
			    [0, 0, 0, 0, 0]
			]
		}
}