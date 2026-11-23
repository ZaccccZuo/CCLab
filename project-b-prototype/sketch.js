const ringSpacing = 30;
const volume = 0.018;
const thousandYears = 1000 * 365.2425 * 24 * 60 * 60;

let startTime = null;

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(248);

  const now = getAudioContext().currentTime;
  let seconds = 0;
  if (startTime !== null) {
    seconds = now - startTime;
    for (const chord of chords) {
      chord.update(seconds, now);
    }
  }

  drawWave(seconds);

  for (let i = 0; i < chords.length; i++) {
    chords[i].drawRing(ringSpacing * (i + 1), seconds);
  }

  drawTime(seconds);
}

function mousePressed() {
  if (startTime !== null) return;

  userStartAudio();
  for (const chord of chords) {
    chord.start();
  }
  startTime = getAudioContext().currentTime;
}

class Chord {
  constructor(period, freqs) {
    this.period = period;
    this.freqs = freqs;
    this.sounds = [];
    this.round = -1;
  }

  start() {
    for (const hz of this.freqs) {
      const sound = new p5.Oscillator('sine');
      sound.freq(hz);
      sound.amp(0);
      sound.start();
      this.sounds.push(sound);
    }
  }

  update(seconds, now) {
    const round = floor(seconds / this.period);
    if (round === this.round) return;
    this.round = round;

    for (const sound of this.sounds) {
      const gain = sound.amp();
      gain.cancelScheduledValues(now);
      gain.setValueAtTime(volume, now);
      gain.linearRampToValueAtTime(0, now + this.period);
    }
  }

  drawRing(radius, seconds) {
    const progress = (seconds % this.period) / this.period;
    const angle = TWO_PI * progress - HALF_PI;
    const x = width / 2 + radius * cos(angle);
    const y = height / 2 + radius * sin(angle);

    noFill();
    stroke(180);
    circle(width / 2, height / 2, radius * 2);

    noStroke();
    fill(20);
    circle(x, y, 9);
  }
}

const chords = [
  new Chord(9, [130.813, 164.814, 783.991, 987.767]),
  new Chord(17, [146.832, 174.614, 880.000, 1046.502]),
  new Chord(19, [82.407, 97.999, 493.883, 587.330]),
  new Chord(47, [41.203, 51.913, 246.942, 311.127]),
  new Chord(53, [48.999, 61.735, 293.665, 349.228]),
  new Chord(65, [25.957, 30.868, 155.563, 184.997]),
  new Chord(67, [29.135, 34.648, 164.814, 207.652]),
];

function drawWave(seconds) {
  let amplitude = 3;
  if (startTime !== null) {
    for (const chord of chords) {
      const sincePass = seconds % chord.period;
      amplitude = max(amplitude, 13 - 10 * sincePass);
    }
  }

  const phase = millis() / 1000 * 5;
  const top = height / 2 - ringSpacing * chords.length;
  const bottom = height / 2 - ringSpacing;

  noFill();
  stroke(80);
  beginShape();
  for (let y = top; y <= bottom; y++) {
    const x = width / 2 + amplitude * sin(y * 0.18 + phase);
    vertex(x, y);
  }
  endShape();
}

function drawTime(seconds) {
  const columns = [];
  for (const chord of chords) {
    const parts = (seconds / chord.period).toFixed(2).split('.');
    const digits = parts[0].split('').reverse().join('');
    columns.push(...(chord.period + 's×'));
    columns.push(digits);
    columns.push(...('.' + parts[1] + ' = '));
  }

  const elapsed = seconds.toFixed(2).padStart(14, '0');
  const remaining = (thousandYears - seconds).toFixed(2).padStart(14);
  columns.push(...(elapsed + 's = ' + thousandYears.toFixed(2) + 's − ' + remaining + 's'));

  const radius = ringSpacing * chords.length + 13;
  const gap = 0.28;
  const step = (TWO_PI - gap) / columns.length;

  push();
  translate(width / 2, height / 2);
  rotate((gap + step) / 2);
  noStroke();
  fill(20);
  textAlign(CENTER, CENTER);
  textFont('monospace');
  textSize(11);

  for (const column of columns) {
    let y = -radius;
    for (const character of column) {
      text(character, 0, y);
      y -= 10;
    }
    rotate(step);
  }
  pop();
}
