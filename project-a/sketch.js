let ballX = [];
let ballY = [];
let numbers;
function setup() {
    canvas = createCanvas(800, 500);
    canvas.elt.oncontextmenu = () => false;
    numbers = createGraphics(800, 500);
    background(0);
    stroke(255);
    noFill();

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

    drawCreature(100, 2);

}

function drawCreature(range, maxSize) {
    for (let i = 1; i < ballX.length; i++) {
        if (
            mouseIsPressed &&
            mouseButton === RIGHT &&
            dist(mouseX, mouseY, ballX[i], ballY[i]) < range
        ) {
            ballX[i] = lerp(ballX[i], mouseX, 0.02);
            ballY[i] = lerp(ballY[i], mouseY, 0.02);
        } else {
            ballX[i] += random(-2, 2);
            ballY[i] += random(-2, 2);
        }

        fill(255, 0, 0);
        noStroke();

        circle(
            ballX[i],
            ballY[i],
            random(1, maxSize)
        );
    }
}

function mousePressed() {
    if (mouseButton === LEFT) {
        splitCreature();
    }

    return false;
}

function splitCreature() {
    for (let i = 1; i < ballX.length; i++) {
        if (dist(mouseX, mouseY, ballX[i], ballY[i]) < 40) {
            for (let j = 0; j < 3; j++) {
                ballX.push(ballX[i] + random(-10, 10));
                ballY.push(ballY[i] + random(-10, 10));
            }

            break;
        }
    }
}
