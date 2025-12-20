// Imports para Three.js desde CDN
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { ARButton } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/webxr/ARButton.js';

// Variables globales
let scene, camera, renderer;
let cube;
let isARSupported = false;

// Referencias a elementos del DOM
const container = document.getElementById('container');
const statusElement = document.getElementById('status');
const arButton = document.getElementById('arButton');

// Inicializar la aplicación
init();

async function init() {
    try {
        updateStatus('Inicializando Three.js...');
        
        // Crear escena
        scene = new THREE.Scene();
        
        // Crear cámara
        camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.01,
            20
        );
        
        // Crear renderer
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.xr.enabled = true;
        container.appendChild(renderer.domElement);
        
        // Verificar soporte WebXR
        checkARSupport();
        
        // Crear iluminación
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 1, 1);
        scene.add(directionalLight);
        
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
        
        // Manejar resize
        window.addEventListener('resize', onWindowResize);
        
        updateStatus('Listo. Presiona "Iniciar AR" para comenzar.');
        
        // Iniciar el loop de animación
        renderer.setAnimationLoop(animate);
        
    } catch (error) {
        console.error('Error al inicializar:', error);
        updateStatus('Error: ' + error.message);
    }
}

async function checkARSupport() {
    if ('xr' in navigator) {
        try {
            const supported = await navigator.xr.isSessionSupported('immersive-ar');
            isARSupported = supported;
            
            if (supported) {
                // Crear botón AR oficial de Three.js
                const button = ARButton.createButton(renderer, {
                    requiredFeatures: ['hit-test'],
                    optionalFeatures: ['dom-overlay'],
                    domOverlay: { root: document.getElementById('info') }
                });
                
                // Reemplazar el botón custom con el oficial
                arButton.style.display = 'none';
                document.body.appendChild(button);
                
                updateStatus('AR disponible. Presiona el botón para iniciar.');
            } else {
                updateStatus('AR no soportado en este dispositivo.');
                arButton.disabled = true;
            }
        } catch (error) {
            console.error('Error verificando soporte AR:', error);
            updateStatus('No se pudo verificar soporte AR.');
            arButton.disabled = true;
        }
    } else {
        updateStatus('WebXR no disponible en este navegador.');
        arButton.disabled = true;
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function updateStatus(message) {
    if (statusElement) {
        statusElement.textContent = message;
    }
    console.log(message);
}

function animate(timestamp, frame) {
    // Rotar el cubo
    if (cube) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }
    
    // En modo AR, usar el frame para colocar objetos
    if (frame) {
        // Aquí podrías agregar lógica de hit-test para colocar el cubo
        // en superficies detectadas
    }
    
    renderer.render(scene, camera);
}