let canvas, ctx, w, h, snows;

function init() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");

  resizeReset();
  animationLoop();
}

function resizeReset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  snows = [];
  for (let i = 0; i < 500; i++) {
    snows.push(new Snow());
  }
}

function animationLoop() {
  ctx.clearRect(0, 0, w, h);
  drawScene();
  requestAnimationFrame(animationLoop);
}

function drawScene() {
  for (let i = 0; i < snows.length; i++) {
    snows[i].update();
    snows[i].draw();
  }
}

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

class Snow {
  constructor() {
    this.reset();
    this.hue = Math.floor(Math.random() * 360); // Random hue for rainbow effect
    this.opacityChange = Math.random() * 0.02; // Random flicker amount
  }

  reset() {
    this.x = getRandomInt(0, w);
    this.xc = ((this.x - (w / 2)) / (w / 2)) / 2;
    this.y = getRandomInt(-(h * 0.3), h);
    this.yc = getRandomInt(10, 15) / 10;
    this.size = getRandomInt(10, 20) / 10;
    this.a = Math.random(); // Initial random opacity
    this.ac = this.opacityChange; // Change in opacity
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}deg, 100%, 50%, ${this.a})`; // Use HSL for rainbow
    ctx.strokeStyle = `hsla(${this.hue}deg, 100%, 50%, ${this.a})`;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    this.x += this.xc;
    this.y += this.yc;

    // Update opacity with random flicker
    this.a += this.ac;
    if (this.a > 1) {
      this.ac = -this.opacityChange;
    } else if (this.a < 0) {
      this.ac = this.opacityChange;
      this.a = 0; // Ensure opacity doesn't go negative
    }

    // Reset particle when it reaches the bottom
    if (this.y > h) {
      this.reset();
    }
  }
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
