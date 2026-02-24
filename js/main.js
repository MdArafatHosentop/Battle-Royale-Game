let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ground
let groundGeo = new THREE.PlaneGeometry(500, 500);
let groundMat = new THREE.MeshBasicMaterial({color: 0x228B22});
let ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

createPlayer(scene);
updateZone();

camera.position.set(0,5,10);

document.addEventListener("keydown", e=>{
    if(e.key=="w") player.position.z -= 1;
    if(e.key=="s") player.position.z += 1;
    if(e.key=="a") player.position.x -= 1;
    if(e.key=="d") player.position.x += 1;

    if(e.key=="r") reload();
});

document.addEventListener("click", shoot);

function animate(){
    requestAnimationFrame(animate);
    camera.lookAt(player.position);
    renderer.render(scene, camera);
}
animate();
