<template>
  <section class="moebius-root">
    <div id="canvasWrapper"></div>
  </section>
</template>

<style lang="scss" scoped>
// fills the stage box of the landing page; the camera fits the strip into it
.moebius-root,
#canvasWrapper {
  width: 100%;
  height: 100%;
}
#canvasWrapper {
  position: relative;
  overflow: hidden;
}
</style>

<script>
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  Mesh,
  Color,
  TextureLoader,
  Vector3
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
// import { metalMatcap } from 'static/matcap.jpg';

// const controls = new OrbitControls();

export default {
  data() {
    return {
      mData: {
        rendererSize: [0, 0],
        moebius: {
          scale: 0.08,
          autoRotateSpeed: 1,
          fillWidth: 0.9, // share of the stage the strip may use over a full turn
          fillHeight: 0.85
        }
      }
    };
  },
  computed: {},
  methods: {
    addEventListeners() {
      window.addEventListener('resize', this.resize);
      if (window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(this.wrapper);
      }
    },
    loadTextures() {
      this.textureLoader = new TextureLoader();
      this.metalMatcap = this.textureLoader.load('matcaps/3.jpg');
    },
    init() {
      this.wrapper = document.getElementById('canvasWrapper');
      this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.wrapper.clientWidth, this.wrapper.clientHeight);
      this.wrapper.appendChild(this.renderer.domElement);

      this.mData.rendererSize = [
        this.wrapper.clientWidth,
        this.wrapper.clientHeight
      ];

      this.camera = new PerspectiveCamera(
        45,
        this.mData.rendererSize[0] / this.mData.rendererSize[1],
        1,
        1000
      );

      // slightly from above, so the flat ring reads as a ring while it turns
      this.camera.position.set(0, 35, 95);
      this.cameraDistance = this.camera.position.length(); // kept by fitCamera()
      this.camera.lookAt(0, 0, 0);

      this.scene = new Scene();

      // const geometry = new BoxGeometry();
      // const material = new MeshBasicMaterial({ color: 0x00ff00 });
      // const cube = new Mesh(geometry, material);
      // this.scene.add(cube);
    },
    addControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = this.mData.moebius.autoRotateSpeed;
      this.controls.rotateSpeed = 0.4;
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.1;
      this.controls.enableZoom = false;
      this.controls.enablePan = false;
      // this.controls.maxPolarAngle = Math.PI / 2;
      // this.controls.minPolarAngle = Math.PI / 2;
    },
    resize() {
      const w = this.wrapper.clientWidth;
      const h = this.wrapper.clientHeight;
      if (!w || !h) return;
      if (w === this.mData.rendererSize[0] && h === this.mData.rendererSize[1]) return;
      this.mData.rendererSize = [w, h];

      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(w, h);
      this.fitCamera();
    },
    // Sets the camera distance so the strip fills the stage on every screen:
    // it measures the projected strip over a full turn (the auto-rotation turns
    // the camera around Y) and keeps the largest extent inside fillWidth /
    // fillHeight of the canvas. Direction and height angle of the camera stay.
    // The camera looks down at the strip, so its picture is not centred in
    // the canvas; a view offset moves it to the vertical centre of the stage.
    // The camera keeps its original position (distance and height angle), so
    // the perspective looks the same on every screen; only the zoom changes.
    fitCamera() {
      if (!this.fitPoints || !this.camera) return;
      const cam = this.camera;
      const [w, h] = this.mData.rendererSize;
      cam.clearViewOffset();
      cam.zoom = 1;
      cam.updateProjectionMatrix();
      const dir = cam.position.clone().normalize();
      cam.position.copy(dir).multiplyScalar(this.cameraDistance);
      cam.lookAt(0, 0, 0);
      cam.updateMatrixWorld();
      const v = new Vector3();
      let halfX = 0;
      let minY = Infinity;
      let maxY = -Infinity;
      for (let k = 0; k < 12; k++) {
        const a = (k * Math.PI) / 6;
        const c = Math.cos(a);
        const sn = Math.sin(a);
        for (const p of this.fitPoints) {
          v.set(c * p.x + sn * p.z, p.y, -sn * p.x + c * p.z).project(cam);
          halfX = Math.max(halfX, Math.abs(v.x));
          minY = Math.min(minY, v.y);
          maxY = Math.max(maxY, v.y);
        }
      }
      // zoom scales the projected image linearly around the canvas centre
      const zoom = Math.min(
        this.mData.moebius.fillWidth / halfX,
        this.mData.moebius.fillHeight / ((maxY - minY) / 2)
      );
      cam.zoom = zoom;
      cam.updateProjectionMatrix();
      const centreY = ((minY + maxY) / 2) * zoom;
      if (w && h) cam.setViewOffset(w, h, 0, (-centreY * h) / 2, w, h);
      if (this.controls) this.controls.update();
    },
    loadMoebius() {
      const that = this;
      this.loader = new FBXLoader();
      this.loader.load('moebius.fbx', function(object) {
        // mixer = new THREE.AnimationMixer(object);
        // const action = mixer.clipAction(object.animations[0]);
        // action.play();
        object.traverse(function(child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = false;

            child.material = new MeshMatcapMaterial({
              color: new Color().setHex('0xffffff').convertSRGBToLinear(),
              matcap: that.metalMatcap
              // normalMap: normalmap
            });
          }
        });

        object.scale.set(
          that.mData.moebius.scale,
          that.mData.moebius.scale,
          that.mData.moebius.scale
        );

        // The model's ring plane is tilted in moebius.fbx (normal measured with
        // a PCA of its vertices). Turn that normal to +Y so the ring lies flat
        // and the auto-rotation turns it like a carousel.
        object.quaternion.setFromUnitVectors(
          new Vector3(-0.52, 0.65, -0.555).normalize(),
          new Vector3(0, 1, 0)
        );

        that.scene.add(object);

        // a sample of the strip's points, used to fit the camera
        object.updateMatrixWorld(true);
        const points = [];
        object.traverse(function(child) {
          if (!child.isMesh) return;
          const pos = child.geometry.attributes.position;
          const step = Math.max(1, Math.floor(pos.count / 1500));
          for (let i = 0; i < pos.count; i += step) {
            points.push(
              new Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)).applyMatrix4(
                child.matrixWorld
              )
            );
          }
        });
        that.fitPoints = points;
        that.fitCamera();
      });
    },
    render() {
      requestAnimationFrame(this.render);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.loadTextures();
    this.init();
    this.addEventListeners();
    this.addControls();
    this.resize();
    this.render();
    this.loadMoebius();
  },
  created() {},
  destroyed() {
    window.removeEventListener('resize', this.resize);
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }
};
</script>
