const socket = io();

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// FPS Controls
const controls = new THREE.PointerLockControls(camera, document.body);
document.body.addEventListener("click", ()=>{
  controls.lock();
});
scene.add(controls.getObject());

// Ground
let ground = new THREE.Mesh(
  new THREE.PlaneGeometry(500,500),
  new THREE.MeshBasicMaterial({color:0x228B22})
);
ground.rotation.x = -Math.PI/2;
scene.add(ground);

// Bullet Array
let bullets = [];

document.addEventListener("click", ()=>{
   let bullet = new THREE.Mesh(
     new THREE.SphereGeometry(0.2),
     new THREE.MeshBasicMaterial({color:0xffff00})
   );
   bullet.position.copy(camera.position);
   bullet.velocity = new THREE.Vector3();
   camera.getWorldDirection(bullet.velocity);
   bullet.velocity.multiplyScalar(2);
   scene.add(bullet);
   bullets.push(bullet);
});

function animate(){
 requestAnimationFrame(animate);

 bullets.forEach(b=>{
   b.position.add(b.velocity);
 });

 socket.emit("move", {
   x: camera.position.x,
   y: camera.position.y,
   z: camera.position.z
 });

 renderer.render(scene,camera);
}
animate();
