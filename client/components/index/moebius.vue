<template>
  <section class="">
    <div id="canvasWrapper"></div>
  </section>
</template>

<style lang="scss" scoped>
#canvasWrapper {
  display: inline-block;
  max-width: 900px;
  max-height: 900px;
  width: 100vw;
  height: 100vw;
  // border: 1px solid black;
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
  Vector3,
  Matrix4,
  Group
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
          spinSpeed: 0.1 // radians per second, turning in the plane of the screen
        }
      }
    };
  },
  computed: {},
  methods: {
    addEventListeners() {
      window.addEventListener('resize', this.resize);
    },
    loadTextures() {
      this.textureLoader = new TextureLoader();
      this.metalMatcap = this.textureLoader.load('matcaps/3.jpg');
    },
    init() {
      this.wrapper = document.getElementById('canvasWrapper');
      this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
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

      // far enough that the loop also fits when it stands upright during the spin
      this.camera.position.set(0, 0, 135);
      this.camera.lookAt(0, 0, 0);

      this.scene = new Scene();

      // const geometry = new BoxGeometry();
      // const material = new MeshBasicMaterial({ color: 0x00ff00 });
      // const cube = new Mesh(geometry, material);
      // this.scene.add(cube);
    },
    addControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.rotateSpeed = 0.4;
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.1;
      this.controls.enableZoom = false;
      this.controls.enablePan = false;
      // this.controls.maxPolarAngle = Math.PI / 2;
      // this.controls.minPolarAngle = Math.PI / 2;
    },
    resize() {
      this.mData.rendererSize = [
        this.wrapper.clientWidth,
        this.wrapper.clientHeight
      ];

      this.camera.aspect = this.wrapper.clientWidth / this.wrapper.clientHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(
        this.mData.rendererSize[0],
        this.mData.rendererSize[1]
      );

      this.renderer.setPixelRatio(window.devicePixelRatio);
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

        // moebius.fbx stores the loop tilted. Its axes, measured with a PCA of
        // the vertices: longest extent `long`, plane normal `normal`. Turn the
        // loop so it faces the camera as an infinity sign (long axis
        // horizontal); the pivot then spins it in the plane of the screen.
        const long = new Vector3(0.854, 0.396, -0.337).normalize();
        const normal = new Vector3(0.52, -0.65, 0.555).normalize();
        const side = new Vector3().crossVectors(normal, long).normalize();
        object.quaternion.setFromRotationMatrix(
          new Matrix4().makeBasis(long, side, normal).transpose()
        );

        that.pivot = new Group();
        that.pivot.add(object);
        that.scene.add(that.pivot);
      });
    },
    render(now) {
      requestAnimationFrame(this.render);
      if (this.pivot && this.lastFrame !== undefined) {
        const seconds = Math.min((now - this.lastFrame) / 1000, 0.1);
        this.pivot.rotation.z -= this.mData.moebius.spinSpeed * seconds;
      }
      this.lastFrame = now;
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.addEventListeners();
    this.loadTextures();
    this.init();
    this.addControls();
    this.resize();
    this.render();
    this.loadMoebius();
  },
  created() {},
  destroyed() {
    window.removeEventListener('resize', this.resize);
  }
};
</script>
