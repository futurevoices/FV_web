<template>
  <section class="">
    <div id="background" class="background-image">
      <div class="inside-shadow"></div>
      <img src="background-image.png" alt="" />
    </div>
    <div class="contentWrapper">
      <div id="introText" class="content">
        <div class="moebius"><Moebius /></div>
        <p>
          Welcome to Future Voices / Zukunftsmusik!
          <br /><br />
          A one-year live-generated radio stream composed from hopes, fears and
          dreams of contributors from around the world.
        </p>
        <div class="cta-links">
          <p>Listen</p>
          <nuxt-link to="/upload">Contribute</nuxt-link>
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
        <p>
          What do YOU think about the future? What do YOU expect, fear, hope,
          propose, plan for the future? You can make your voice heard: We are
          collecting a multitude of voices that together compose this
          one-year-long sound stream.
        </p>
        <p>
          What do YOU think about the future? What do YOU expect, fear, hope,
          propose, plan for the future? You can make your voice heard: We are
          collecting a multitude of voices that together compose this
          one-year-long sound stream.
        </p>
        <p>
          What do YOU think about the future? What do YOU expect, fear, hope,
          propose, plan for the future? You can make your voice heard: We are
          collecting a multitude of voices that together compose this
          one-year-long sound stream.
        </p>
      </div>
      <!-- <div class="block">
        <p>Stats</p>
        <p>
          What do YOU think about the future? What do YOU expect, fear, hope,
          propose, plan for the future? You can make your voice heard: We are
          collecting a multitude of voices that together compose this
          one-year-long sound stream.
        </p>
        <p>
          What do YOU think about the future? What do YOU expect, fear, hope,
          propose, plan for the future? You can make your voice heard: We are
          collecting a multitude of voices that together compose this
          one-year-long sound stream.
        </p>
        <p>
          What do YOU think about the future? What do YOU expect, fear, hope,
          propose, plan for the future? You can make your voice heard: We are
          collecting a multitude of voices that together compose this
          one-year-long sound stream.
        </p>
        <br />
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
      </div> -->
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
}

.second-content {
  background-color: $lightweight;
  z-index: 2;
  box-shadow: 0px 0px 50px 100px $lightweight;

  .content {
    padding: 24px;
  }
}

.bodyWrapper {
  background-color: yellow;
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

  img {
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
.contentWrapper {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
  // background-color: yellow;
  margin-bottom: 40px;
  height: auto;
  display: block;
  height: auto;

  .content {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 4;
    margin-bottom: 40px;

    p,
    a {
      color: $lightweight;
    }
  }

  .moebius {
    // background-color: yellow;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    z-index: 3;
    margin-top: -18vh;
    margin-bottom: -8vh;
    z-index: 99;
  }

  #introText {
    z-index: 100;

    p,
    a {
      z-index: 1;
    }
  }

  p,
  a {
    font-size: 24px;
    line-height: 125%;
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
    }
  }
}

/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  .background-image {
    .inside-shadow {
      box-shadow: inset 0px 0px 0px 0px $lightweight,
        // first one is to hide the gap
          inset 0px 0px 0px 0px $lightweight,
        inset 0px 30px 30px $lightweight, inset 0px -30px 5px $lightweight;
    }
  }
}
</style>

<script>
import Moebius from '@/components/index/moebius';

export default {
  components: {
    Moebius
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
