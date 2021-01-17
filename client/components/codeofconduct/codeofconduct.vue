<template>
  <section class="">
    <div class="contentWrapper">
      <h3>Code of Conduct</h3>
      <br />
      <p>Please be mindful of your language.</p>
      <p>
        Try to remain positive, friendly, and welcoming to others;
      </p>
      <p>
        Be respectful of differing viewpoints and experiences, and
      </p>
      <p>
        Do not engage in any discriminatory, harassing, aggressive, or
        exclusionary speech.
      </p>
      <p>
        All contributions are personally monitored by a multi-lingual team
        before reaching the FutureVoices stream.
      </p>
      <p>
        Any kind of contributions is welcome, as long as they don't include any
        of the following:
      </p>
      <ul>
        <li>
          <p>
            Offensive comments related to race, ethnicity, language,
            nationality, religion, class, culture, subculture, political
            opinion, gender identity and expression, sexual orientation,
            neuro-type, age, size, ability, skill level, occupation, or
            background
          </p>
        </li>
        <li>
          <p>Threats of, or incitement to violence</p>
        </li>
        <li>
          <p>Deliberate intimidation</p>
        </li>
        <li>
          <p>Conspiracy theories</p>
        </li>
        <li>
          <p>Sexually explicit or violent material</p>
        </li>
        <li>
          <p>Unwelcome sexual attention</p>
        </li>
        <li>
          <p>Stalking or following</p>
        </li>
        <li>
          <p>Or any other kinds of harassment.</p>
        </li>
      </ul>
      <p>Thank you for your contribution!</p>
    </div>
  </section>
</template>

<style lang="scss">
section {
  .contentWrapper {
    margin-bottom: 100px !important;

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
