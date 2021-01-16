<template>
  <section class="streamPlayer">
    <div class="playerWrapper">
      <p>Fixed Radio Player:</p>
      <audio
              controls
              src="https://gencomp.medienhaus.udk-berlin.de:8443/future.mp3"
            ></audio>
    </div>

  </section>
</template>

<style lang="scss">
.streamPlayer {
  width: 100vw;
  height: $footerRadioHeight;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid black;
  padding: 10px;
  z-index: 9999;
  background-color: white;

  .playerWrapper {
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    p {
      margin: 0;
      padding: 0;
      margin-right: 10px;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
  },
  created() {},
  activated () {
      console.log('Stream Player has been activated')
  },
  deactivated () {
      console.log('Stream Player has been deactivated')
  }
};
</script>
