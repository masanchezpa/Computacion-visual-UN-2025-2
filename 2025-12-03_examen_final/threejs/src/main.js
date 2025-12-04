import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// escena y renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101014);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// cámaras
const camera1 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50);
camera1.position.set(6, 6, 8);

const camera2 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50);
camera2.position.set(0, 10, 0);
camera2.lookAt(0, 0, 0);

let activeCamera = camera1;

// controles
const controls = new OrbitControls(activeCamera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();

// iluminación
scene.add(new THREE.AmbientLight(0xffffff, 0.7));


const point1 = new THREE.PointLight(0xffe7c4, 0.8, 12);
point1.position.set(-4, 3, 4);
scene.add(point1);

const point2 = new THREE.PointLight(0xc6fdff, 0.4, 12);
point2.position.set(4, 2, -4);
scene.add(point2);

// piso
const loader = new THREE.TextureLoader();
const floorTexture = loader.load("/src/textures/wood.jpg");

floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(6, 6);

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ map: floorTexture })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// escultura
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x4fa3ff })
);

const pillar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, 3, 32),
    new THREE.MeshStandardMaterial({ color: 0x999999 })
);
pillar.position.y = 1.5;

const sculpture = new THREE.Group();
sculpture.add(cube);
sculpture.add(pillar);
scene.add(sculpture);

// esferas con material de lana lejos del mástil
const woolTexture = loader.load("/src/textures/wool.jpg");

const spheres = [];
for (let i = 0; i < 3; i++) {
    const s = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 32, 32),
        new THREE.MeshStandardMaterial({
            roughness: 0.25,
            map: woolTexture
        })
    );

    // mayor separación del mástil
    const offset = 2.2; // antes ~1.5
    s.position.set(offset - i * 1.2, 1.4, 0);
    scene.add(s);
    spheres.push(s);
}

// responsive
window.addEventListener("resize", () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    camera1.aspect = w / h;
    camera1.updateProjectionMatrix();

    camera2.aspect = w / h;
    camera2.updateProjectionMatrix();

    renderer.setSize(w, h);
});

// cambiar cámara
function switchCamera() {
    activeCamera = activeCamera === camera1 ? camera2 : camera1;
    controls.object = activeCamera;
    controls.update();
}

document.getElementById("toggleCamera").onclick = switchCamera;

document.getElementById("reset").onclick = () => {
    activeCamera.position.set(6, 6, 8);
    controls.target.set(0, 1, 0);
    controls.update();
};

window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "p") switchCamera();
});

// animación
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    sculpture.rotation.y = Math.sin(t * 0.2) * 0.25;

    // órbita circular 3D perfecta
    spheres.forEach((s, i) => {
        const radius = 2.2;
        const speed = 0.8;
        const height = 1.4;
        const phase = i * 2;

        s.position.x = Math.cos(t * speed + phase) * radius;
        s.position.z = Math.sin(t * speed + phase) * radius;
        s.position.y = height + Math.sin(t * 1.2 + i) * 0.25;
    });

    controls.update();
    renderer.render(scene, activeCamera);
}


animate();
