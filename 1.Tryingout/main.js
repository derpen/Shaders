import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

const container = document.getElementById( 'container' );
//document.body.appendChild(renderer.domElement);
container.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry( 1, 1 );

const material = new THREE.ShaderMaterial({
    uniforms: {
	u_time : { value: 1.0 },
	u_resolution : { value: new THREE.Vector2(window.innerWidth, window.innerHeight)}
    },

    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
})

// const plane = new THREE.Mesh( geometry, material );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

// Position the camera
camera.position.z = 5;

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
