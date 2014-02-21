var cube = [
  new VM.MatrixEl('div').css({width: '100px', height: '100px', 'background-color': 'rgba(0,0,0,0.4)', 'position': 'absolute', 'top': '0', 'left': '0'}),
  new VM.MatrixEl('div').css({width: '100px', height: '100px', 'background-color': 'rgba(255,0,0,0.4)', 'position': 'absolute', 'top': '0', 'left': '0'}),
  new VM.MatrixEl('div').css({width: '100px', height: '100px', 'background-color': 'rgba(0,255,0,0.4)', 'position': 'absolute', 'top': '0', 'left': '0'}),
  new VM.MatrixEl('div').css({width: '100px', height: '100px', 'background-color': 'rgba(0,0,0,255.4)', 'position': 'absolute', 'top': '0', 'left': '0'}),
  new VM.MatrixEl('div').css({width: '100px', height: '100px', 'background-color': 'orange', 'position': 'absolute', 'top': '0', 'left': '0'}),
  new VM.MatrixEl('div').css({width: '100px', height: '100px', 'background-color': 'purple', 'position': 'absolute', 'top': '0', 'left': '0'})
];

var box = new VM.El('div').draw();

box.append(cube[0]);
box.append(cube[1]);
box.append(cube[2]);
box.append(cube[3]);
box.append(cube[4]);
box.append(cube[5]);
box.css({'height': '400px', 'width': '400px', '-webkit-perspective': '500px', '-webkit-transform-style': 'preserve-3d', '-webkit-perspective-origin': '50% 50%'});


cube[1].matrixData = [0,    0,    0, 0,     0,    10,   1, true]; //Cube 0 Face
cube[2].matrixData = [-90,  0,    0, 0,     50,   0,    1, true]; //bottom
cube[3].matrixData = [180,  0,    0, 0,     0,    -10,  1, true]; //back
cube[0].matrixData = [90,   0,    0, 0,     -50,  0,    1, true]; //top
cube[4].matrixData = [0,    -89,  0, 50,    0,    0,    1, true]; //right
cube[5].matrixData = [0,    89,   0, -50,   0,    0,    1, true]; //left


function rotaCube () {
  cube = [cube[1], cube[2], cube[3], cube[0], cube[4], cube[5]];
  cube[0].animate(5, 1, 90, 0, 0, 0, -50, -10);
  cube[1].animate(5, 1, 90, 0, 0, 0, -50, 10);
  cube[2].animate(5, 1, 90, 0, 0, 0, 50, 10);
  cube[3].animate(5, 1, 90, 0, 0, 0, 50, -10);
  cube[4].animate(5, 1, 90, 0, 0, 0, 0, 0);
  cube[5].animate(5, 1, 90, 0, 0, 0, 0, 0);
}

cube[5].animEnd = rotaCube;
rotaCube();