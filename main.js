

var canvas = document.querySelector("#scene"),
ctx = canvas.getContext("2d"),
particles = [],
amount = 0,
mouse = { x: 0, y: 0 },
radius = 1;

// var colors = ["#C0C0C0", "#D3D3D3", "#C0C0C0", "#00afef"];
var colors = ["#00afef", "#00afef", "silver", "#00afef"];



var copy = document.querySelector("#copy");

var ww = (canvas.width = window.innerWidth);
var wh = (canvas.height = window.innerHeight);

function Particle(x, y) {
this.x = Math.random() * ww;
this.y = Math.random() * wh;
this.dest = {
  x: x,
  y: y,
};
this.size = Math.random() * 5 + 2;
this.vx = (Math.random() - 0.5) * 20;
this.vy = (Math.random() - 0.5) * 20;
this.accX = 0;
this.accY = 0;
this.friction = Math.random() * 0.05 + 0.94;

this.color = colors[Math.floor(Math.random() * 5)];
}

Particle.prototype.render = function () {
  
this.accX = (this.dest.x - this.x) / 1000;
this.accY = (this.dest.y - this.y) / 1000;
this.vx += this.accX;
this.vy += this.accY;
this.vx *= this.friction;
this.vy *= this.friction;

this.x += this.vx;
this.y += this.vy;

ctx.fillStyle = this.color;
ctx.beginPath();

// Render a hexagon instead of a circle
this.drawHexagon(this.x, this.y, this.size);
ctx.closePath();

ctx.fill();

var a = this.x - mouse.x;
var b = this.y - mouse.y;

var distance = Math.sqrt(a * a + b * b);
if (distance < radius * 70) {
  this.accX = (this.x - mouse.x) / 100;
  this.accY = (this.y - mouse.y) / 100;
  this.vx += this.accX;
  this.vy += this.accY;
}
};

Particle.prototype.drawHexagon = function (x, y, size) {
ctx.beginPath();
for (var i = 0; i < 6; i++) {
  var angle = (Math.PI / 3) * i;
  ctx.lineTo(x + size * Math.cos(angle), y + size * Math.sin(angle));
}
ctx.closePath();
};

function onMouseMove(e) {
mouse.x = e.clientX;
mouse.y = e.clientY;
}

function onTouchMove(e) {
if (e.touches.length > 0) {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
}
}

function onTouchEnd(e) {
mouse.x = -9999;
mouse.y = -9999;
}

function initScene() {
ww = (canvas.width = window.innerWidth);
wh = (canvas.height = window.innerHeight);

ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.font =  "bold " + ww / 3 + "px arial"; // Adjust the font size as needed
ctx.textAlign = "center";
ctx.textBaseline = "middle"; // Align text vertically to the middle
ctx.fillText("MIRO", ww / 2, wh / 2);

var data = ctx.getImageData(0, 0, ww, wh).data;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.globalCompositeOperation = "screen";

particles = [];
for (var i = 0; i < ww; i += Math.round(ww / 150)) {
  for (var j = 0; j < wh; j += Math.round(ww / 150)) {
    if (data[(i + j * ww) * 4 + 3] > 150) {
      particles.push(new Particle(i, j));
    }
  }
}
amount = particles.length;
}

function onMouseClick() {
radius++;
if (radius === 5) {
  radius = 0;
}
}

function render(a) {
requestAnimationFrame(render);
ctx.clearRect(0, 0, canvas.width, canvas.height);
for (var i = 0; i < amount; i++) {
  particles[i].render();

  // Add glitter effect by randomly changing opacity
  if (Math.random() > 0.5) {
    ctx.globalAlpha = Math.random(); // Random opacity value
  
    particles[i].render();
    ctx.globalAlpha = 1; // Reset the global alpha value
  }
}
}

copy.addEventListener("keyup", initScene);
window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("touchend", onTouchEnd);
initScene();
requestAnimationFrame(render);


const sliderContainer = document.querySelector('.slider-container');
const sliderItems = document.querySelector('.slider-items');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');

let currentSlide = 0;
let slidesToShow = 3; // Adjust for number of items per slide

fetch('your-json-file.json') // Replace with your JSON file path
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
      const sliderItem = document.createElement('li');
      sliderItem.classList.add('slider-item');
      sliderItem.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>Price: ${product.price}</p>
      `;
      sliderItems.appendChild(sliderItem);
    });

    updateSliderWidth();
  });

function updateSliderWidth() {
  const totalSlides = sliderItems.children.length;
  const slideWidth = sliderContainer.clientWidth / slidesToShow;
  sliderItems.style.width = `${totalSlides * slideWidth}px`;
}

function moveSlide(direction) {
  const slideWidth = sliderContainer.clientWidth / slidesToShow;
  currentSlide += direction * slideWidth;

  if (currentSlide < 0) {
    currentSlide = sliderItems.clientWidth - sliderContainer.clientWidth;
  } else if (currentSlide > sliderItems.clientWidth - sliderContainer.clientWidth) {
    currentSlide = 0;
  }

  sliderContainer.style.transform = `translateX(-${currentSlide}px)`;
}

prevBtn.addEventListener('click', () => moveSlide(-1));
nextBtn.addEventListener('click', () => moveSlide(1));

window.addEventListener('resize', updateSliderWidth);
