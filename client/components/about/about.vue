<template>
  <section class="">
    <div class="contentWrapper">
      <h3>About</h3>
      <br />
      <p>
        &raquo;Future Voices/Zukunftsmusik&laquo; invites people from all over
        the world to give voice to what they expect, hope, or fear for the
        future. Their contributions flow into a generative sound stream composed
        from these individual &raquo;Future Voices&laquo;; voices that would
        otherwise remain unheard within an attention economy that favours
        loudness, provocation, and conspiracy theories. We, the Society for
        Non-Trivial Pursuits (S4NTP), believe these voices have constructive
        things to say, and through our project we try to channel the power of a
        collective and diverse sonic stream of consciousness.&nbsp;
      </p>
      <p>
        This project was commissioned by Deutschlandfunk Kultur /
        <a
          href="https://www.deutschlandfunkkultur.de/hoerspiel-und-feature-portal-rubrik-klangkunst.3663.de.html"
          >Klangkunst</a
        >, <a href="http://kunstradio.at/">ORF Kunstradio</a>, and
        <a href="https://www.ctm-festival.de/">CTM Festival</a>. It is created
        and will be expanded by The Society For Non-Trivial Pursuits (<a
          href="https://gencomp.medienhaus.udk-berlin.de/"
          >S4NTP</a
        >), which is affiliated to the Class for
        <a
          href="https://www.udk-berlin.de/studium/kunst-und-medien/generative-kunst/"
          >Generative Arts / Computational Art</a
        >
        at Berlin Arts University UdK.
      </p>
      <p>
        FutureVoices is being created and will be expanded by the Society for
        Non-Trivial Pursuits (S4NTP).&nbsp;
      </p>
      <br />
      <p>Its members for this project include:</p>
      <p>
        Adel Akram Alameddine, Vinzenz Aubry, Valentina Berthelon, Alberto de
        Campo, &Ouml;zcan Ertek, Pedro Ferreira, Juan Pablo Gaviria Bedoya,
        Bruno Gola, Isak Han, Hannes Hoelzl, HyungJoong Kim, Yun Chu Liang,
        Andr&eacute; Martins, Sujay Mukherjee, Sangwon Nam, Carlos Andres
        Ortega, Cagil Ozdemir, Marcel Schwittlick, Ilija
        &Scaron;or&scaron;evi&ccedil;, Lisa Maria Steppacher, MengXuan Sun, Fang
        Tsai, ChunLi Wang, Anne Wellmer, Tsingyun Zhang.
      </p>
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
