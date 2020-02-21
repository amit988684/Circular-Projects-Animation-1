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
function Particle(x, y, radius, maxPathRadius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.maxPathRadius = randomIntFromRange(40, maxPathRadius);
  this.color = color;

  this.radians = Math.random() * Math.PI * 2; // to make particles start from any point in circle
  this.velocity = 5;
  this.lastMouse = {
    x:x,y:y
  };
  
  this.draw = lastLocation => {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastLocation.x, lastLocation.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  };

  this.update = () => {
    // previous frame x,y location :
    const lastLocation = { x: this.x, y: this.y };

    // Move the point over time
    this.radians += deg1 * this.velocity;
    
    // To Create Drag Effect
      this.lastMouse.x += (mouse.x - this.lastMouse.x)*0.05;
      this.lastMouse.y += (mouse.y - this.lastMouse.y)*0.05;

    // Circular Motion 
    this.x = this.lastMouse.x + this.maxPathRadius * Math.cos(this.radians);
    this.y = this.lastMouse.y + this.maxPathRadius * Math.sin(this.radians);

    this.draw(lastLocation);
  };
}

// Implementation
let particles;
let numParticles = 50;
function init() {
  particles = [];

  for (let i = 0; i < numParticles; i++) {
    const radius = Math.floor(Math.random() * 4) + 2;
    particles.push(
      new Particle(canvas.width / 2, canvas.height / 2, radius, 100,randomColor(colors))
    );
  }
  console.log(particles);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(255,255,255,0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
  });
}

init();
animate();
