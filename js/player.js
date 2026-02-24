let player;
function createPlayer(scene){
    let geo = new THREE.BoxGeometry(2,2,2);
    let mat = new THREE.MeshBasicMaterial({color: 0x0000ff});
    player = new THREE.Mesh(geo, mat);
    player.position.y = 1;
    scene.add(player);
}
