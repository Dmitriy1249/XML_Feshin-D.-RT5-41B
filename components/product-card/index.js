import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';


export class ProductCardComponent {
    render(product, parent, onOpen, onCopy, onDelete) {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card h-100">
                <canvas id="canvas-${product.id}" style="width:100%; height:200px;"></canvas>
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.text}</p>
                </div>
                <div class="card-footer bg-transparent">
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-sm btn-primary">Подробнее</button>
                        <div>
                            <button class="btn btn-sm btn-outline-secondary me-2">Копировать</button>
                            <button class="btn btn-sm btn-outline-danger">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const [detailsBtn, copyBtn, deleteBtn] = card.querySelectorAll('button');
        detailsBtn.addEventListener('click', () => onOpen(product));
        copyBtn.addEventListener('click', () => onCopy(product));
        deleteBtn.addEventListener('click', () => onDelete(product.id));

        parent.appendChild(card);

        // Three.js
        const canvas = card.querySelector(`#canvas-${product.id}`);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            canvas.offsetWidth / canvas.offsetHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        const loader = new GLTFLoader();
        loader.load(product.modelSrc, (gltf) => {
            scene.add(gltf.scene);
            gltf.scene.scale.set(0.5, 0.5, 0.5);
            gltf.scene.position.y = -0.5;

            function animate() {
                requestAnimationFrame(animate);
                gltf.scene.rotation.y += 0.01;
                renderer.render(scene, camera);
            }
            animate();
        });
    }
}
