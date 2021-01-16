<template>
  <footer>
    <div class="footerWrapper">
      <div class="wrap">
        <div class="element border-right">
          <img
            src="~/static/play.svg"
            class="playbutton"
            alt="play/pause button"
          />
          <p>Live streaming</p>
        </div>
      </div>
      <div class="wrap">
        <div class="element border-left">
          <!-- <p>2 Days 5 Hours 12 Minutes 34 Seconds</p> -->
          <p>{{ time }}</p>
        </div>
      </div>
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
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;

  .footerWrapper {
    // background-color: yellow;
    display: flex;
    height: inherit;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .wrap {
      // background-color: green;
      // border: 2px solid blue;
      display: flex;
      width: auto;

      .border-right {
        border-right: 2.2px solid $black !important;
        height: inherit;
        display: inline-block;
        padding-right: 18px;
      }

      .border-left {
        border-left: 2.2px solid $black !important;
        height: inherit;
        display: inline-block;
        padding-left: 18px;
      }

      .element {
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: yellow;

        .playbutton {
          margin-right: 14px;
          cursor: pointer;
        }

        img {
          // background-color: red;
          position: relative;
          display: inline-block;
          height: 24px;
        }

        p {
          display: inline-block;
          margin: 0;
          padding: 0;
          // background-color: red;
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
    return {
      time: '0:0:0:0',
      // year, month, day, hour, minute, second
      // month: 0-11
      // berlin -> utc: time should be 1 hour behind my berlin time
      startingTime: new Date(Date.UTC(2021, 0, 17, 18, 0, 0)),
      isRunning: false,
      interval: undefined // store the interval here
    };
  },
  computed: {},
  methods: {
    toggleTimer() {
      console.log(new Date(Date.UTC(2021, 0, 16, 18, 0, 0)));
      console.log(new Date().getTime());

      if (this.isRunning) {
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(this.updateTime, 1000);
      }
      this.isRunning = !this.isRunning; // better to read
    },
    updateTime() {
      // get total seconds between the times
      let delta = Math.abs(this.startingTime - new Date().getTime()) / 1000;

      // calculate (and subtract) whole days
      let days = Math.floor(delta / 86400);
      delta -= days * 86400;

      // calculate (and subtract) whole hours
      let hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      // calculate (and subtract) whole minutes
      let minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      // what's left is seconds
      let seconds = Math.round(delta % 60); // in theory the modulus is not required

      if (window.innerWidth <= 480) {
        this.time = `${days}:${hours}:${minutes}:${seconds}`;
      } else {
        this.time = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
      }
    },
    resize() {
      this.updateTime();
    }
  },
  mounted() {
    this.toggleTimer();
    this.updateTime();
    window.addEventListener('resize', this.resize);
  },
  created() {},
  destroyed() {
    window.removeEventListener('resize', this.resize);
  },
  activated() {
    // console.log('Stream Player has been activated');
  },
  deactivated() {
    // console.log('Stream Player has been deactivated');
  }
};
</script>
