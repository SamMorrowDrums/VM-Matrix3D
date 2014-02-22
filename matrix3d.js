/*
This file is a place to store methods and settings for productive, simple access to Matrix 3D transform possibilities
*/
if (ViewMachine === undefined) {
  var ViewMachine = {};
}
ViewMachine = (function (VM, $) {
  'use strict';
  VM.getMatrix = function () {
    return [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
  };
  VM.matrixMethods = {
    applyMatrix: function (matrix){
      if (matrix === undefined) {
        matrix = this.matrix;
      } else {
        this.matrix = matrix;
      }
      var arr = [];
      for (var i = 0; i < 4; i++) {
        for (var n = 0; n < 4; n++) {
          if (matrix[i][n] !== 0) {
            arr.push(matrix[i][n].toFixed(10));
          } else {
            arr.push(0);
          }
        }
      }
      this.css('-webkit-transform', 'matrix3d(' + arr.join(',') + ')');
    },
    scale: function (n, m) {
      this.matrixData[6] += n;
      n = this.matrixData[6];
      m[0][0] *= n;
      m[1][1] *= n;
      m[2][2] *= n;
      return m;
    },
    rotateX: function (deg, m) {
      var abs = Math.abs(this.matrixData[0]);
      if (abs % 360 <= 90 || abs % 360 >= 270) {
        if ((abs + Math.abs(deg)) % 360 >= 90 && (abs + Math.abs(deg)) % 360 <= 270) {
          if (this.flip) {
            this.matrixData[7] = !this.matrixData[7];
            this.flip(this.matrixData[7]);
          }
        }
      } else {
        if ((abs + Math.abs(deg)) % 360 <= 90 || (abs + Math.abs(deg)) % 360 >= 270) {
          if (this.flip) {
            this.matrixData[7] = !this.matrixData[7];
            this.flip(this.matrixData[7]);
          }
        }
      }
      this.matrixData[0] += deg;
      var amount = this.matrixData[0] * 0.017453292519943295;
      m[1][1] *= Math.cos(amount);
      m[1][2] *= Math.sin(-amount);
      m[2][1] *= Math.sin(amount);
      m[2][2] *= Math.cos(amount);
      return m;
    },
    rotateY: function (deg, m) {
      var abs = Math.abs(this.matrixData[1]);
      if (abs % 360 <= 90 || abs % 360 >= 270) {
        if ((abs + Math.abs(deg)) % 360 >= 90 && (abs + Math.abs(deg)) % 360 <= 270) {
          if (this.flip) {
            this.matrixData[7] = !this.matrixData[7];
            this.flip(this.matrixData[7]);
          }
        }
      } else {
        if ((abs + Math.abs(deg)) % 360 <= 90 || (abs + Math.abs(deg)) % 360 >= 270) {
          if (this.flip) {
            this.matrixData[7] = !this.matrixData[7];
            this.flip(this.matrixData[7]);
          }
        }
      }
      this.matrixData[1] += deg;
      var amount = this.matrixData[1] * 0.017453292519943295;
      m[0][0] *= Math.cos(amount);
      m[0][2] *= Math.sin(amount);
      m[2][0] *= Math.sin(-amount);
      m[2][2] *= Math.cos(amount);
      return m;
    },
    rotateZ: function (deg, m) {
      this.matrixData[2] += deg;
      var amount = this.matrixData[2] * 0.017453292519943295;
      m[0][0] *= Math.cos(amount);
      m[0][1] *= Math.sin(-amount);
      m[1][0] *= Math.sin(amount);
      m[1][1] *= Math.cos(amount);
      return m;
    },
    translate: function (x, y, z, m) {
      this.matrixData[3] += x;
      this.matrixData[4] += y;
      this.matrixData[5] += z;
      m[3][0] += this.matrixData[3];
      m[3][1] += this.matrixData[4];
      m[3][2] += this.matrixData[5];
      return m;
    },
    animate: function (dur, scale, rx, ry, rz, x , y, z) {
      var t = dur * 1000;
      var xvel = x/t;
      var yvel = y/t;
      var zvel = z/t;
      var scaleVel = (scale-1)/t;
      var rxvel = rx/t;
      var ryvel = ry/t;
      var rzvel = rz/t;
      var time;
      var offset;
      var that = this;
      var dt;
      var total = 0;
      function anim (tx) {
        if (!offset){
          offset = tx;
          window.requestAnimationFrame(anim);
        } else {
          if (t >= 0) {
            dt = tx - offset;
            t -= dt;
            offset += dt;
            total += dt;
            var m = VM.getMatrix();
            m = that.rotateX(dt * rxvel, m);
            m = that.rotateY(dt*ryvel, m);
            m = that.rotateZ(dt * rzvel, m);
            m = that.scale(dt*scaleVel, m);
            m = that.translate(dt * xvel, dt * yvel, dt * zvel, m);
            that.applyMatrix(m);
            window.requestAnimationFrame(anim);
          } else {
            if (that.animEnd) {
              that.animEnd();
            }
          }
        }
      }
      window.requestAnimationFrame(anim);
    }
  };

  VM.MatrixEl = function (element, properties){
    var matrix = new VM.El(element, properties);
    matrix.matrix = VM.getMatrix();
    $.extend(matrix, VM.matrixMethods);
    matrix.matrixData = [0,0,0,0,0,0,1, true];
    matrix.applyMatrix();
    return matrix;
  };

  return VM;
}(ViewMachine, jQuery));