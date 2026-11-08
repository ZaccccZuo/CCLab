// The Wall - servo test (Arduino Mega)
// Servo signal -> 8. Actuators and light motor are held off.
// Every 5 seconds the servo goes from 90 to 110, stays there 2 seconds, then back to 90.
// On a continuous rotation servo: 90 = stop, 110 = slow turn in one direction.

#include <Servo.h>

const byte SERVO_PIN = 8;

const byte DRIVER_PINS[] = {
  A5, A4, A3, A2, A1, A0,     // L298N #1
  A12, A10, A9, A8, A7, A6,   // L298N #2
  A14, A13, 2,                // L298N #3 (light motor)
};

const int REST = 80;
const int ACTIVE = 110;
const unsigned long WAIT_MS = 5000;
const unsigned long HOLD_MS = 2000;

Servo servo;

void setup() {
  for (byte p : DRIVER_PINS) {
    pinMode(p, OUTPUT);
    digitalWrite(p, LOW);
  }
  servo.attach(SERVO_PIN);
  servo.write(REST);
}

void loop() {
  delay(WAIT_MS);
  servo.write(ACTIVE);
  delay(HOLD_MS);
  servo.write(REST);
}
