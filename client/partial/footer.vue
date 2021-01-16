<template>
  <footer>
    <audio
      id="audioStream"
      src="https://gencomp.medienhaus.udk-berlin.de:8443/future.mp3"
    ></audio>
    <div class="footerWrapper">
      <div class="wrap">
        <div class="element border-right">
          <img
            src="~/static/play.svg"
            class="playbutton"
            id="playButton"
            alt="play/pause button"
            @click="toggleStream()"
          />
          <p>Live<span class="hide-mobile"> streaming</span></p>
        </div>
      </div>
      <div class="wrap">
        <div class="element border-left">
          <!-- <p>2 Days 5 Hours 12 Minutes 34 Seconds</p> -->
          <p>{{ time }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
footer {
  z-index: 9999;
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

/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  footer {
    .footerWrapper {
      .wrap {
        .border-right {
          border-right: 0px !important;
          padding-right: 0px;
        }

        .border-left {
          border-left: 0px !important;
          padding-left: 0px;
        }
      }
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      time: '0:0:00:00',
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
      minutes = ('0' + minutes).slice(-2);
      delta -= minutes * 60;

      // what's left is seconds
      let seconds = Math.floor(delta % 60); // in theory the modulus is not required
      seconds = ('0' + seconds).slice(-2);

      if (window.innerWidth <= 480) {
        this.time = `${days}:${hours}:${minutes}:${seconds}`;
      } else {
        this.time = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
      }
    },
    resize() {
      this.updateTime();
    },
    addEventListeners() {
      window.addEventListener('resize', this.resize);
      this.audio = document.getElementById('audioStream');
      this.playButton = document.getElementById('playButton');
    },
    toggleStream() {
      console.log(this.audio.paused);
      if (!this.audio.paused) {
        this.audio.pause();
        this.playButton.src = '/play.svg';
      } else {
        console.log('play');
        this.audio.load();
        this.audio.play();
        this.playButton.src = '/pause.svg';
      }
    }
  },
  mounted() {
    this.toggleTimer();
    this.updateTime();

    this.addEventListeners();
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
