<template>
  <div class="animation-container" ref="container">
    <canvas ref="canvas" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Orbit controls for mouse/touch interaction

const container = ref(null);
let scene, camera, renderer, cube, particleSystem, morphTarget, controls, textMesh;

// Initialize 3D Scene
const init3DScene = () => {
  // Scene setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, container.value.offsetWidth / container.value.offsetHeight, 0.1, 1000);
  camera.position.z = 10;

  renderer = new THREE.WebGLRenderer({ canvas: container.value.querySelector('canvas'), antialias: true });
  renderer.setSize(container.value.offsetWidth, container.value.offsetHeight);

  container.value.appendChild(renderer.domElement);

  // OrbitControls for mouse/touch interaction
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true; // Allow zooming

  // Create Cube (for Morphing)
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, wireframe: true });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Morph Target - Sphere
  const sphereGeometry = new THREE.SphereGeometry(1, 12, 12);
  morphTarget = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ color: 0x0000ff, wireframe: true }));
  morphTarget.position.set(3, 0, 0);
  scene.add(morphTarget);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 1, 1).normalize();
  scene.add(directionalLight);

  // Particle System (AI Data Stream Effect)
  const particleCount = 500;
  const particles = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 20;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.1 });
  particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);

  // 3D Text Overlay ("AI-Powered Solutions")
  const fontLoader = new FontLoader();
  fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('AI-Powered Solutions', {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: false,
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-3, 2, 0);
    scene.add(textMesh);
  });

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);

    // Rotate cube & morphTarget
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    morphTarget.rotation.x -= 0.01;
    morphTarget.rotation.y -= 0.01;

    // Particles animation (AI data flow simulation)
    particleSystem.rotation.y += 0.001;

    // Update controls for interactions
    controls.update();

    // Render Scene
    renderer.render(scene, camera);
  };

  animate();
};

// Mount and Unmount Hooks
onMounted(() => {
  init3DScene();
});

onBeforeUnmount(() => {
  // Dispose resources to avoid memory leaks
  renderer.dispose();
  scene.dispose();
});
</script>

<style scoped>
.animation-container {
  width: 100%; /* Full width */
  height: 600px; /* Increased height */
  position: relative;
}
canvas {
  width: 100%; /* Ensure canvas fills the container */
  height: 100%; /* Ensure canvas fills the container */
}
</style>
