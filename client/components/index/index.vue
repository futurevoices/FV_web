<template>
  <section class="">
    <div class="contentWrapper">
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
  </section>
</template>

<style lang="scss" scoped>
.contentWrapper {
  padding-top: 20vh;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  text-align: left;

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
</style>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    console.log('stream has been mounted');
  },
  created() {}
};
</script>
