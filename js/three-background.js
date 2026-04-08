import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
import { EffectComposer } from 'https://unpkg.com/three@0.164.1/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.164.1/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.164.1/examples/jsm/postprocessing/UnrealBloomPass.js';
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const mount = document.createElement('div');
mount.className = 'site-3d-bg';

const canvas = document.createElement('canvas');
canvas.className = 'site-3d-canvas';

const vignette = document.createElement('div');
vignette.className = 'site-3d-vignette';

mount.appendChild(canvas);
mount.appendChild(vignette);
document.body.prepend(mount);

function activateFallback(reason) {
  document.body.classList.add('three-bg-fallback');
  mount.setAttribute('data-fallback', 'true');
  console.warn('3D background fallback activated:', reason);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0.4, 11.8);

let renderer;
let canRender = true;

try {
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
} catch (error) {
  activateFallback(error && error.message ? error.message : 'Renderer initialization failed');
  canRender = false;
}

if (!canRender) {
  // Keep CSS fallback only and stop this module safely.
  throw new Error('WebGL renderer unavailable: using CSS fallback background.');
}

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

if (!renderer.capabilities.isWebGL2 && !renderer.capabilities.isWebGL) {
  activateFallback('WebGL not available');
}

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(
  new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    prefersReducedMotion ? 0.45 : 1.05,
    0.72,
    0.08
  )
);

const ambient = new THREE.AmbientLight(0x75b8cc, 0.48);
scene.add(ambient);

const keyLight = new THREE.PointLight(0x00e5ff, 4.3, 70, 2);
keyLight.position.set(5.2, 4, 6.8);
scene.add(keyLight);

const fillLight = new THREE.PointLight(0x3ea6ff, 1.7, 55, 2);
fillLight.position.set(-5.5, -3.4, 4.5);
scene.add(fillLight);

const coreGroup = new THREE.Group();
scene.add(coreGroup);

const heroGeometry = new THREE.TorusKnotGeometry(2.4, 0.6, 220, 28);
const heroMaterial = new THREE.MeshStandardMaterial({
  color: 0x00dfff,
  metalness: 0.62,
  roughness: 0.24,
  emissive: 0x00b8ff,
  emissiveIntensity: 0.45
});

const heroMesh = new THREE.Mesh(heroGeometry, heroMaterial);
heroMesh.position.set(0.15, 0.2, -3.2);
scene.add(heroMesh);

const heroWire = new THREE.LineSegments(
  new THREE.WireframeGeometry(heroGeometry),
  new THREE.LineBasicMaterial({ color: 0x87f7ff, transparent: true, opacity: 0.35 })
);
heroWire.position.copy(heroMesh.position);
scene.add(heroWire);

function addOrb({ scale, color, position, speed }) {
  const geometry = new THREE.IcosahedronGeometry(scale, 12);
  const material = new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.28,
    metalness: 0.08,
    transmission: 0.2,
    thickness: 1,
    transparent: true,
    opacity: 0.82,
    clearcoat: 1,
    clearcoatRoughness: 0.22,
    emissive: color,
    emissiveIntensity: 0.13
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(position.x, position.y, position.z);
  mesh.userData.speed = speed;

  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(geometry),
    new THREE.LineBasicMaterial({
      color: 0x7defff,
      transparent: true,
      opacity: 0.19
    })
  );

  mesh.add(wire);
  coreGroup.add(mesh);
}

addOrb({
  scale: 2.35,
  color: 0x00d9ff,
  position: { x: -2.6, y: -0.3, z: -1.7 },
  speed: 0.11
});

addOrb({
  scale: 1.8,
  color: 0x11b0ff,
  position: { x: 2.15, y: 1.05, z: -2.8 },
  speed: -0.16
});

addOrb({
  scale: 1.45,
  color: 0x63edff,
  position: { x: 0.75, y: -1.9, z: -1.2 },
  speed: 0.14
});

const starsGeometry = new THREE.BufferGeometry();
const starsCount = prefersReducedMotion ? 520 : 1100;
const starsPositions = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount; i += 1) {
  const i3 = i * 3;
  starsPositions[i3] = (Math.random() - 0.5) * 46;
  starsPositions[i3 + 1] = (Math.random() - 0.5) * 30;
  starsPositions[i3 + 2] = (Math.random() - 0.5) * 25 - 4;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));

const starsMaterial = new THREE.PointsMaterial({
  color: 0x79f0ff,
  size: 0.038,
  transparent: true,
  opacity: 0.55,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

const mouseTarget = { x: 0, y: 0 };
const mouseSmooth = { x: 0, y: 0 };
const scrollState = { value: 0 };

window.addEventListener('pointermove', (event) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = (event.clientY / window.innerHeight) * 2 - 1;

  mouseTarget.x = x;
  mouseTarget.y = y;

  gsap.to(mouseSmooth, {
    x: mouseTarget.x,
    y: mouseTarget.y,
    duration: prefersReducedMotion ? 1 : 0.7,
    ease: 'power2.out',
    overwrite: true
  });
});

window.addEventListener(
  'scroll',
  () => {
    const scrollMax = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = window.scrollY / scrollMax;

    gsap.to(scrollState, {
      value: progress,
      duration: prefersReducedMotion ? 1.2 : 0.75,
      ease: 'power2.out',
      overwrite: true
    });
  },
  { passive: true }
);

const clock = new THREE.Clock();

function animate() {
  const elapsed = clock.getElapsedTime();

  heroMesh.rotation.x = elapsed * 0.22;
  heroMesh.rotation.y = elapsed * 0.36 + mouseSmooth.x * 0.12;
  heroWire.rotation.copy(heroMesh.rotation);

  coreGroup.children.forEach((mesh, index) => {
    const drift = mesh.userData.speed || 0.1;
    mesh.rotation.x = elapsed * drift * 0.8;
    mesh.rotation.y = elapsed * drift;
    mesh.position.y += Math.sin(elapsed * 0.5 + index * 0.8) * 0.00085;
  });

  coreGroup.rotation.y = elapsed * 0.06 + mouseSmooth.x * 0.22 + scrollState.value * 0.45;
  coreGroup.rotation.x = mouseSmooth.y * -0.14;

  camera.position.x = mouseSmooth.x * 0.35;
  camera.position.y = 0.35 + mouseSmooth.y * -0.18 + scrollState.value * 0.18;
  camera.lookAt(0, 0, 0);

  stars.rotation.y = -elapsed * 0.026;
  stars.rotation.x = elapsed * 0.014;
  stars.position.y = -scrollState.value * 1.2;

  composer.render();
  requestAnimationFrame(animate);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', resize);
animate();