<template>
  <section class="">
    <div class="contentWrapper">
      <h1>test</h1>
    </div>
  </section>
</template>

<style lang="scss">
section {
  .contentWrapper {
    margin-bottom: 100px !important;

    img {
      width: 100%;
    }

    a {
      text-decoration: underline;
    }

    a:hover {
      font-weight: normal !important;
      font-style: italic !important;
      color: $black !important;
    }
  }
}

/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  .contentWrapper {
    padding-left: 10px;
    padding-right: 10px;

    p,
    a {
      font-size: 18px !important;
      line-height: 25px !important;
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
  created() {}
};
</script>
