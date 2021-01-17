<template>
  <section v-if="allAudio">
    <div class="contentWrapper">
      <img id="worldmap" src="map.svg" alt="world map" />
      <br />
      <br />
      <h3>Explore {{ getRecordingCount() }} recordings</h3>
    </div>
    <div class="recordingsWrapper">
      <div class="filter-wrapper">
        <button
          class="btn btn-outline-dark btn-sm active btn-filter-literal"
          @click="toggleData('literal', $event)"
        >
          Literal text
        </button>
        <button
          class="btn btn-outline-dark btn-sm active btn-filter-literalEnglish"
          @click="toggleData('literalEnglish', $event)"
        >
          Literal text english
        </button>
        <button
          class="btn btn-outline-dark btn-sm active btn-filter-tags"
          @click="toggleData('tags', $event)"
        >
          Tags
        </button>
        <button
          class="btn btn-outline-dark btn-sm active btn-filter-keywords"
          @click="toggleData('keywords', $event)"
        >
          Keywords
        </button>
        <button
          class="btn btn-outline-dark btn-sm active btn-filter-language"
          @click="toggleData('language', $event)"
        >
          Language
        </button>
        <button
          class="btn btn-outline-dark btn-sm active btn-filter-dialect"
          @click="toggleData('dialect', $event)"
        >
          Dialect
        </button>
        <button
          class="btn btn-outline-dark btn-sm active btn-filter-native-language"
          @click="toggleData('native-language', $event)"
        >
          Native Language
        </button>
        <button
          class="btn btn-outline-dark btn-sm active btn-filter-country"
          @click="toggleData('country', $event)"
        >
          Country
        </button>
        <button
          class="btn btn-outline-dark btn-sm active btn-filter-town"
          @click="toggleData('town', $event)"
        >
          Town
        </button>
        <button
          class="btn btn-outline-dark btn-sm active btn-filter-coordinates"
          @click="toggleData('coordinates', $event)"
        >
          Coordinates
        </button>
        <!-- <button
          class="btn btn-outline-dark btn-sm active btn-filter-approval"
          @click="toggleData('approval', $event)"
        >
          Approval
        </button> -->
      </div>

      <div class="tableWrapper">
        <table class="table">
          <thead>
            <tr>
              <!-- <th scope="col">#</th> -->
              <th class="filter-literal" scope="col">Literal text</th>
              <th class="filter-literalEnglish" scope="col">
                Literal text english
              </th>
              <th class="filter-tags" scope="col">Tags</th>
              <th class="filter-keywords" scope="col">Keywords</th>
              <th class="filter-language" scope="col">Language</th>
              <th class="filter-dialect" scope="col">Dialect</th>
              <th class="filter-native-language" scope="col">
                Native Language
              </th>
              <th class="filter-country" scope="col">Country</th>
              <th class="filter-town" scope="col">Location</th>
              <th class="filter-coordinates" scope="col">Coordinates</th>
              <th scope="col">Listen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(audio, index) in allAudio" :key="index">
              <!-- <th>{{ index + 1 }}</th> -->
              <td class="filter-literal">{{ audio.literal_text }}</td>
              <td class="filter-literalEnglish">
                {{ audio.literal_text_english }}
              </td>
              <td class="filter-tags">{{ audio.tags }}</td>
              <td class="filter-keywords">
                <div v-for="(keyword, index) in audio.keywords" :key="index">
                  <span>{{ keyword }}</span>
                </div>
              </td>
              <td class="filter-language">{{ audio.language }}</td>
              <td class="filter-dialect">{{ audio.dialect }}</td>
              <td class="filter-native-language">
                {{ audio.speaker_native_language }}
              </td>
              <td class="filter-country">{{ audio.country }}</td>
              <td class="filter-town">{{ audio.town }}</td>
              <td class="filter-coordinates">
                {{ audio.coordinates.lat }}, <br />{{ audio.coordinates.long }}
              </td>
              <td>
                <button class="btn btn-primary" @click="play(audio)">
                  Play
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  .contentWrapper {
    h3 {
      text-align: center;
    }
    img {
      width: 100%;
    }
  }

  .recordingsWrapper {
    margin-bottom: 80px;

    .filter-wrapper {
      /* display: flex; */
      /* justify-content: center;
  align-items: center; */
      margin-bottom: 24px;
      margin-top: 12px;
    }

    .tableWrapper {
      width: 100vw;
      overflow-x: scroll;
      background-color: $lightweight;

      table {
        font-size: 12px;
        line-height: 17px;

        tr,
        td,
        th {
          padding-right: 24px;
          padding-left: 24px;
          border: 0;
          border-top: solid 1px $black;
        }

        span {
          font-size: inherit;
          line-height: inherit;
        }

        button {
          background-color: $green;
          border-radius: 0;
          border: 0;
          color: $black;
        }
      }
    }
  }
}

.card-body {
  overflow-x: scroll;
}
</style>
<script>
export default {
  data() {
    return {
      current: {
        title: '',
        language: ''
      },
      initFilter: [
        // which ones to hide
        'literal',
        // "literalEnglish",
        'tags',
        // "keywords",
        // "language",
        'dialect',
        'native-language',
        'country',
        // "town",
        'coordinates'
        // 'approval' // took it out
      ],
      databaseInfo: {
        amountRecordings: 0
      },
      song: true,
      isplaying: false,
      allAudio: null,
      index: 0,
      player: ''
    };
  },
  methods: {
    async initPlayer() {
      if (this.allAudio !== []) {
        this.current = await this.allAudio[this.index];
        //console.log(this.current);
        this.player.src = `${this.$config.baseURL}${this.current.filePath}`;
      } else {
        this.song = true;
      }
    },
    async getAllAudios() {
      try {
        let response = await this.$axios.$get('/audio');
        response.reverse();

        let cleanedResponse = [];

        // filter out all unapproved recordings, except the last one
        for (let i = 0; i < response.length; i++) {
          const element = response[i];
          if (i === 0) {
            cleanedResponse.push(element);
            continue;
          }
          if (element.approved) {
            cleanedResponse.push(element);
          }
        }

        // console.log(cleanedResponse);
        if (cleanedResponse === []) {
          this.song = true;
          this.current = null;
        } else {
          this.song = false;
          this.allAudio = cleanedResponse;
        }
        await this.initPlayer();
        this.filterOnInit(this.initFilter);
        this.updateStats();
      } catch (err) {
        this.current = null;
        console.log(err);
      }
    },
    play(song) {
      if (song) {
        this.current = song;
        this.player.src = `${this.$config.baseURL}${this.current.filePath}`;
      }
      this.player.play();
      this.isplaying = true;
    },
    toggleData(type, event) {
      let button = event.target;
      let activateFilter = button.classList.contains('active') ? false : true;

      button.classList.toggle('active');
      button.classList.toggle('disabled');

      let className = 'filter-' + type;
      let elements = document.getElementsByClassName(className);

      elements.forEach(element => {
        if (activateFilter) {
          element.style.display = 'table-cell';
        } else {
          element.style.display = 'none';
        }
      });
    },
    filterOnInit(array) {
      array.forEach(element => {
        let buttonClass = 'btn-filter-' + element;
        let button = document.getElementsByClassName(buttonClass);
        let fakeEvent = {
          target: button[0]
        };

        this.toggleData(element, fakeEvent);
      });
    },
    updateStats() {
      this.databaseInfo.amountRecordings = this.allAudio.length;
    },
    getRecordingCount: function() {
      return this.databaseInfo.amountRecordings;
    }
  },
  created() {
    if (process.client) {
      this.player = new Audio();
    }
    this.getAllAudios();
  },
  mounted() {
    // this.$nextTick(() => {
    // });
  }
};
</script>
<style scoped></style>
