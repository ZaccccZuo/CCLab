// The Wall - Sharp IR distance sensor test
// Wiring: red -> 5V, black -> GND, yellow -> A0
// Open Serial Monitor (or Serial Plotter) at 9600 baud.

const byte IR_PIN = A0;

// Set to the model you have: true for GP2Y0A02 (20-150cm), false for GP2Y0A21 (10-80cm)
const bool LONG_RANGE = true;

const int SAMPLES = 10;      // average several readings, the sensor is noisy

void setup() {
  Serial.begin(9600);
}

void loop() {
  long sum = 0;
  for (int i = 0; i < SAMPLES; i++) {
    sum += analogRead(IR_PIN);
    delay(5);
  }
  int raw = sum / SAMPLES;
  float volts = raw * 5.0 / 1023.0;

  // approximate curves from the datasheets, only valid inside the sensor's range
  float cm;
  if (LONG_RANGE) {
    cm = 60.374 * pow(volts, -1.16);
  } else {
    cm = 27.86 * pow(volts, -1.15);
  }

  Serial.print("raw: ");
  Serial.print(raw);
  Serial.print("  volts: ");
  Serial.print(volts, 2);
  Serial.print("  cm: ");
  Serial.println(cm, 0);

  delay(100);
}
