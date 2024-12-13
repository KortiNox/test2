import './style.css';
import * as THREE from 'three';
import GUI from 'lil-gui';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas.threejs');
  // ... остальной код вашей инициализации Three.js ...

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 400);

  camera.position.z = 100;
  camera.position.y = 5;

  const rerender = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true, // убирае м эффект лестницы из коробки
    alpha: true,
  });
  rerender.setSize(window.innerWidth, window.innerHeight);
  const maxPixelRatio = Math.min(window.devicePixelRatio, 2); // убираем эффект лестницы вручную ч1
  rerender.setPixelRatio(maxPixelRatio);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    rerender.setSize(window.innerWidth, window.innerHeight);
  });

  //light
  const directionalLight = new THREE.DirectionalLight('white', 0.5);
  //scene.add(directionalLight);
  const ambiendLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambiendLight);
  const pointLight = new THREE.PointLight('white', 140);
  pointLight.intensity *= 6; // увеличение яркости
  scene.add(pointLight);

  //add curse
  const material = new THREE.MeshToonMaterial({ color: 'brown' });
  //cube
  const cubGeometry = new THREE.BoxGeometry(30, 30, 30);
  const cub = new THREE.Mesh(cubGeometry, material);
  scene.add(cub);

  //cube2
  const cubGeometry2 = new THREE.BoxGeometry(32, 22, 24);

  const cub2 = new THREE.Mesh(cubGeometry2, material);
  cub2.rotation.set(10, 5, 5);
  scene.add(cub2);

  //cube3
  const cubGeometry3 = new THREE.BoxGeometry(10, 10, 10);

  const cub3 = new THREE.Mesh(cubGeometry3, material);
  cub3.rotation.set(3, 2, 3);
  scene.add(cub3);

  const renderLoop = () => {
    rerender.render(scene, camera);
    window.requestAnimationFrame(renderLoop);
  };

  //
  //*
  const gui = new GUI();

  gui.add(cub3.position, 'x').min(-50).max(50).step(10);

  //*
  //

  renderLoop();
});
