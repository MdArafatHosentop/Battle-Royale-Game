const socket = io();

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// FPS Control
const controls = new THREE.PointerLockControls(camera, document.body);
document.body.addEventListener("click", () => controls.lock());
scene.add(controls.getObject());

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 500),
  new THREE.MeshStandardMaterial({ color: 0x228B22 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Movement
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

document.addEventListener("keydown", e => {
  if (e.code === "KeyW") moveForward = true;
  if (e.code === "KeyS") moveBackward = true;
  if (e.code === "KeyA") moveLeft = true;
  if (e.code === "KeyD") moveRight = true;
});

document.addEventListener("keyup", e => {
  if (e.code === "KeyW") moveForward = false;
  if (e.code === "KeyS") moveBackward = false;
  if (e.code === "KeyA") moveLeft = false;
  if (e.code === "KeyD") moveRight = false;
});

// Bullet system
let bullets = [];

document.addEventListener("mousedown", () => {
  let bullet = new THREE.Mesh(
    new THREE.SphereGeometry(0.2),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
  );

  bullet.position.copy(camera.position);

  bullet.velocity = new THREE.Vector3();
  camera.getWorldDirection(bullet.velocity);
  bullet.velocity.multiplyScalar(2);

  scene.add(bullet);
  bullets.push(bullet);
});

// Other Players
let otherPlayers = {};

socket.on("players", data => {
  for (let id in data) {
    if (!otherPlayers[id]) {
      let mesh = new THREE.Mesh(
        new THREE.BoxGeometry(2,2,2),
        new THREE.MeshStandardMaterial({color:0xff0000})
      );
      scene.add(mesh);
      otherPlayers[id] = mesh;
    }
    otherPlayers[id].position.set(data[id].x, data[id].y, data[id].z);
  }
});

function animate() {
  requestAnimationFrame(animate);

  let speed = 0.2;

  if (moveForward) controls.moveForward(speed);
  if (moveBackward) controls.moveForward(-speed);
  if (moveLeft) controls.moveRight(-speed);
  if (moveRight) controls.moveRight(speed);

  bullets.forEach(b => {
    b.position.add(b.velocity);
  });

  socket.emit("move", {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  });

  renderer.render(scene, camera);
}
animate();
