// The Wall - all 4 actuators extend and retract together (Arduino Mega)
//
// L298N #1: ENA A5, IN1 A4, IN2 A3, IN3 A2, IN4 A1, ENB A0
// L298N #2: ENA A12, IN1 A10, IN2 A9, IN3 A8, IN4 A7, ENB A6
// Actuator + on OUT2 / OUT3, - on OUT1 / OUT4
// L298N #3 (center light motor): ENA A14, IN1 A13, IN2 2
// Motor + on OUT2, - on OUT1
// IR sensor: A15, servo: 8, free analog pin: A11
//
// A0-A15 are not PWM pins on the Mega, so EN is just on/off (full speed).

struct Driver {
  byte ena, in1, in2, in3, in4, enb;
};

Driver drivers[2] = {
  {A5, A4, A3, A2, A1, A0},
  {A12, A10, A9, A8, A7, A6},
};

const byte MOTOR_EN = A14;
const byte MOTOR_IN1 = A13;
const byte MOTOR_IN2 = 2;

const unsigned long MOVE_MS = 3000;
const unsigned long PAUSE_MS = 1000;

// dir: 1 = extend, -1 = retract, 0 = stop
void driveAll(int dir) {
  for (auto &d : drivers) {
    // channel A: + on OUT2, - on OUT1
    digitalWrite(d.in1, dir < 0 ? HIGH : LOW);
    digitalWrite(d.in2, dir > 0 ? HIGH : LOW);
    // channel B: + on OUT3, - on OUT4
    digitalWrite(d.in3, dir > 0 ? HIGH : LOW);
    digitalWrite(d.in4, dir < 0 ? HIGH : LOW);
    digitalWrite(d.ena, dir == 0 ? LOW : HIGH);
    digitalWrite(d.enb, dir == 0 ? LOW : HIGH);
  }
}

void setup() {
  Serial.begin(9600);
  for (auto &d : drivers) {
    byte pins[] = {d.ena, d.in1, d.in2, d.in3, d.in4, d.enb};
    for (byte p : pins) {
      pinMode(p, OUTPUT);
      digitalWrite(p, LOW);
    }
  }
  // light motor stays off in this test
  byte motorPins[] = {MOTOR_EN, MOTOR_IN1, MOTOR_IN2};
  for (byte p : motorPins) {
    pinMode(p, OUTPUT);
    digitalWrite(p, LOW);
  }
  Serial.println("Sync test start");
  delay(2000);
}

void loop() {
  Serial.println("All extend");
  driveAll(1);
  delay(MOVE_MS);
  driveAll(0);
  delay(PAUSE_MS);

  Serial.println("All retract");
  driveAll(-1);
  delay(MOVE_MS);
  driveAll(0);
  delay(PAUSE_MS * 3);
}
