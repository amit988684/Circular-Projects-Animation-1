// import utils from './utils'

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const clickLocation = {
  x: undefined,
  y: undefined
};
const colors = [
  "rgb(196, 19, 90)",
  "rgb(33, 8, 51)",
  "rgb(143, 216, 173)",
  "rgb(250, 193, 156)",
  "rgb(175, 97, 54)"
];

// Event Listeners
addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener("click", event => {
  clickLocation.x = event.x;
  clickLocation.y = event.y;
  // console.log(event.x,event.y);
});

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function pointInCircle(point, circleCenter, radius) {
  if (point.x == undefined || point.y == undefined) return false;
  const dist = distance(point.x, point.y, circleCenter[0], circleCenter[1]);
  return dist < radius ? true : false;
}

// Objects

var deg1 = (Math.PI * 2) / 360;
var maxRadius = 25;
function Particle(x, y, radius, maxPathRadius, color) {
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
  this.draw = lastLocation => {
    c.beginPath();
    c.arc(lastLocation.x, lastLocation.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.lineWidth = 4;
    c.strokeStyle = "rgba(0,0,0,0.5)";
    c.stroke();
    // c.fillStyle=this.color;
    // c.fill();
  };

  this.update = (array,index) => {
    // previous frame x,y location :
    const lastLocation = { x: this.x, y: this.y };

    // Move the point over time
    // this.radians += deg1 * this.velocity;

    // distance between the center of the Particle and mouse position
    var dist = distance(mouse.x, mouse.y, this.x, this.y);

    if (dist < this.radius) {
      this.draw(lastLocation);
      return;
    } else if (dist < this.radius + 100) {
      if (this.radius < maxRadius) {
        this.radius += 0.5;
        // this.radius = Math.max((this.minRadius+50)*this.minRadius/dist,this.minRadius);
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 0.5;
    }
    // Circular Motion
    this.radians += deg1 * this.velocity;
    this.x = x + this.maxPathRadius * Math.cos(this.radians);
    this.y = y + this.maxPathRadius * Math.sin(this.radians);

    // Interactivty

    // if (pointInCircle(clickLocation, lastLocation, this.radius)) {
    //   array.pop(index);
    //   console.log("removed 1 node");
    //   return;
    // }

    this.draw(lastLocation);
  };
}

// Implementation
var particles;
radiusTypes = [5, 15];
let numParticles = 50;
function init() {
  particles = [];

  for (let i = 0; i < numParticles; i++) {
    const radius = radiusTypes[Math.floor(Math.random() * 1.9)];
    particles.push(
      new Particle(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        400,
        randomColor(colors)
      )
    );
  }
  console.log(particles);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  // c.fillStyle = "rgba(255,255,255,0.05)";
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  // for (let i = 0; i < particles.length; i++) {
  //   if(pointInCircle(clickLocation,[particles[i].x,particles[i].y],particles[i].radius))
  //   {
  //     clickLocation.x = undefined;
  //     clickLocation.y = undefined;
  //   }
  
  //   particles[i].update(particles, i);
    
  // }
  
  particles.forEach(particle => {
    // console.log(particle.x);
    particle.update(particles,particle);
  });
}

init();
animate();
