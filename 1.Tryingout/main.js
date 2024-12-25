import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Create a plane geometry
const geometry = new THREE.PlaneGeometry(1, 2);

// Vertex Shader
const vertexShader = `
  void main() {
    gl_Position = vec4( position, 1.0 );
  }
`;

// Fragment Shader
const fragmentShader = `
  uniform vec2 u_resolution;
  uniform float u_time;

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    gl_FragColor = vec4(st.x, st.y, 0.0, 1.0); // Simple gradient
  }
`;

// Shader Material with uniforms
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_time: { value: 0.0 }
  }
});

// Create a mesh with the plane geometry and shader material
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Position the camera
camera.position.z = 0;

// Resize handler
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

// Animation loop
function animate(time) {
    material.uniforms.u_time.value = time * 0.001; // Convert to seconds

    renderer.render(scene, camera);
}
