// original images
let scannedImages = [];
let naidanImages = [];

// cropped parts of images
let nailong;
let naidan;

// current indices for animation
let currentNailongIndex = 0;
let currentNaidanIndex = 0;

let nailongX = 400;
let nailongY = 250;
let nailongDirection = 1;
let nailongFrameCount = 0;

async function setup() {
  createCanvas(800, 500);
  noSmooth();

  // load all images first
  const imagePromises = [];
  for (let i = 1; i <= 3; i++) {
    imagePromises.push(loadImage("assets/Sprite-000" + i + ".png"));
  }
  scannedImages = await Promise.all(imagePromises);

  const naidanPromises = [];
  for (let i = 10; i <= 12; i++) {
    naidanPromises.push(loadImage("../Naidan/Sprite-00" + i + ".png"));
  }
  naidanImages = await Promise.all(naidanPromises);


  eraseBackground(scannedImages, 10);
  eraseBackground(naidanImages, 10);


  nailong = crop(scannedImages, 0, 0, 64, 64);
  naidan = crop(naidanImages, 0, 0, 64, 64);
}

function draw() {
  background(255);

  // EXAMPLES: NAIDAN
  // update naidan index
  currentNaidanIndex = floor((frameCount / 10) % naidan.length);
  // display naidan in the center
  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(
    naidan[currentNaidanIndex],
    0,
    0,
    naidan[0].width * 3,
    naidan[0].height * 3
  );
  pop();

  let distanceToMouse = dist(mouseX, mouseY, nailongX, nailongY);
  nailongX = lerp(nailongX, mouseX, 0.03);
  nailongY = lerp(nailongY, mouseY, 0.03);
  // face the direction it is walking
  if (mouseX > nailongX + 5) {
    nailongDirection = 1;
  } else if (mouseX < nailongX - 5) {
    nailongDirection = -1;
  }

  let animationSpeed = map(distanceToMouse, 0, 400, 20, 4, true);
  nailongFrameCount += 1 / animationSpeed;
  currentNailongIndex = floor(nailongFrameCount % nailong.length);
  // display nailong
  push();
  translate(nailongX, nailongY);
  scale(nailongDirection, 1);
  imageMode(CENTER);
  image(
    nailong[currentNailongIndex],
    0,
    0,
    nailong[0].width * 2,
    nailong[0].height * 2
  );
  pop();
}


function crop(images, x, y, width, height) {
  const croppedImages = [];

  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    croppedImages.push(images[imageIndex].get(x, y, width, height));
  }

  return croppedImages;
}

function eraseBackground(images, threshold = 10) {
  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    const currentImage = images[imageIndex];
    currentImage.loadPixels();

    for (let pixelIndex = 0; pixelIndex < currentImage.pixels.length; pixelIndex += 4) {
      let distanceFromWhite = 255 - currentImage.pixels[pixelIndex];
      distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 1];
      distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 2];

      if (distanceFromWhite < threshold) {
        currentImage.pixels[pixelIndex + 3] = 0;
      }
    }

    currentImage.updatePixels();
  }

}
