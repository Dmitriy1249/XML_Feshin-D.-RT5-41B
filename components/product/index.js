import {stockUrls} from "../../modules/stockUrls.js";
import * as api from "../../modules/api.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export class ProductComponent {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.product;
    }

    async getData() { // тут мы будем с бэка получать карточки (по id)
        try {
        const data = await api.get(stockUrls.getStockById(this.id));
        this.renderData(data);
        } catch(err) {
            this.parent.innerHTML = `
            <div>ошибка</div>
            `;
            console.error(err);
        }
    }

    renderData(data) {
        this.product = data;

        if (!this.product) return;

        this.parent.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-6">
                    <canvas id="canvas-${
                      this.product.id
                    }" style="width:100%; height:500px;"></canvas>
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h2 class="card-title">${this.product.title}</h2>
                            <p class="text-muted">${this.product.text}</p>
                            <div class="mt-4">
                                <h4>Описание:</h4>
                                <ul class="card-text">
                                    ${this.product.description.map(line => `<li>${line}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const canvas = this.parent.querySelector(`#canvas-${this.product.id}`);
        this.initThree(canvas, this.product.modelSrc);
    }

    render() {
        this.parent.innerHTML = '';
        this.getData();
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

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const loader = new GLTFLoader();

    loader.load(modelUrl, (gltf) => {
      const model = gltf.scene;
      model.scale.set(10, 10, 10);
      scene.add(model);

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