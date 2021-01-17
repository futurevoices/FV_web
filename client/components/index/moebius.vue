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
  TextureLoader
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
          autoRotateSpeed: 1
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

      this.camera.position.set(0, 0, 100);
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

        that.scene.add(object);
      });
    },
    render() {
      requestAnimationFrame(this.render);
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
