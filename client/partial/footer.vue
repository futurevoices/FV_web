<template>
  <footer>
    <audio
      id="audioStream"
      src="https://dradio-edge-3099-dus-ts-cdn.cast.addradio.de/dradio/event/live/mp3/128/stream.mp3"
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
          <p>Live<span class="hide-mobile"></span></p>
        </div>
      </div>
      <div class="wrap wrap-center">
        <div class="stream-picker">
          <div @click="updateStream('stream1')">
            <p v-bind:class="{ active: stream1 }">
              <span v-bind:class="{ active: stream1 }">•&#8196;</span>stream 1
            </p>
          </div>
          <div @click="updateStream('stream2')">
            <p v-bind:class="{ active: stream2 }">
              <span v-bind:class="{ active: stream2 }">•&#8196;</span>stream 2
            </p>
          </div>
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

    .wrap-center {
      flex: 1;
    }

    .wrap {
      // background-color: green;
      // border: 2px solid blue;
      display: flex;
      width: auto;

      .border-right {
        border-right: 1px solid $black !important;
        height: inherit;
        display: inline-block;
        padding-right: 18px;
      }

      .border-left {
        border-left: 1px solid $black !important;
        height: inherit;
        display: inline-block;
        padding-left: 18px;
      }

      .stream-picker {
        position: relative;

        display: flex;
        flex-direction: column;
        height: 42px;
        width: 100px;

        justify-content: center;
        align-items: center;
        border-right: 1px solid black;

        div {
          height: 50%;
          width: 100%;

          display: flex;
          justify-content: center;
          align-items: center;

          cursor: pointer;

          &:first-child {
            border-bottom: 1px solid black;
          }

          p,
          span {
            width: auto;
            height: auto;
            font-size: 13px;
            display: inline-block;
            line-height: 12px;
            position: relative;
            margin: 0;
            margin-bottom: 2px;
          }

          p {
            margin-right: 5px;
          }

          span {
            visibility: hidden;
          }

          span.active {
            visibility: visible;
          }
        }

        div:first-child > p,
        div:first-child > span {
          margin-bottom: 1px;
        }
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
    padding-left: 12px;
    padding-right: 12px;
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

        .stream-picker {
          position: relative;

          display: flex;
          flex-direction: column;
          height: 42px;
          width: auto;

          justify-content: center;
          align-items: center;
          border-right: 0px solid black;

          flex: 1;

          div {
            &:first-child {
              align-items: flex-end;
              border-bottom: 0px solid black;
            }

            p,
            span {
              line-height: 8px;
              margin: 0;
              margin-bottom: 4px;
              opacity: 0.4;
            }

            p.active {
              // font-style: italic;
              opacity: 1;
            }

            span {
              visibility: hidden !important;
              width: 0;
            }
          }

          div:first-child > p,
          div:first-child > span {
            margin-bottom: 0px;
          }
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
      interval: undefined, // store the interval here
      stream1: true,
      stream1src:
        'https://dradio-edge-3099-dus-ts-cdn.cast.addradio.de/dradio/event/live/mp3/128/stream.mp3',
      stream2: false,
      stream2src: 'https://gencomp.medienhaus.udk-berlin.de:8443/future.mp3'
    };
  },
  computed: {},
  methods: {
    updateStream(stream) {
      let streamUrl = '';
      if (stream == 'stream1') {
        streamUrl = this.stream1src;
      } else {
        streamUrl = this.stream2src;
      }

      // check if new stream
      if (streamUrl == this.audio.src) {
        return;
      }

      // update stream interface
      if (stream == 'stream1') {
        this.stream1 = true;
        this.stream2 = false;
      } else {
        this.stream1 = false;
        this.stream2 = true;
      }

      // update stream url
      this.audio.src = streamUrl;

      // play stream
      this.audio.load();
      this.audio.play();
      this.playButton.src = '/pause.svg';

      console.log(streamUrl);
    },
    toggleTimer() {
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
    toggleStream(command) {
      if (command === 'onlystart') {
        if (this.audio.paused) {
          this.audio.load();
          this.audio.play();
          this.playButton.src = '/pause.svg';
        }
      } else {
        if (!this.audio.paused) {
          this.audio.pause();
          this.playButton.src = '/play.svg';
        } else {
          this.audio.load();
          this.audio.play();
          this.playButton.src = '/pause.svg';
        }
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
