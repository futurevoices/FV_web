<template>
  <section class="">
    <div id="canvasWrapper"></div>
  </section>
</template>

<style lang="scss" scoped>
#canvasWrapper {
  display: inline-block;
  width: 50vw;
  height: 40vh;
}
</style>

<script type="module"></script>

<script>
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three';
// import { OrbitControls } from 'three';
// const scene = new Scene();

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// const controls = new OrbitControls();

export default {
  data() {
    return {
      mData: {
        rendererSize: [0, 0]
      }
    };
  },
  computed: {},
  methods: {
    addEventListeners() {
      window.addEventListener('resize', this.resize);
    },
    init() {
      this.wrapper = document.getElementById('canvasWrapper');
      this.renderer = new WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.wrapper.appendChild(this.renderer.domElement);

      this.mData.rendererSize = [
        this.wrapper.clientWidth,
        this.wrapper.clientHeight
      ];

      this.camera = new PerspectiveCamera(
        75,
        this.mData.rendererSize[0] / this.mData.rendererSize[1],
        0.1,
        1000
      );

      this.camera.position.set(0, 0, 100);
      this.camera.position.z = 5;
      this.camera.lookAt(0, 0, 0);

      this.scene = new Scene();
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);

      const geometry = new BoxGeometry();
      const material = new MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new Mesh(geometry, material);
      this.scene.add(cube);

      console.log(this.scene);

      // // //controls.update() must be called after any manual changes to the camera's transform
      // // this.camera.position.set( 0, 20, 100 );
      // this.controls.update();
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

      // update camera ratio?
    },
    render() {
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.addEventListeners();
    this.init();
    this.resize();
    this.render();
  },
  created() {},
  destroyed() {
    window.removeEventListener('resize', this.resize);
  }
};
</script>
