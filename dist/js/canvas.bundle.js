/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

// import utils from './utils'
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
var clickLocation = {
  x: undefined,
  y: undefined
};
var colors = ["rgb(196, 19, 90)", "rgb(33, 8, 51)", "rgb(143, 216, 173)", "rgb(250, 193, 156)", "rgb(175, 97, 54)"]; // Event Listeners

addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
addEventListener("click", function (event) {
  clickLocation.x = event.x;
  clickLocation.y = event.y; // console.log(event.x,event.y);
}); // Utility Functions

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function pointInCircle(point, circleCenter, radius) {
  if (point.x == undefined || point.y == undefined) return false;
  var dist = distance(point.x, point.y, circleCenter[0], circleCenter[1]);
  return dist < radius ? true : false;
} // Objects


var deg1 = Math.PI * 2 / 360;
var maxRadius = 25;

function Particle(x, y, radius, maxPathRadius, color) {
  var _this = this;

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.maxPathRadius = randomIntFromRange(250, maxPathRadius);
  this.color = color;
  this.radians = Math.random() * Math.PI * 2; // to make particles start from any point in circle

  this.velocity = 0.1;
  this.lastMouse = {
    x: x,
    y: y
  };
  this.minRadius = radius;

  this.draw = function (lastLocation) {
    c.beginPath();
    c.arc(lastLocation.x, lastLocation.y, _this.radius, 0, Math.PI * 2, false);
    c.fillStyle = _this.color;
    c.fill();
    c.lineWidth = 4;
    c.strokeStyle = "rgba(0,0,0,0.5)";
    c.stroke(); // c.fillStyle=this.color;
    // c.fill();
  };

  this.update = function (array, index) {
    // previous frame x,y location :
    var lastLocation = {
      x: _this.x,
      y: _this.y
    }; // Move the point over time
    // this.radians += deg1 * this.velocity;
    // distance between the center of the Particle and mouse position

    var dist = distance(mouse.x, mouse.y, _this.x, _this.y);

    if (dist < _this.radius) {
      _this.draw(lastLocation);

      return;
    } else if (dist < _this.radius + 100) {
      if (_this.radius < maxRadius) {
        _this.radius += 0.5; // this.radius = Math.max((this.minRadius+50)*this.minRadius/dist,this.minRadius);
      }
    } else if (_this.radius > _this.minRadius) {
      _this.radius -= 0.5;
    } // Circular Motion


    _this.radians += deg1 * _this.velocity;
    _this.x = x + _this.maxPathRadius * Math.cos(_this.radians);
    _this.y = y + _this.maxPathRadius * Math.sin(_this.radians); // Interactivty
    // if (pointInCircle(clickLocation, lastLocation, this.radius)) {
    //   array.pop(index);
    //   console.log("removed 1 node");
    //   return;
    // }

    _this.draw(lastLocation);
  };
} // Implementation


var particles;
radiusTypes = [5, 15];
var numParticles = 50;

function init() {
  particles = [];

  for (var i = 0; i < numParticles; i++) {
    var radius = radiusTypes[Math.floor(Math.random() * 1.9)];
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, 400, randomColor(colors)));
  }

  console.log(particles);
} // Animation Loop


function animate() {
  requestAnimationFrame(animate); // c.fillStyle = "rgba(255,255,255,0.05)";

  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height); // for (let i = 0; i < particles.length; i++) {
  //   if(pointInCircle(clickLocation,[particles[i].x,particles[i].y],particles[i].radius))
  //   {
  //     clickLocation.x = undefined;
  //     clickLocation.y = undefined;
  //   }
  //   particles[i].update(particles, i);
  // }

  particles.forEach(function (particle) {
    // console.log(particle.x);
    particle.update(particles, particle);
  });
}

init();
animate();

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map