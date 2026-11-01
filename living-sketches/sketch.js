
let scannedImages = [];

let nailong;
let naidan;

let currentNailongIndex = 0;
let currentNaidanIndex = 0;

async function setup() {
  createCanvas(800, 500);
  noSmooth();

  const imagePromises = [];
  for (let i = 1; i <= 6; i++) {
    imagePromises.push(loadImage("Nailong-Naidan/Sprite-000" + i + ".png"));
  }
  scannedImages = await Promise.all(imagePromises);


  eraseBackground(scannedImages, 10);


  nailong = crop(scannedImages.slice(0, 3), 0, 0, 64, 64);
  naidan = crop(scannedImages.slice(3, 6), 0, 0, 64, 64);
}

function draw() {
  background(255);
  currentNaidanIndex = floor((frameCount / 10) % naidan.length);
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

  currentNailongIndex = floor((frameCount / 20) % nailong.length);
  // display nailong
  image(
    nailong[currentNailongIndex],
    mouseX,
    mouseY,
    nailong[0].width * 2,
    nailong[0].height * 2
  );
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
