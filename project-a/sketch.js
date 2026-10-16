let ballX = [];
let ballY = [];
let BGmusic;
let EPmusic;
let EPplaying = false;
function preload() {
    BGmusic = loadSound('BG.mp3');
    EPmusic = loadSound('Explor.mp3');
}
function setup() {
    createCanvas(800, 500);
    background(0);
    stroke(255);
    noFill();

    BGmusic.play();
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
    drawNumbers();
}


function drawCreature(range, maxSize) {
    let chasing = false;

    for (let i = 1; i < ballX.length; i++) {
        if (keyIsDown(77) &&
            dist(mouseX, mouseY, ballX[i], ballY[i]) < range) {

            chasing = true;

            ballX[i] = lerp(ballX[i], mouseX, 0.02);
            ballY[i] = lerp(ballY[i], mouseY, 0.02);

        } else {
            ballX[i] += random(-2, 2);
            ballY[i] += random(-2, 2);
        }

        fill(255, 0, 0);
        noStroke();
        circle(ballX[i], ballY[i], random(1, maxSize));
    }

    if (chasing) {
        if (!EPmusic.isPlaying()) {
            EPmusic.setVolume(0);
            EPmusic.play();
        }
        EPmusic.setVolume(1, 1);
    } else {
        EPmusic.setVolume(0, 1);
    }
}

function mousePressed() {
    let found = false;

    for (let i = 1; i < ballX.length; i++) {
        if (dist(mouseX, mouseY, ballX[i], ballY[i]) < 30 && found == false) {
            for (let j = 0; j < 3; j++) {
                ballX.push(ballX[i] + random(-10, 10));
                ballY.push(ballY[i] + random(-10, 10));
            }
            found = true; //gpt
        }
    }
}