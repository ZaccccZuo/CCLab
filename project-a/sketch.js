let ballX = [];
let ballY = [];
let trail;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.elt.oncontextmenu = () => false;
    trail = createGraphics(800, 500);

    ballX[1] = random(20, 380);
    ballY[1] = random(20, 230);

    ballX[2] = random(420, 780);
    ballY[2] = random(20, 230);

    ballX[3] = random(20, 380);
    ballY[3] = random(270, 480);

    ballX[4] = random(420, 780);
    ballY[4] = random(270, 480);
}

function draw() {
    background(0);
    drawNumbers();
    drawCreature(100, 2);
    image(trail, 0, 0);
}

function drawNumbers() {
    let alpha = noise(millis() * 0.0005) * 200;
    fill(100, alpha);
    noStroke();
    textSize(14);
    for (let x = 0; x < 100; x++) {
        for (let y = 0; y < 50; y++) {
            text(floor(random(10)), x * 8, y * 11);
        }
    }
}

function drawCreature(range, maxSize) {
    for (let i = 1; i < ballX.length; i++) {
        if (mouseIsPressed && mouseButton === RIGHT &&
            dist(mouseX, mouseY, ballX[i], ballY[i]) < range) {
            ballX[i] = lerp(ballX[i], mouseX, 0.04);
            ballY[i] = lerp(ballY[i], mouseY, 0.04);
        } else {
            ballX[i] += random(-2, 2);
            ballY[i] += random(-2, 2);
        }

        trail.fill(255, 0, 0);
        trail.noStroke();
        trail.circle(ballX[i], ballY[i], random(1, maxSize));
    }
}

function mousePressed() {
    if (mouseButton === LEFT) {
        ballX.push(mouseX);
        ballY.push(mouseY);
    }
}