# Cubo AR con Three.js

Ejemplo sencillo de realidad aumentada usando Three.js y WebXR.

## 🚀 Características

- Cubo 3D en realidad aumentada
- Rotación automática del cubo
- Soporte WebXR
- Interfaz simple y responsive

## 📋 Requisitos

Para probar AR necesitas:
- Un dispositivo compatible con WebXR (smartphone Android con ARCore o iPhone con AR)
- Navegador compatible: Chrome/Edge para Android, Safari para iOS
- HTTPS o localhost (WebXR requiere conexión segura)

## 🔧 Uso

1. Abre `index.html` en un servidor web con HTTPS
2. Permite los permisos de cámara cuando se solicite
3. Pulsa el botón "Iniciar AR"
4. Apunta la cámara a una superficie plana
5. Verás el cubo verde rotando en AR

## 🛠️ Servidor Local

Para probar localmente, puedes usar:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000`

## 📝 Personalización

### Cambiar el color del cubo
```javascript
const material = new THREE.MeshStandardMaterial({
    color: 0xff0000, // Cambia a rojo
    roughness: 0.7,
    metalness: 0.3
});
```

### Cambiar el tamaño del cubo
```javascript
const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3); // Más grande
```

### Añadir tu propio modelo 3D

En lugar del cubo, puedes cargar un modelo GLTF:

```javascript
// Añade el loader
const loader = new THREE.GLTFLoader();

// Carga tu modelo
loader.load('tu-modelo.glb', (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, -0.5);
    scene.add(model);
});
```

## 📱 Pruebas

- **Android**: Chrome o Edge
- **iOS**: Safari (iOS 13+)
- **Desktop**: No soporta AR, solo vista previa del cubo

## 🔗 Recursos

- [Three.js Documentation](https://threejs.org/docs/)
- [WebXR Device API](https://www.w3.org/TR/webxr/)
- [Three.js Examples](https://threejs.org/examples/)