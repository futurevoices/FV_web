<template>
  <section class="">
    <div class="container mb-4">
      <div class="row mt-2 mb-1">
        <div class="col-md-12">
          <p>
            We live in a present with many, very different possible futures.
            They range from doom to bliss, dystopia to utopia.
            <br /><br />
            What do YOU think about the future? What do YOU expect, fear, hope,
            propose, plan for the future?
            <br /><br />
            You can make your voice heard: We are collecting a multitude of
            voices that compose a 1-year-long sound stream.
            <br /><br />
            Listen to the stream:
          </p>
          <p>
            <br /><br />
            Add your own recording
            <span
              ><nuxt-link to="/upload" class="nav-link">here</nuxt-link></span
            >.
          </p>

          <p>Invite people to participate by mail <a href="mailto:?subject=Future%20Voices%20Radio&body=Hello%2CI'd%20like%20to%20invite%20you%20to%20participate%20with%20a%20recording%20about%20the%20future%20at%20https%3A%2F%2Ffuturevoices.radio%2F.Enjoy!">here</a></p>.
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
p {

  text-align: left;
  max-width: 500px;
  position: relative;
  margin: 0 auto;
  margin-bottom: 24px;
  span a {
    margin: 0 !important;
    padding: 0 !important;
    display: inline-block !important;
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
    console.log("stream has been mounted")
  },
  created() {}
};
</script>
