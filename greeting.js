import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    1,
    0.1,
    1000
);
camera.position.set(0,0,50);
camera.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(320,400);
document.getElementById('sphere').appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
const positionAttribute = geometry.attributes.position;
const colors = [];

for(let i=0; i<positionAttribute.count;i++){
    const goldShades = [
        new THREE.Color(0xffd700), // Gold
        new THREE.Color(0xffc107), // Amber Gold
        new THREE.Color(0xffe4b5), // Pale Gold
        new THREE.Color(0xfcd440), // Bright Gold
    ];

    const randomColor = goldShades[Math.floor(Math.random() * goldShades.length)];
    colors.push(randomColor.r, randomColor.g, randomColor.b);
}

geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

const material = new THREE.MeshBasicMaterial( { vertexColors: true,flatShading: true} ); 
const sphere = new THREE.Mesh( geometry, material );
sphere.position.set(-18,0,0);
scene.add( sphere );

const wireframe = new THREE.WireframeGeometry(geometry);
const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff});
const wireframeMesh = new THREE.LineSegments(wireframe, wireframeMaterial);
wireframeMesh.position.set(-18,0,0);
scene.add(wireframeMesh);


function animate(){
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.01;
    wireframeMesh.rotation.y += 0.01;
    renderer.render(scene,camera);
}

animate();

function createGlitter() {
    const container = document.querySelector('.container');
    const numParticles = 40;

    for (let i = 0; i < numParticles; i++) {
        const glitter = document.createElement('div');
        glitter.classList.add('glitter');

        // Random positions around the year text
        const x = Math.random() * window.innerWidth - 50;
        const y = Math.random() * window.innerHeight - 50;

        glitter.style.left = `${x}px`;
        glitter.style.top = `${y}px`;
        glitter.style.animationDuration = `${Math.random() * 2 + 1}s`; // Random animation duration

        container.appendChild(glitter);

        // Remove glitter after animation ends
        setTimeout(() => glitter.remove(), 3000);
    }
}

// Create glitter continuously
setInterval(createGlitter, 1000);