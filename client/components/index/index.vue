<template>
  <section class="">
    <div id="background" class="background-image">
      <div class="inside-shadow"></div>
      <!-- <img src="background-image.png" alt="" /> -->
      <video
        loop
        plays-inline
        muted
        autoplay
        src="background-video2k4.mp4"
      ></video>
    </div>
    <div class="contentWrapper">
      <div id="moebius" class="moebius"><Moebius /></div>
      <div id="introText" class="content">
        <div id="moebius-placeholder"></div>
        <div v-if="data.data">
          <div class="news-summary" v-if="data.data.summarynews !== ''">
            <p>
              {{ data.data.summarynews }}
            </p>
          </div>
        </div>
        <h1>Welcome to Future Voices / Zukunftsmusik!</h1>
        <p>
          <br />
          A one-year live-generated radio stream composed from hopes, fears and
          dreams of contributors from around the world.
        </p>
        <div class="cta-links">
          <p @click="activateStream()">Listen</p>
          <nuxt-link to="/contribute">Contribute</nuxt-link>
          <a
            href="mailto:?subject=Future%20Voices%20Radio&body=Hello%2CI'd%20like%20to%20invite%20you%20to%20participate%20with%20a%20recording%20about%20the%20future%20at%20https%3A%2F%2Ffuturevoices.radio%2F.%20Enjoy!"
            >Share</a
          >
        </div>
        <p>
          We live in a present with many, very different possible futures. They
          range from doom to bliss, dystopia to utopia.
        </p>
        <p>
          What do YOU think about the future? What do YOU expect, fear, hope,
          propose, plan for the future? You can make your voice heard: We are
          collecting a multitude of voices that together compose this
          one-year-long sound stream.
        </p>
      </div>
    </div>
    <div class="second-content">
      <div class="content">
        <div class="block">
          <h3>Stats</h3>
          <br />

          <table class="tg">
            <thead>
              <tr>
                <th class="tg-0lax">Recordings</th>
                <th class="tg-0lax">soon</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="tg-0lax">Languages</td>
                <td class="tg-0lax">soon</td>
              </tr>
              <tr>
                <td class="tg-0lax">Current Language</td>
                <td class="tg-0lax">soon</td>
              </tr>
              <tr>
                <td class="tg-0lax">Current Composition<br /></td>
                <td class="tg-0lax">soon</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="block">
          <h3>Enter virtual world</h3>
          <br />

          <a
            href="https://www.ctm-festival.de/festival-2021/programme/exhibition/ctm-cyberia/future-voices-zukunftsmusik-by-society-for-nontrivial-pursuits-s4ntp"
            target="_blank"
          >
            <img
              class="link-image-game"
              src="/gameimage.png"
              alt="image to enter Future Voices 3d World"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Moebius from '@/components/index/moebius';

export default {
  components: {
    Moebius
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    resize() {
      // resize the background image
      // let height = document.getElementById('introText').offsetHeight;
      // height += 100;
      // document.getElementById('background').style.height = height + 'px';
      // console.log(height);

      // resize moebius placeholder
      // let height = document.getElementById('moebius').offsetHeight;
      let height;
      if (window.innerWidth >= '900') {
        height = 650;
      } else if (window.innerWidth < '900' && window.innerWidth > 480) {
        height = 650; // to do
      } else {
        height = window.innerWidth * 0.8;
      }

      document.getElementById('moebius-placeholder').style.height =
        height + 'px';
    },
    activateStream() {
      this.$nuxt.$emit('start-stream');
    }
  },
  mounted() {
    this.resize();
    window.addEventListener('resize', this.resize);
  },
  created() {},
  destroyed() {
    window.removeEventListener('resize', this.resize);
  }
};
</script>

<style lang="scss" scoped>
section {
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
}

.bodyWrapper {
  z-index: 999;
}

.background-image {
  top: 40px;
  left: 0;
  position: fixed;
  display: block;
  width: 100%;
  height: 100vh;
  z-index: 0;

  .inside-shadow {
    position: absolute;
    top: 0;
    width: inherit;
    height: inherit;
    box-shadow: inset 0px 0px 0px 5px $lightweight,
      // first one is to hide the gap
        inset 0px 0px 30px 40px $lightweight;
    mix-blend-mode: normal;
    z-index: 2;
  }

  img,
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    object-fit: cover;
    opacity: 1;
    z-index: 1;
  }
}
.moebius {
  pointer-events: none;
  position: absolute;
  top: 0;
  // background-color: yellow;
  width: 100%;
  height: auto;
  top: 0;
  left: 0;
  z-index: 3;
  margin-top: -18vh;
  z-index: 101;
}

.contentWrapper {
  // is in global

  .content {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 4;
    margin-bottom: 100px;

    p,
    a,
    h3,
    h1 {
      color: $lightweight;
    }

    .news-summary {
      background-color: $green;
      padding: 6px 10px 8px 10px;
      margin-bottom: 32px;

      p {
        color: $black;
        margin: 0;
      }
    }
  }

  #introText {
    z-index: 4;

    p,
    a {
      z-index: 1;
    }
  }

  p,
  a,
  h1 {
    font-size: 24px;
    line-height: 135%;
  }
  .cta-links {
    display: flex;
    justify-content: space-around;
    padding-top: 24px;
    padding-bottom: 24px;
    p,
    a {
      display: inline-block;
      text-decoration: underline;
      cursor: pointer;
    }

    p:hover,
    a:hover {
      font-style: italic;
      color: $lightweight !important;
    }
  }
}

.second-content {
  position: relative;
  background-color: $lightweight;
  z-index: 2;
  box-shadow: 0px 0px 50px 100px $lightweight;
  margin-top: 100px;
  padding-bottom: 100px;

  .content {
    padding-left: 24px;
    padding-right: 24px;
    display: flex;
    justify-content: space-around;
    width: 100%;

    .block {
      margin-left: 12px;
      margin-right: 12px;
      display: inline-block;
      height: auto;
      width: 20%;

      table {
        width: 100%;
        th,
        tr {
          width: 50%;

          td,
          th {
            padding: 5px;
            padding-left: 9px;
            padding-right: 9px;
            font-weight: normal;
          }
        }
      }

      table,
      th,
      td {
        border: 1px solid $black;
      }

      img,
      video {
        width: 100%;
        height: auto;
      }

      .link-image-game {
        transition: all 0.4s ease-in-out;
      }

      .link-image-game:hover {
        transform: scale(1.01);
      }
    }

    .block:nth-of-type(1) {
      flex-grow: 1;
    }
    .block:nth-of-type(2) {
      flex-grow: 2;
    }
  }
}

@media only screen and (max-width: 900px) {
  .moebius {
    margin-top: -5vw;
  }
}

/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  .moebius {
    transform: translateX(-20px);
  }

  #background {
    width: calc(100vw + 60px);
    left: -30px;
  }

  .background-image {
    .inside-shadow {
      box-shadow: inset 0px 0px 0px 0px $lightweight,
        // first one is to hide the gap
          inset 0px 0px 0px 0px $lightweight,
        inset 0px 30px 30px $lightweight, inset 0px -30px 5px $lightweight;
    }
  }

  // font sizes
  section {
    padding-left: 10px;
    padding-right: 10px;

    .contentWrapper {
      .content {
        .cta-links {
          flex-direction: column;
          text-align: center;
          padding-top: 0;
          p,
          a {
            margin-top: 12px;
            margin-bottom: 12px;
          }
        }
      }
    }

    p,
    a,
    h1 {
      font-size: 21px !important;
    }
  }

  .second-content {
    position: relative;
    background-color: $lightweight;
    z-index: 2;
    box-shadow: 0px 0px 50px 100px $lightweight;
    margin-top: 100px;
    padding-bottom: 100px;

    .content {
      padding-left: 0px;
      padding-right: 0px;
      flex-direction: column-reverse;

      .block {
        margin-left: 0px;
        margin-right: 0px;
        display: inline-block;
        height: auto;
        width: 100%;
        margin-bottom: 48px;
      }

      .block:nth-of-type(1) {
        flex-grow: 0;
      }
      .block:nth-of-type(2) {
        flex-grow: 0;
      }
    }
  }
}
</style>
