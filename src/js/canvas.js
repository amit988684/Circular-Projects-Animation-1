// import utils from './utils'

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ["#ee8572", "#35495e", "#347474", "#63b7af"];

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
    c.strokeStyle = this.color;
    c.lineWidth = 4;
    c.stroke();
    c.closePath();
  };

  this.update = () => {
    // previous frame x,y location :
    const lastLocation = { x: this.x, y: this.y };

    // Move the point over time
    // this.radians += deg1 * this.velocity;

    // distance between the center of the Particle and mouse position 
    var dist = distance(mouse.x, mouse.y, this.x, this.y);
    
    if(dist<this.radius){
      this.draw(lastLocation);
      return;
    }
    else if (dist < this.radius + 100) {
      if (this.radius < maxRadius) {
          this.radius+=1
        // this.radius = Math.max((this.minRadius+50)*this.minRadius/dist,this.minRadius);
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    // Circular Motion
    this.radians += deg1 * this.velocity;
    this.x = x + this.maxPathRadius * Math.cos(this.radians);
    this.y = y + this.maxPathRadius * Math.sin(this.radians);
    this.draw(lastLocation);
  };
}

// Implementation
let particles;
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
        450,
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
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "white";
  particles.forEach(particle => {
    particle.update();
  });
}

init();
animate();
