/*
 ███████╗ ██████╗███████╗███╗   ██╗███████╗    ███████╗███████╗████████╗██╗   ██╗██████╗ 
 ██╔════╝██╔════╝██╔════╝████╗  ██║██╔════╝    ██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗
 ███████╗██║     █████╗  ██╔██╗ ██║█████╗      ███████╗█████╗     ██║   ██║   ██║██████╔╝
 ╚════██║██║     ██╔══╝  ██║╚██╗██║██╔══╝      ╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝ 
 ███████║╚██████╗███████╗██║ ╚████║███████╗    ███████║███████╗   ██║   ╚██████╔╝██║     
 ╚══════╝ ╚═════╝╚══════╝╚═╝  ╚═══╝╚══════╝    ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝     
*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", onWindowResize, false);
//BOUNDS
let xMaxBound = window.innerWidth / 23;
let xMinBound = xMaxBound * -1;
let zMaxBound = window.innerHeight / 20;
let zMinBound = zMaxBound * -1;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  xMaxBound = window.innerWidth / 23;
  xMinBound = xMaxBound * -1;
  zMaxBound = window.innerHeight / 20;
  zMinBound = zMaxBound * -1;
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let cameraDistance = 45;
let cameraHeight = camera.position.y;
camera.position.y = cameraDistance;
camera.rotation.x = -1.5;

let gameOver = false;
let kills = 0;
let deaths = 0;

/*
 ██████╗  █████╗  ██████╗██╗  ██╗ ██████╗ ██████╗  ██████╗ ██╗   ██╗███╗   ██╗██████╗ 
 ██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝ ██╔══██╗██╔═══██╗██║   ██║████╗  ██║██╔══██╗
 ██████╔╝███████║██║     █████╔╝ ██║  ███╗██████╔╝██║   ██║██║   ██║██╔██╗ ██║██║  ██║
 ██╔══██╗██╔══██║██║     ██╔═██╗ ██║   ██║██╔══██╗██║   ██║██║   ██║██║╚██╗██║██║  ██║
 ██████╔╝██║  ██║╚██████╗██║  ██╗╚██████╔╝██║  ██║╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ 
*/

const starMaterial = new THREE.MeshPhongMaterial({
  emissive: `#FFFFFF`,
});
for (let i = 0; i < 2000; i++) {
  let cubeSize = Math.random() / 10;
  const starGeometry = new THREE.IcosahedronGeometry(cubeSize, 2);

  let star = new THREE.Mesh(starGeometry, starMaterial);
  star.position.x = Math.floor(Math.random() * 500) - 250;
  star.position.y = Math.floor(Math.random() * 10) - 5;
  star.position.z = Math.floor(Math.random() * 500) - 250;
  scene.add(star);
}

/*
 ██████╗ ██╗      █████╗ ██╗   ██╗███████╗██████╗ 
 ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗
 ██████╔╝██║     ███████║ ╚████╔╝ █████╗  ██████╔╝
 ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗
 ██║     ███████╗██║  ██║   ██║   ███████╗██║  ██║
 ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
*/
// SHIP is the object that controls the player's ship,
//player is the actual player body
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhongMaterial({ color: 0x0e83e8 });
const ship = new THREE.Mesh(geometry, transparencyMaterial);
ship.position.y = cameraDistance + 2;
scene.add(ship);

var playerShape = new THREE.BoxGeometry(2, 2, 2);
var transparencyMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 });
var player = new THREE.Mesh(playerShape, material);
scene.add(player);

const playerBox = new THREE.Box3().setFromObject(player);
/*
 ███████╗███╗   ██╗███████╗███╗   ███╗██╗███████╗███████╗
 ██╔════╝████╗  ██║██╔════╝████╗ ████║██║██╔════╝██╔════╝
 █████╗  ██╔██╗ ██║█████╗  ██╔████╔██║██║█████╗  ███████╗
 ██╔══╝  ██║╚██╗██║██╔══╝  ██║╚██╔╝██║██║██╔══╝  ╚════██║
 ███████╗██║ ╚████║███████╗██║ ╚═╝ ██║██║███████╗███████║
 ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝╚═╝╚══════╝╚══════╝
*/

function enemySpawn() {
  //RESPAWN CODE
  let xRespawnBound = Math.random() * xMaxBound * 2 - xMaxBound;
  let zRespawnBound = Math.random() * zMaxBound * 2 - zMaxBound;

  const enemyGeometry = new THREE.SphereGeometry(1, 32, 32);
  const enemyMaterial = new THREE.MeshPhongMaterial({ color: 0xeb02be });
  enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
  enemy.position.set(xRespawnBound, 0, zRespawnBound);
  scene.add(enemy);
}
for (let i = 0; i < 1; i++) {
  enemySpawn();
}
/*
 ██╗     ██╗ ██████╗ ██╗  ██╗████████╗██╗███╗   ██╗ ██████╗ 
 ██║     ██║██╔════╝ ██║  ██║╚══██╔══╝██║████╗  ██║██╔════╝ 
 ██║     ██║██║  ███╗███████║   ██║   ██║██╔██╗ ██║██║  ███╗
 ██║     ██║██║   ██║██╔══██║   ██║   ██║██║╚██╗██║██║   ██║
 ███████╗██║╚██████╔╝██║  ██║   ██║   ██║██║ ╚████║╚██████╔╝
 ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
*/
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);
/*
 ███████╗██╗   ██╗███████╗███╗   ██╗████████╗    ██╗     ██╗███████╗████████╗
 ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝    ██║     ██║██╔════╝╚══██╔══╝
 █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║       ██║     ██║███████╗   ██║   
 ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║       ██║     ██║╚════██║   ██║   
 ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║       ███████╗██║███████║   ██║██╗
 ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚══════╝╚═╝╚══════╝   ╚═╝╚═╝
*/
const keys = {};
document.addEventListener("keydown", (event) => {
  keys[event.code] = true;
});
document.addEventListener("keyup", (event) => {
  keys[event.code] = false;
});
/*
███████╗██╗  ██╗ ██████╗  ██████╗ ████████╗
██╔════╝██║  ██║██╔═══██╗██╔═══██╗╚══██╔══╝
███████╗███████║██║   ██║██║   ██║   ██║   
╚════██║██╔══██║██║   ██║██║   ██║   ██║   
███████║██║  ██║╚██████╔╝╚██████╔╝   ██║   
╚══════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   
*/
const bulletGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 20);
const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
let bullet = null;
const bulletSpeed = 1;
const maxBulletDistance = 30;
/*
  ██████╗  █████╗ ███╗   ███╗███████╗    ██╗      ██████╗  ██████╗ ██╗ ██████╗
 ██╔════╝ ██╔══██╗████╗ ████║██╔════╝    ██║     ██╔═══██╗██╔════╝ ██║██╔════╝
 ██║  ███╗███████║██╔████╔██║█████╗      ██║     ██║   ██║██║  ███╗██║██║     
 ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ██║     ██║   ██║██║   ██║██║██║     
 ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ███████╗╚██████╔╝╚██████╔╝██║╚██████╗
  ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝    ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝ ╚═════╝
*/
function animate() {
  requestAnimationFrame(animate);

  let controlSpeed = 0.5;

  let accel = 0.01;
  let initialPull = 0.01;
  let enemyPull = 0.001;
  // Move control box that pulls the player
  if (keys["ArrowUp"]) {
    ship.position.z -= controlSpeed;
  }
  if (keys["ArrowDown"]) {
    ship.position.z += controlSpeed;
  }
  if (keys["ArrowLeft"]) {
    ship.position.x -= controlSpeed;
  }
  if (keys["ArrowRight"]) {
    ship.position.x += controlSpeed;
  }
  if (keys["KeyP"]) {
    ship.position.set(0, 0, 0);
  }
  if (keys["KeyL"]) {
    ship.position.set(0, cameraDistance + 2, 0);
  }
  if (keys["KeyI"]) {
    cameraDistance += 1;
    camera.position.set(0, cameraDistance, 0);
    ship.position.set(0, cameraDistance + 2, 0);
  }
  if (keys["KeyO"]) {
    cameraDistance -= 1;
    camera.position.set(0, cameraDistance, 0);
    ship.position.set(0, cameraDistance + 2, 0);
  }

  if (player) {
    player.position.z -= player.position.z * accel;
    player.position.z += player.position.z * accel;
    player.position.x -= player.position.x * accel;
    player.position.x += player.position.x * accel;
  }
  //BOUNDING ETERNITY
  if (player.position.x > xMaxBound) {
    player.position.set(xMinBound, 0, player.position.z);
  }
  if (player.position.x < xMinBound) {
    player.position.set(xMaxBound, 0, player.position.z);
  }
  if (player.position.z > zMaxBound) {
    player.position.set(player.position.x, 0, zMinBound);
  }
  if (player.position.z < zMinBound) {
    player.position.set(player.position.x, 0, zMaxBound);
  }

  if (enemy.position.x > xMaxBound) {
    enemy.position.set(xMinBound, 0, enemy.position.z);
  }
  if (enemy.position.x < xMinBound) {
    enemy.position.set(xMaxBound, 0, enemy.position.z);
  }
  if (enemy.position.z > zMaxBound) {
    enemy.position.set(enemy.position.x, 0, zMinBound);
  }
  if (enemy.position.z < zMinBound) {
    enemy.position.set(enemy.position.x, 0, zMaxBound);
  }
  //BOUNDING END

  if (keys["Space"]) {
    if (!bullet) {
      const bulletDirection = new THREE.Vector3(0, 0, -1);
      bulletDirection.applyQuaternion(player.quaternion);
      bulletDirection.normalize();

      bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
      bullet.position.copy(player.position);
      bullet.position.y += 1;
      bullet.rotation.x = 1.5;
      scene.add(bullet);

      bullet.velocity = bulletDirection.clone().multiplyScalar(bulletSpeed);
      bullet.distanceTraveled = 0;
    }
  }
  if (enemy) {
    //follow player, kind of.
    enemy.position.x += player.position.x * initialPull;
    enemy.position.z += player.position.z * initialPull;
    enemy.position.x -= ship.position.x * enemyPull;
    enemy.position.z -= ship.position.z * enemyPull;
  }
  if (player) {
    player.position.x += ship.position.x * initialPull;
    player.position.z += ship.position.z * initialPull;
  }
  if (true) {
    scene.position.x += 0.0001;
    scene.position.z += 0.0001;
  }

  if (enemy.position.distanceTo(player.position) < 2) {
    console.log("GAME OVER");
    gameOver = true;
    deaths += 1;
  }

  if (bullet) {
    bullet.position.add(bullet.velocity);
    bullet.distanceTraveled += bulletSpeed;

    if (bullet.position.distanceTo(enemy.position) < 2) {
      scene.remove(enemy);
      kills += 1;
      enemy = null;
      enemySpawn();

      scene.remove(bullet);
      bullet = null;
    }

    // Remove bullet if it goes out of bounds
    if (bullet.distanceTraveled > maxBulletDistance) {
      scene.remove(bullet);
      bullet = null;
    }
  }

  // Render the scene
  renderer.render(scene, camera);
}
animate();

/*
 ██╗  ██╗    ██╗███████╗    ██████╗               ██╗     
 ╚██╗██╔╝    ██║██╔════╝    ██╔══██╗              ██║     
  ╚███╔╝     ██║███████╗    ██████╔╝    █████╗    ██║     
  ██╔██╗     ██║╚════██║    ██╔══██╗    ╚════╝    ██║     
 ██╔╝ ██╗    ██║███████║    ██║  ██║              ███████╗
 ╚═╝  ╚═╝    ╚═╝╚══════╝    ╚═╝  ╚═╝              ╚══════╝
*/

/*
 ███████╗    ██╗███████╗    ██╗   ██╗              ██████╗ 
 ╚══███╔╝    ██║██╔════╝    ██║   ██║              ██╔══██╗
   ███╔╝     ██║███████╗    ██║   ██║    █████╗    ██║  ██║
  ███╔╝      ██║╚════██║    ██║   ██║    ╚════╝    ██║  ██║
 ███████╗    ██║███████║    ╚██████╔╝              ██████╔╝
 ╚══════╝    ╚═╝╚══════╝     ╚═════╝               ╚═════╝ 
*/
