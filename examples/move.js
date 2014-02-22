(function ($, VM) {
	var body = new VM.El('div', {'class': 'body'});
	$(document).ready(function (){
		body.draw();
	});

	var header = new VM.El('header');
	body.append(header);

	var a = new VM.MatrixEl('div').css({width: '150px', height: '150px', 'background-color': 'red', 'margin': 'auto'});
	var b = new VM.MatrixEl('div').css({width: '100px', height: '100px', 'background-color': 'blue', 'position': 'absolute', 'top': '0', 'left': '0'});
	var c = new VM.MatrixEl('div').css({width: '100px', height: '100px', 'background-color': 'green', 'position': 'absolute', 'top': '0', 'right': '0'});
	var d = new VM.MatrixEl('div').css({width: '100px', height: '100px', 'background-color': 'purple', 'position': 'absolute', 'bottom': '0', 'left': '0'});
	var e = new VM.MatrixEl('div').css({width: '100px', height: '100px', 'background-color': 'orange', 'position': 'absolute', 'bottom': '0', 'right': '0'});
	
	a.flip = function (front) {
		if (front) {
			this.css('background-color', 'red');
		} else {
			this.css('background-color', 'pink');
		}
	};

	b.flip = function (front) {
		if (front) {
			this.css('background-color', 'blue');
		} else {
			this.css('background-color', 'yellow');
		}
	};

	c.flip = function (front) {
		if (front) {
			this.css('background-color', 'green');
		} else {
			this.css('background-color', 'grey');
		}
	};
	d.flip = function (front) {
		if (front) {
			this.css('background-color', 'purple');
		} else {
			this.css('background-color', 'aquamarine');
		}
	};

	e.flip = function (front) {
		if (front) {
			this.css('background-color', 'orange');
		} else {
			this.css('background-color', 'black');
		}
	};

	body.append(a);
	body.append(b);
	body.append(c);
	body.append(d);
	body.append(e);
	
	var change = [0, 0, 0, 0];
	var single = [true, true, true, true, true, true, true, true];
	var t = 0.015;

	a.animEnd = function () {
		a.animate(t, 1, change[2], change[3], 0, change[0], change[1], 0);
		b.animate(t, 1, 1 * change[2], 1* change[3], 0, 0, 0, 0);
		d.animate(t, 1, 2* change[3], 2 * change[2], 0, 0, 0, 0);
		e.animate(t, 1, 3* -change[2], 3* change[3], 0, 0, 0, 0);
		c.animate(t, 1, 4* change[3], 4 * -change[2], 0, 0, 0, 0);
	};

	a.animate(t, 1, change[2], change[3], 0, change[0], change[1], 0);

	$(window).keydown(function (e){
		if (e.which === 39 && single[0]) {
			//right
			change[0] += 2;
			single[0] = false;
		} else if (e.which === 40&& single[1]){
			//down 
			change[1] += 2;
			single[1] = false;
		} else if (e.which === 37&& single[2]){
			//left
			change[0] -= 2;
			single[2] = false;
		} else if (e.which === 38&& single[3]){
			//up
			change[1] -= 2;
			single[3] = false;
		} else if (e.which === 68&& single[4]){
			//right2
			change[3] += 2;
			single[4] = false;
		} else if (e.which === 83&& single[5]){
			//down2
			change[2] += 2;
			single[5] = false;
		} else if (e.which === 65&& single[6]){
			//left2
			change[3] -= 2;
			single[6] = false;
		} else if (e.which === 87&& single[7]){
			//right2
			change[2] -= 2;
			single[7] = false;
		}
	});

	$(window).keyup(function (e){
		if (e.which === 39 && !single[0]) {
			//right
			change[0] -= 2;
			single[0] = true;
		} else if (e.which === 40 && !single[1]){
			//down 
			change[1] -= 2;
			single[1] = true;
		} else if (e.which === 37 && !single[2]){
			//left
			change[0] += 2;
			single[2] = true;
		} else if (e.which === 38 && !single[3]){
			//up
			change[1] += 2;
			single[3] = true;
		} else if (e.which === 68 && !single[4]){
			//right2
			change[3] -= 2;
			single[4] = true;
		} else if (e.which === 83 && !single[5]){
			//down2
			change[2] -= 2;
			single[5] = true;
		} else if (e.which === 65 && !single[6]){
			//left2
			change[3] += 2;
			single[6] = true;
		} else if (e.which === 87 && !single[7]){
			//right2
			change[2] += 2;
			single[7] = true;
		}
	});
}(jQuery, VM));