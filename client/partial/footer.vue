<template>
  <footer>
    <div class="footerWrapper">
      <div class="wrap">
        <div class="element">
          <img src="~/static/play.svg" alt="play/pause button" />
          <p>Live streaming</p>
        </div>
      </div>
      <dir class="wrap"></dir>
      <!-- <p>Fixed Radio Player:</p>
      <audio
              controls
              src="https://gencomp.medienhaus.udk-berlin.de:8443/future.mp3"
            ></audio> -->
    </div>
  </footer>
</template>

<style lang="scss">
footer {
  background-color: $green;
  height: 42px;
  width: 100vw;
  position: fixed;
  bottom: 0px;
  left: 0px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  align-items: center;

  .footerWrapper {
    background-color: yellow;
    display: flex;
    height: auto;
    width: 100%;
    display: flex;

    .wrap {
      background-color: green;

      .element {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          background-color: red;
          position: relative;
          display: inline-block;
          height: 24px;
        }

        p {
          display: inline-block;
          margin: 0;
          padding: 0;
          background-color: red;
        }
      }
    }
  }
}

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
  mounted() {},
  created() {},
  activated() {
    console.log('Stream Player has been activated');
  },
  deactivated() {
    console.log('Stream Player has been deactivated');
  }
};
</script>
