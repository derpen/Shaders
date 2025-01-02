import * as THREE from 'three';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0.1, 0.1, 0.1);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

const container = document.getElementById( 'container' );
container.appendChild(renderer.domElement);

const links = document.getElementById( 'links-to-others' );

const linksData = [
    {text: 'Box', href:'index.html'},
    {text: 'Circle', href:'circle.html'},    
];

const ulElement = document.createElement('ul');

linksData.forEach(link => {
    const liElement = document.createElement('li');
    const aElement = document.createElement('a');
    aElement.href = link.href;
    aElement.textContent = link.text;
    liElement.appendChild(aElement);
    ulElement.appendChild(liElement);
});

links.appendChild(ulElement);

const geometry = new THREE.PlaneGeometry( 2, 2 );

const material = new THREE.ShaderMaterial({
    uniforms: {
	u_time : { value: 1.0 },
    },

    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    // side: THREE.DoubleSide // Not needed honestly, unless I want rotation
})

// const plane = new THREE.Mesh( geometry, material );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

// Position the camera
camera.position.z = 2;

// Resize handler
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

// Animation loop
function animate(time) {
    // //Rotation !!! Enable DoubleSide in shaders if doing so
    // plane.rotation.x += 0.01;
    // plane.rotation.y += 0.01;    
    material.uniforms.u_time.value = time * 0.001; // Convert to seconds
    renderer.render(scene, camera);
}
