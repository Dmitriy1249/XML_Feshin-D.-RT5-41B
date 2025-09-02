import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class ProductCardComponent {
  render(product, parent, onOpen, onCopy, onDelete) {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
            <div class="card h-100" style="display: flex; flex-direction: column;">
                <canvas id="canvas-${product.id}" style="width:80%; height:300px; align-self: center"></canvas>
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

    const [detailsBtn, copyBtn, deleteBtn] = card.querySelectorAll("button");
    detailsBtn.addEventListener("click", () => onOpen(product));
    copyBtn.addEventListener("click", () => onCopy(product));
    deleteBtn.addEventListener("click", () => onDelete(product.id));

    parent.appendChild(card);

    const canvas = card.querySelector(`#canvas-${product.id}`);
    this.initThree(canvas, product.modelSrc);
  }

  initThree(canvas, modelUrl) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf9f9f9);

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(2, 2, 3);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Свет
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Загрузчик
    const loader = new GLTFLoader();

    loader.load(modelUrl, (gltf) => {
      const model = gltf.scene;
      model.scale.set(10, 10, 10);
      scene.add(model);

      // подгоняем камеру под объект
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());
      controls.target.copy(center);
      camera.position.copy(
        center.clone().add(new THREE.Vector3(size, size, size))
      );
      camera.lookAt(center);
    });

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }
}
