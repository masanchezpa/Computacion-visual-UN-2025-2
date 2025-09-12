// Parámetros principales
float radius = 180;            // radio de la trayectoria circular
float revolutionsPerSec = 0.20; // vueltas por segundo
float verticalAmp = 60;        // amplitud vertical
float baseBoxSize = 80;        // tamaño base del cubo
float scaleAmp = 0.35;         // amplitud del escalado
float rotationSpeed = 1.2;     // velocidad de rotación

void setup() {
  size(900, 600, P3D); 
  smooth(8);
  rectMode(CENTER);
}

void draw() {
  background(18, 24, 34);
  lights();
  directionalLight(200, 200, 200, -0.5, -1, -0.5);
  ambientLight(40, 40, 50);

  // tiempo y valores animados
  float t = millis() / 1000.0;
  float angle = t * TWO_PI * revolutionsPerSec;
  float x = cos(angle) * radius;
  float z = sin(angle) * radius;
  float y = sin(t * 2.0) * verticalAmp * 0.5;
  float s = 1.0 + sin(t * 3.0) * scaleAmp;
  float rx = t * rotationSpeed;
  float ry = t * rotationSpeed * 0.8;
  float rz = frameCount * 0.02;

  // cubo animado
  pushMatrix();
    translate(width * 0.5 + x, height * 0.5 + y, z);
    rotateX(rx);
    rotateY(ry);
    rotateZ(rz);
    scale(s);
    specular(255);
    shininess(20);
    fill(220, 120, 60);
    stroke(34);
    strokeWeight(1.5);
    box(baseBoxSize);
  popMatrix();

  // plano de suelo
  pushMatrix();
    translate(width * 0.5, height * 0.5 + 240, 0);
    rotateX(HALF_PI); 
    noStroke();
    fill(16, 20, 30);
    rect(0, 0, 1200, 1200);
  popMatrix();

  // info de tiempo y ángulo
  hint(DISABLE_DEPTH_TEST);  
    camera();                 
    noLights();               
    fill(200);
    textSize(14);
    text("t = " + nf(t,1,2) + " s   angle = " + nf(degrees(angle),1,1) + "°", 10, height - 10);
  hint(ENABLE_DEPTH_TEST);

}
