let camera, scene, renderer;
let cube;
const container = document.getElementById('container');
const arButton = document.getElementById('arButton');
const statusText = document.getElementById('status');

init();
animate();

function init() {
    // Crear escena
    scene = new THREE.Scene();

    // Configurar cámara
    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        20
    );

    // Crear luz
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    // Crear cubo
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        roughness: 0.7,
        metalness: 0.3
    });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, -0.5);
    scene.add(cube);

    // Configurar renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    // Verificar soporte de WebXR
    if ('xr' in navigator) {
        navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
            if (supported) {
                arButton.disabled = false;
                arButton.textContent = 'Iniciar AR';
                statusText.textContent = 'AR disponible - Pulsa el botón para comenzar';
                
                arButton.addEventListener('click', onARButtonClick);
            } else {
                statusText.textContent = 'AR no soportado en este dispositivo';
            }
        }).catch((err) => {
            statusText.textContent = 'Error al verificar soporte AR: ' + err.message;
        });
    } else {
        statusText.textContent = 'WebXR no disponible en este navegador';
    }

    // Manejar redimensionamiento
    window.addEventListener('resize', onWindowResize);
}

async function onARButtonClick() {
    try {
        // Configuración de la sesión AR
        const sessionInit = {
            requiredFeatures: ['hit-test'],
            optionalFeatures: ['dom-overlay'],
            domOverlay: { root: document.body }
        };

        const session = await navigator.xr.requestSession('immersive-ar', sessionInit);
        renderer.xr.setSession(session);

        session.addEventListener('end', () => {
            arButton.textContent = 'Iniciar AR';
            statusText.textContent = 'Sesión AR finalizada';
        });

        arButton.textContent = 'Detener AR';
        statusText.textContent = 'Sesión AR activa';

    } catch (err) {
        statusText.textContent = 'Error al iniciar AR: ' + err.message;
        console.error('Error AR:', err);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    // Rotar el cubo para que sea más visible
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
