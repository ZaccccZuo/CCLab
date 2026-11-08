/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  createCanvas(windowWidth, windowHeight);

  // ...except to adjust the dancer's name on the next line:
  dancer = new ChenghanDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

class ChenghanDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.groundY = startY;
    this.speed = -2;
    this.tailY = 0;
    this.tailSpeed = 2;
    this.drops = [];
    this.white = 0;
  }
  update() {
    this.y = this.y + this.speed;

    if (this.y < this.groundY - 50) {
      this.speed = 2;
    }
    if (this.y > this.groundY) {
      this.speed = -2;
    }

    this.tailY = this.tailY + this.tailSpeed;
    if (this.tailY > 12) {
      this.tailSpeed = -2;
    }
    if (this.tailY < -12) {
      this.tailSpeed = 2;
    }

    this.white = noise(frameCount * 0.01) * 255;

    if (mouseX > this.x - 80 && mouseX < this.x + 50 &&
        mouseY > this.y - 25 && mouseY < this.y + 25) {
      this.drops.push({
        x: 0,
        y: 0,
        vx: random(-3, 3),
        vy: random(-3, 3),
        size: random(4, 12),
        alpha: 255
      });
    }

    for (let i = this.drops.length - 1; i >= 0; i--) {
      let d = this.drops[i];
      d.x = d.x + d.vx;
      d.y = d.y + d.vy;
      d.alpha = d.alpha - 8;
      if (d.alpha <= 0) {
        this.drops.splice(i, 1);
      }
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke();

    fill(0, 60, 200);
    triangle(-40, 0, -80, -25 + this.tailY, -80, 25 + this.tailY);

    fill(0, 60, 200);
    triangle(-15, -22, 15, -22, this.tailY, -42);
    triangle(-15, 22, 15, 22, -this.tailY, 42);

    fill(this.white, this.white, 255);
    ellipse(0, 0, 100, 50);

    fill(255);
    ellipse(25, -5, 14, 14);
    fill(0);
    ellipse(27, -5, 6, 6);

    stroke(0);
    line(48, 3, 40, 3);

    noStroke();
    for (let i = 0; i < this.drops.length; i++) {
      let d = this.drops[i];
      fill(0, 150, 255, d.alpha);
      ellipse(d.x, d.y, d.size, d.size);
    }

    pop();
  }
}


/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/