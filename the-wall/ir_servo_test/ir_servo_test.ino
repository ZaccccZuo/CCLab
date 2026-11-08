// The Wall - IR sensor + servo test (Arduino Mega)
// IR (Sharp) signal -> A15, servo signal -> 8
// Actuators and light motor are held off during this test.
//
// The servo keeps sweeping 0 <-> 180, and the IR distance is printed all the time.
// Open Serial Monitor at 9600 baud to see the IR values.

#include <Servo.h>

const byte IR_PIN = A15;
const byte SERVO_PIN = 8;

// all L298N control pins, kept LOW so nothing else moves
const byte DRIVER_PINS[] = {
  A5, A4, A3, A2, A1, A0,     // L298N #1
  A12, A10, A9, A8, A7, A6,   // L298N #2
  A14, A13, 2,                // L298N #3 (light motor)
};

// true for GP2Y0A02 (20-150cm), false for GP2Y0A21 (10-80cm)
const bool LONG_RANGE = true;

const unsigned long SERVO_STEP_MS = 15;   // smaller = faster sweep
const unsigned long PRINT_MS = 100;

Servo servo;
int angle = 0;
int step = 1;
unsigned long lastServo = 0;
unsigned long lastPrint = 0;

void setup() {
  Serial.begin(9600);
  for (byte p : DRIVER_PINS) {
    pinMode(p, OUTPUT);
    digitalWrite(p, LOW);
  }
  servo.attach(SERVO_PIN);
  servo.write(angle);
  Serial.println("IR + servo test start");
}

void loop() {
  unsigned long now = millis();

  if (now - lastServo >= SERVO_STEP_MS) {
    lastServo = now;
    angle += step;
    if (angle >= 180 || angle <= 0) step = -step;
    servo.write(angle);
  }

  if (now - lastPrint >= PRINT_MS) {
    lastPrint = now;
    long sum = 0;
    for (int i = 0; i < 10; i++) sum += analogRead(IR_PIN);
    int raw = sum / 10;
    float volts = raw * 5.0 / 1023.0;
    float cm = LONG_RANGE ? 60.374 * pow(volts, -1.16) : 27.86 * pow(volts, -1.15);

    Serial.print("IR raw: ");
    Serial.print(raw);
    Serial.print("  cm: ");
    Serial.print(cm, 0);
    Serial.print("  servo: ");
    Serial.println(angle);
  }
}
