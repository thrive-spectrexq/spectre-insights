<template>
  <div class="animation-container" ref="container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const container = ref(null);
let scene, camera, renderer, particleSystem, fluidSimulation, controls;
let composer, textMesh;

// Initialize 3D Scene with Interactive Particles, Fluid Simulations, and Animated Text
const init3DScene = () => {
  // Scene Setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, container.value.offsetWidth / container.value.offsetHeight, 0.1, 1000);
  camera.position.z = 10;

  renderer = new THREE.WebGLRenderer({ canvas: container.value.querySelector('canvas'), antialias: true });
  renderer.setSize(container.value.offsetWidth, container.value.offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio); // Ensure high DPI displays work

  // OrbitControls for interactivity
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;

  // Particle System Setup
  const particleCount = 1000;
  const particles = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 50;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }

  particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.1 }); // Green color for particles

  particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);

  // Fluid-like Simulation
  const fluidGeometry = new THREE.BufferGeometry();
  const fluidCount = 500;
  const fluidPositions = new Float32Array(fluidCount * 3);

  for (let i = 0; i < fluidCount; i++) {
    fluidPositions[i * 3] = (Math.random() - 0.5) * 50;
    fluidPositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    fluidPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }

  fluidGeometry.setAttribute('position', new THREE.BufferAttribute(fluidPositions, 3));
  const fluidMaterial = new THREE.PointsMaterial({ color: 0x8A2BE2, size: 0.2 }); // Violet Blue color for fluid
  fluidSimulation = new THREE.Points(fluidGeometry, fluidMaterial);
  scene.add(fluidSimulation);

  // Load Font for 3D Text
  const fontLoader = new FontLoader();
  fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json', 
    (font) => {
      const textGeometry = new TextGeometry('Spectre Insights', {
        font: font,
        size: 2,
        depth: 0.1,  // Use depth instead of height
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      // Change text color to blue
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White color
      const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue outline

      textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(5, 0, 0); // Start from the right side
      scene.add(textMesh);

      // Create outline
      const outlineMesh = new THREE.Mesh(textGeometry, outlineMaterial);
      outlineMesh.scale.set(1.02, 1.02, 1.02); // Slightly larger to create an outline effect
      textMesh.add(outlineMesh); // Add outline as a child of the text mesh
    },
    undefined,
    (error) => {
      console.error('Error loading font:', error);
    }
  );

  // Ambient and Directional Light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Lower ambient light intensity
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Lower directional light intensity
  directionalLight.position.set(0, 1, 1).normalize();
  scene.add(directionalLight);

  // Post-processing setup for glow effect
  composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  composer.addPass(bloomPass);

  // Animation Loop
  const animate = () => {
    requestAnimationFrame(animate);

    // Rotate particles
    particleSystem.rotation.x += 0.001;
    particleSystem.rotation.y += 0.001;

    // Simulate fluid movement
    fluidSimulation.rotation.x += 0.002;
    fluidSimulation.rotation.y += 0.002;

    // Animate text from right to left, only if textMesh is defined
    if (textMesh) {
      if (textMesh.position.x > -17) {
        textMesh.position.x -= 0.01; // Move left
      } else {
        textMesh.position.x = 7; // Reset to the right
      }
    }

    // Render the scene with post-processing
    composer.render();
  };

  animate();
};

// Handle window resize
const onWindowResize = () => {
  if (renderer) {
    camera.aspect = container.value.offsetWidth / container.value.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.value.offsetWidth, container.value.offsetHeight);
    composer.setSize(container.value.offsetWidth, container.value.offsetHeight);
  }
};

// Mount and Unmount Hooks
onMounted(() => {
  init3DScene();
  window.addEventListener('resize', onWindowResize);
});

onBeforeUnmount(() => {
  // Cleanup resources to avoid memory leaks
  if (renderer) {
    renderer.dispose();
  }
  if (scene) {
    scene.dispose();
  }
  window.removeEventListener('resize', onWindowResize);
});
</script>

<style scoped>
.animation-container {
  width: 100%;
  height: 600px;
  position: relative;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
