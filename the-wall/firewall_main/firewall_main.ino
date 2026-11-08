#include <Servo.h>

int Distance = 140;
long Time = 100;
long Smoke = 3;
long Cooldown = 5;
int Confirm = 10;

Servo servo;

int pins[] = {A5, A4, A3, A2, A1, A0, A12, A10, A9, A8, A7, A6, A14, A13, 2};

bool running = false;
unsigned long triggerTime = 0;
unsigned long showStart = 0;
unsigned long lastPrint = 0;
unsigned long lastRead = 0;
int closeCount = 0;
float smoothRaw = 0;
unsigned long endTime = 0;

bool steps[12][4] = {
  {1, 0, 0, 0},
  {1, 0, 0, 1},
  {1, 1, 0, 0},
  {0, 0, 0, 0},
  {0, 0, 1, 1},
  {1, 1, 1, 1},
  {1, 0, 1, 1},
  {1, 0, 1, 0},
  {1, 0, 1, 1},
  {0, 0, 1, 1},
  {0, 0, 0, 1},
  {0, 0, 0, 0},
};
int stepMs[12] = {500, 6500, 7000, 1000, 7000, 3000, 1000, 5000, 5000, 3000, 3000, 5000};

int order[4] = {1, 2, 4, 3};

int motorDir[8] = {1, -1, 1, -1, -1, 1, -1, 1};
int motorMs[8] = {2700, 1000, 1000, 3000, 3000, 1000, 1000, 3000};

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 15; i++) {
    pinMode(pins[i], OUTPUT);
  }
  digitalWrite(A5, HIGH);
  digitalWrite(A0, HIGH);
  digitalWrite(A12, HIGH);
  digitalWrite(A6, HIGH);
  digitalWrite(A14, HIGH);
  servo.attach(8);
  servo.write(80);
}

void loop() {
  if (millis() - lastRead >= 20) {
    lastRead = millis();
    float cm = readDistance();
    printDistance(cm);
    if (cm < Distance) {
      closeCount++;
    } else {
      closeCount = 0;
    }
  }
  checkTrigger();

  if (running) {
    actuatorPower(true);
    runActuators();
    runMotor();
    runServo();
  } else {
    if (millis() - endTime < 6000) {
      actuatorPower(true);
      panels(0, 0, 0, 0);
    } else {
      actuatorPower(false);
    }
    stopMotor();
    servo.write(80);
  }
}

void actuatorPower(bool on) {
  digitalWrite(A5, on);
  digitalWrite(A0, on);
  digitalWrite(A12, on);
  digitalWrite(A6, on);
  if (!on) {
    digitalWrite(A4, LOW);
    digitalWrite(A3, LOW);
    digitalWrite(A2, LOW);
    digitalWrite(A1, LOW);
    digitalWrite(A10, LOW);
    digitalWrite(A9, LOW);
    digitalWrite(A8, LOW);
    digitalWrite(A7, LOW);
  }
}

void checkTrigger() {
  unsigned long now = millis();

  if (closeCount >= Confirm && now - triggerTime > Cooldown * 1000) {
    if (!running) {
      showStart = now;
    }
    running = true;
    triggerTime = now;
    Serial.print(">>> TRIGGERED at ");
    Serial.print(now / 1000.0);
    Serial.println(" s");
  }

  if (running && now - triggerTime > Time * 1000) {
    running = false;
    endTime = now;
    Serial.println(">>> END");
  }
}

void runActuators() {
  unsigned long t = (millis() - showStart) % 100000;

  if (t < 47000) {
    unsigned long sum = 0;
    for (int i = 0; i < 12; i++) {
      sum += stepMs[i];
      if (t < sum) {
        panels(steps[i][0], steps[i][1], steps[i][2], steps[i][3]);
        return;
      }
    }
  } else if (t < 61000) {
    oneByOne(t - 47000, 5000, 3000);
  } else if (t < 75000) {
    oneByOne(t - 61000, 5000, 3000);
  } else {
    oneByOne(t - 75000, 10000, 5000);
  }
}

void oneByOne(unsigned long t, unsigned long stay, unsigned long gap) {
  for (int i = 0; i < 4; i++) {
    unsigned long start = i * gap;
    panel(order[i], t >= start && t < start + stay);
  }
}

void runMotor() {
  unsigned long t = (millis() - showStart) % 15700;
  unsigned long sum = 0;
  for (int i = 0; i < 8; i++) {
    sum += motorMs[i];
    if (t < sum) {
      if (motorDir[i] == 1) {
        digitalWrite(A13, LOW);
        digitalWrite(2, HIGH);
      } else {
        digitalWrite(A13, HIGH);
        digitalWrite(2, LOW);
      }
      return;
    }
  }
}

void stopMotor() {
  digitalWrite(A13, LOW);
  digitalWrite(2, LOW);
}

void runServo() {
  if (millis() - triggerTime < Smoke * 1000) {
    servo.write(110);
  } else {
    servo.write(80);
  }
}

void panels(bool p1, bool p2, bool p3, bool p4) {
  panel(1, p1);
  panel(2, p2);
  panel(3, p3);
  panel(4, p4);
}

void panel(int n, bool out) {
  if (n == 1) {
    digitalWrite(A4, !out);
    digitalWrite(A3, out);
  }
  if (n == 2) {
    digitalWrite(A2, out);
    digitalWrite(A1, !out);
  }
  if (n == 3) {
    digitalWrite(A10, !out);
    digitalWrite(A9, out);
  }
  if (n == 4) {
    digitalWrite(A8, out);
    digitalWrite(A7, !out);
  }
}

float readDistance() {
  int total = 0;
  int low = 1023;
  int high = 0;
  for (int i = 0; i < 5; i++) {
    int r = analogRead(A15);
    total += r;
    if (r < low) low = r;
    if (r > high) high = r;
  }
  float raw = (total - low - high) / 3.0;
  smoothRaw = smoothRaw * 0.7 + raw * 0.3;
  float volts = smoothRaw * 5.0 / 1023.0;
  return 60.374 * pow(volts, -1.16);
}

void printDistance(float cm) {
  if (millis() - lastPrint > 500) {
    lastPrint = millis();
    Serial.print("distance: ");
    Serial.print(cm);
    if (running) {
      Serial.print("   RUNNING ");
      Serial.print((millis() - showStart) / 1000);
      Serial.println(" s");
    } else {
      Serial.println("   waiting");
    }
  }
}
