// Three.js scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x1a0033);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Create orbs with blue halo
const orbGroup = new THREE.Group();
const orbCount = 4;
const orbRadius = 0.3;
const orbitRadius = 1.5;

const orbColor = 0xffffff; // White color for orbs
const haloColor = 0x4444ff; // Blue color for halo

for (let i = 0; i < orbCount; i++) {
    const geometry = new THREE.SphereGeometry(orbRadius, 32, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: orbColor,
        shininess: 100,
        specular: 0xffffff
    });
    const orb = new THREE.Mesh(geometry, material);
    
    // Add blue halo
    const haloGeometry = new THREE.SphereGeometry(orbRadius * 1.2, 32, 32);
    const haloMaterial = new THREE.MeshBasicMaterial({
        color: haloColor,
        transparent: true,
        opacity: 0.5
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    orb.add(halo);
    
    const angle = (i / orbCount) * Math.PI * 2;
    orb.position.x = Math.cos(angle) * orbitRadius;
    orb.position.y = Math.sin(angle) * orbitRadius;
    
    orbGroup.add(orb);
}
scene.add(orbGroup);

// Create stars
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 5000;
const positions = new Float32Array(starsCount * 3);
const velocities = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;

    velocities[i] = (Math.random() - 0.5) * 0.01;
    velocities[i + 1] = (Math.random() - 0.5) * 0.01;
    velocities[i + 2] = (Math.random() - 0.5) * 0.01;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const starsMaterial = new THREE.PointsMaterial({
    size: 0.01,
    color: 0xffffff
});
const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starsMesh);

camera.position.z = 5;

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Orb animation
    orbGroup.rotation.y = Math.sin(time * 0.5) * 0.5;
    orbGroup.rotation.x = Math.cos(time * 0.3) * 0.3;

    orbGroup.children.forEach((orb, index) => {
        orb.position.x = Math.cos(time + index * Math.PI / 2) * orbitRadius;
        orb.position.y = Math.sin(time + index * Math.PI / 2) * orbitRadius;
        orb.rotation.y += 0.02;
        orb.rotation.x += 0.01;
    });

    // Update star positions
    const positions = starsGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i] + mouseX * 0.001;
        positions[i + 1] += velocities[i + 1] - mouseY * 0.001;
        positions[i + 2] += velocities[i + 2];

        if (Math.abs(positions[i]) > 10) positions[i] = -positions[i];
        if (Math.abs(positions[i + 1]) > 10) positions[i + 1] = -positions[i + 1];
        if (Math.abs(positions[i + 2]) > 10) positions[i + 2] = -positions[i + 2];
    }
    starsGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
