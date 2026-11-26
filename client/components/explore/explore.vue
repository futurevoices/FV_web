<template>
  <section v-if="allAudio">
    <div class="contentWrapper">
      <div class="mapWrapper">
        <img id="worldmap" src="/map.svg" alt="world map" />
        <svg
          class="mapDots"
          viewBox="0 0 1113 476"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <circle
            v-for="dot in mapDots"
            :key="dot.key"
            :cx="dot.x"
            :cy="dot.y"
            r="4"
          />
        </svg>
      </div>
    </div>

    <div class="recordingsWrapper">
      <div class="instructions ">
        <h3>Explore {{ getRecordingCount() }} recordings</h3>
        <p class="small-text ">
          <i>
            Use buttons for filtering + Click & drag for horizontal scrolling</i
          >
        </p>
      </div>

      <div class="filter-wrapper">
        <button
          class="btn btn-sm active btn-filter-literal"
          @click="toggleData('literal', $event)"
        >
          Literal text
        </button>
        <button
          class="btn btn-sm active btn-filter-literalEnglish"
          @click="toggleData('literalEnglish', $event)"
        >
          Literal text english
        </button>
        <!-- <button
          class="btn btn-sm active btn-filter-tags"
          @click="toggleData('tags', $event)"
        >
          Tags
        </button> -->
        <button
          class="btn btn-sm active btn-filter-keywords"
          @click="toggleData('keywords', $event)"
        >
          Keywords
        </button>
        <button
          class="btn btn-sm active btn-filter-language"
          @click="toggleData('language', $event)"
        >
          Language
        </button>
        <button
          class="btn btn-sm active btn-filter-dialect"
          @click="toggleData('dialect', $event)"
        >
          Dialect
        </button>
        <button
          class="btn btn-sm active btn-filter-native-language"
          @click="toggleData('native-language', $event)"
        >
          Native Language
        </button>
        <button
          class="btn btn-sm active btn-filter-country"
          @click="toggleData('country', $event)"
        >
          Country
        </button>
        <button
          class="btn btn-sm active btn-filter-town"
          @click="toggleData('town', $event)"
        >
          Town
        </button>
        <button
          class="btn btn-sm active btn-filter-coordinates"
          @click="toggleData('coordinates', $event)"
        >
          Coordinates
        </button>
        <!-- <button
          class="btn btn-sm active btn-filter-approval"
          @click="toggleData('approval', $event)"
        >
          Approval
        </button> -->
        <br />
        <br />
      </div>

      <div class="tableWrapper">
        <div id="customTableHeader" class="customTable customTableHeader">
          <div class="headerTable">
            <div class=" custom-width-70-desktop table-first-element-spacing">
              Listen
            </div>
            <div
              class="filter-literal custom-width-600-desktop custom-width-100vwMax-mobile"
            >
              Literal text
            </div>
            <div
              class="filter-literalEnglish custom-width-600-desktop custom-width-100vwMax-mobile"
            >
              Literal text english
            </div>
            <!-- <div class="filter-tags custom-width-180-desktop">Tags</div> -->
            <div class="filter-keywords custom-width-180-desktop">Keywords</div>
            <div class="filter-language custom-width-180-desktop">Language</div>
            <div class="filter-dialect custom-width-180-desktop">Dialect</div>
            <div class="filter-native-language custom-width-180-desktop">
              Native Language
            </div>
            <div class="filter-country custom-width-180-desktop">Country</div>
            <div class="filter-town custom-width-180-desktop">Location</div>
            <div class="filter-coordinates custom-width-180-desktop">
              Coordinates
            </div>
          </div>
        </div>
        <div class="table-spacer"></div>
        <div
          id="customTable"
          class="customTable"
          v-dragscroll
          v-on:dragscrollmove="dragscrollmove($event.detail)"
        >
          <div class="bodyTable">
            <div
              class="table-row"
              v-for="(audio, index) in allAudio"
              :key="index"
            >
              <div
                class="  row-element custom-width-70-desktop table-first-element-spacing"
              >
                <button
                  class="btn play-button"
                  :class="{ playing: isPlaying(audio) }"
                  @click="togglePlay(audio)"
                >
                  {{ isPlaying(audio) ? 'Stop' : 'Play' }}
                </button>
              </div>
              <!-- <th>{{ index + 1 }}</th> -->
              <div
                class="row-element filter-literal custom-width-600-desktop custom-width-100vwMax-mobile"
              >
                <p>{{ audio.literal_text }}</p>
              </div>
              <div
                class="row-element filter-literalEnglish custom-width-600-desktop custom-width-100vwMax-mobile"
              >
                <p>{{ audio.literal_text_english }}</p>
              </div>
              <!-- <div class="row-element filter-tags custom-width-180-desktop">
                <div v-for="(tag, index) in audio.tags" :key="index">
                  <span
                    ><p>{{ tag }}</p></span
                  >
                </div>
              </div> -->
              <div class="row-element filter-keywords custom-width-180-desktop">
                <div v-for="(keyword, index) in audio.keywords" :key="index">
                  <span
                    ><p>{{ keyword }}</p></span
                  >
                </div>
              </div>
              <div class="row-element filter-language custom-width-180-desktop">
                <p>{{ audio.language }}</p>
              </div>
              <div class="row-element filter-dialect custom-width-180-desktop">
                <p>{{ audio.dialect }}</p>
              </div>
              <div
                class="row-element filter-native-language custom-width-180-desktop"
              >
                <p>{{ audio.speaker_native_language }}</p>
              </div>
              <div class="row-element filter-country custom-width-180-desktop">
                <p>{{ audio.country }}</p>
              </div>
              <div class="row-element filter-town custom-width-180-desktop">
                <p>{{ audio.town }}</p>
              </div>
              <div
                class="row-element filter-coordinates custom-width-180-desktop"
              >
                <p>
                  {{ audio.coordinates.lat }}, <br />{{
                    audio.coordinates.long
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  .contentWrapper {
    h3 {
      text-align: left;
    }
    img {
      width: 100%;
    }
    .mapWrapper {
      position: relative;
    }
    .mapDots {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      circle {
        fill: $green;
        stroke: $black;
        stroke-width: 0.75;
      }
    }
    margin-bottom: 60px !important;
  }

  .recordingsWrapper {
    margin-bottom: 80px;

    .small-text {
      font-size: 16px;
    }

    .text-center {
      text-align: left;
    }

    button {
      margin-top: 5px;
      background-color: $green;
      border-radius: 0;
      border: 0;
      color: $black;
    }

    .instructions {
      padding-left: 12px;
      padding-right: 12px;
    }

    .filter-wrapper {
      padding-left: 6px;
      padding-right: 6px;
      margin-bottom: 24px;
      margin-top: 12px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      // justify-content: center;
      button {
        margin-right: 6px;
        margin-left: 6px;
        background-color: $green;
        border-radius: 0;
        border: 0;
        color: $black;
        border: solid 1px $green;
        margin-bottom: 12px;
      }
      button.disabled {
        background-color: $lightweight;
        border-radius: 0;
        border: solid 1px $black;
        color: $black;
      }
    }

    .tableWrapper {
      // padding-left: 6px;
      // padding-right: 6px;
      #customTableHeader {
        position: sticky;
        top: 40px;
      }

      .table-spacer {
        position: sticky;
        top: 64px;
        display: block;
        width: 100%;
        border-bottom: solid 1px $black;
      }

      .customTable {
        width: 100%;
        overflow-x: hidden;
        cursor: move;

        .headerTable {
          width: auto;
          margin-bottom: 0 + px;
          border-bottom: 2px solid $black;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          background-color: $lightweight;
          div {
            display: inline-block;
            margin-left: 6px;
            margin-right: 6px;

            background-color: $lightweight;
          }
        }

        .bodyTable {
          padding-top: 24px;
          display: inline-block;
          min-width: 100%;

          .table-row:hover {
            background-color: $lightweightdarker;
          }

          .table-row {
            transition: background-color 0.2s linear;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            border-bottom: 1px solid $black;
            min-width: 100%;
            // display: flex;
            // justify-content: flex-start;
            // flex-direction: row;

            .row-element {
              margin-left: 6px;
              margin-right: 6px;
              display: inline-block;

              .play-button {
                margin-bottom: 6px;
                &.playing {
                  background-color: $black;
                  color: $green;
                }
              }
            }

            p {
              font-size: 14px;
              line-height: 21px;
              margin: 0;
            }
          }
        }

        .custom-width-30-desktop {
          width: 30px;
          min-width: 30px;
        }
        .custom-width-60-desktop {
          width: 60px;
          min-width: 60px;
        }
        .custom-width-70-desktop {
          width: 70px;
          min-width: 70px;
        }
        .custom-width-90-desktop {
          width: 90px;
          min-width: 90px;
        }
        .custom-width-120-desktop {
          width: 120px;
          min-width: 120px;
        }
        .custom-width-150-desktop {
          width: 150px;
          min-width: 150px;
        }
        .custom-width-180-desktop {
          width: 180px;
          min-width: 180px;
        }
        .custom-width-240-desktop {
          width: 240px;
          min-width: 240px;
        }
        .custom-width-300-desktop {
          width: 300px;
          min-width: 300px;
        }
        .custom-width-420-desktop {
          width: 420px;
          min-width: 420px;
        }
        .custom-width-600-desktop {
          width: 600px;
          min-width: 600px;
        }

        .table-first-element-spacing {
          margin-left: 12px !important;
        }
      }

      .customTableHeader {
        overflow-x: hidden; /* Hide horizontal scrollbar */

        .headerTable {
          border-bottom: 0;
        }
      }

      table {
        display: none;
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
      }
    }
  }
}
/*Above */
@media only screen and (min-width: 1201px) {
}

/* Large Devices, Wide Screens */
@media only screen and (max-width: 1200px) {
}

/* Medium Devices, Desktops */
@media only screen and (max-width: 992px) {
}

/* Small Devices, Tablets */
@media only screen and (max-width: 768px) {
}

/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  .custom-width-100vwMax-mobile {
    width: 100vw !important;
    min-width: 100vw !important;
    max-width: 100vw !important;
  }
}

/* Custom, iPhone Retina */
@media only screen and (max-width: 320px) {
}
</style>

<script>
// Robinson projection, fitted to static/map.svg (1113 x 476, error < 3 px)
const ROBINSON_LEN = [1, 0.9986, 0.9954, 0.99, 0.9822, 0.973, 0.96, 0.9427,
  0.9216, 0.8962, 0.8679, 0.835, 0.7986, 0.7597, 0.7186, 0.6732, 0.6213,
  0.5722, 0.5322];
const ROBINSON_DFE = [0, 0.062, 0.124, 0.186, 0.248, 0.31, 0.372, 0.434,
  0.4958, 0.5571, 0.6176, 0.6769, 0.7346, 0.7903, 0.8435, 0.8936, 0.9394,
  0.9761, 1];
const MAP = { x0: 548.25, sx: 3.1549, y0: 278.05, sy: 287.36 };
function robinsonTable(table, lat) {
  const a = Math.min(Math.abs(lat), 90) / 5;
  const i = Math.min(Math.floor(a), 17);
  return table[i] + (table[i + 1] - table[i]) * (a - i);
}
function robinson(lon, lat) {
  const sign = lat < 0 ? -1 : 1;
  return {
    x: MAP.x0 + MAP.sx * robinsonTable(ROBINSON_LEN, lat) * lon,
    y: MAP.y0 - MAP.sy * sign * robinsonTable(ROBINSON_DFE, lat)
  };
}

export default {
  data() {
    return {
      current: {
        title: '',
        language: ''
      },
      initFilter: [
        // uncommented ones are the ones that are hidden
        // 'literal',
        // 'literalEnglish',
        // 'tags',
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
      player: '',
      tableMovement: {
        x: 0
      }
    };
  },
  computed: {
    // One dot per distinct location. The backend stores the two values swapped
    // (coordinates.lat holds the longitude), so read them the other way round.
    mapDots() {
      if (!this.allAudio) return [];
      const seen = {};
      const dots = [];
      this.allAudio.forEach(audio => {
        const c = audio.coordinates;
        if (!c) return;
        let lon = parseFloat(c.lat);
        let lat = parseFloat(c.long);
        if (isNaN(lon) || isNaN(lat)) return;
        if (lon === 0 && lat === 0) return; // no real location
        if (Math.abs(lat) > 90 && Math.abs(lon) <= 90) [lon, lat] = [lat, lon];
        if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return;
        const key = lon.toFixed(2) + ',' + lat.toFixed(2);
        if (seen[key]) return;
        seen[key] = true;
        dots.push({ key, ...robinson(lon, lat) });
      });
      return dots;
    }
  },
  methods: {
    isPlaying(audio) {
      return (
        this.isplaying &&
        this.current &&
        audio &&
        this.current.filePath === audio.filePath
      );
    },
    togglePlay(audio) {
      if (this.isPlaying(audio)) {
        this.player.pause();
        this.player.currentTime = 0;
        this.isplaying = false;
      } else {
        this.play(audio);
      }
    },
    stopLiveStream() {
      const stream = document.getElementById('audioStream');
      if (stream && !stream.paused) {
        stream.pause();
        const button = document.getElementById('playButton');
        if (button) button.src = '/play.svg';
      }
    },
    async initPlayer() {
      if (this.allAudio !== []) {
        this.current = await this.allAudio[this.index];
        //console.log(this.current);
        this.player.src = `${this.$config.baseURL}${this.current.filePath}`;
        //alert(`${this.$config.baseURL}${this.current.filePath}`);
      } else {
        this.song = true;
      }
    },
    async getAllAudios() {
      try {
        let response = await this.$axios.$get(
          '/audio'
          // {},
          // {
          //   auth: {
          //     username: '.',
          //     password: '.'
          //   }
          // }
        );
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
        this.addElements();
      } catch (err) {
        this.current = null;
        console.log(err);
      }
    },
    play(song) {
      // one Audio element for all recordings: a new src stops the previous one
      this.player.pause();
      if (song) {
        this.current = song;
        this.player.src = `${this.$config.baseURL}${this.current.filePath}`;
      }
      this.stopLiveStream();
      this.isplaying = true;
      const playing = this.player.play();
      if (playing && playing.catch) {
        playing.catch(err => {
          if (err.name !== 'AbortError') this.isplaying = false;
        });
      }
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
    },
    dragscrollmove(data) {
      let scroll = this.customTable.scrollLeft;
      this.customTableHeader.scrollLeft = scroll;
    },
    addElements() {
      this.customTable = document.getElementById('customTable');
      this.customTableHeader = document.getElementById('customTableHeader');
      console.log(document.getElementById('customTable'));
    }
  },
  created() {
    if (process.client) {
      this.player = new Audio();
      this.player.addEventListener('ended', () => {
        this.isplaying = false;
      });
    }
  },
  mounted() {
    this.getAllAudios();
    // the live stream in the footer stops a recording that plays
    this.liveStream = document.getElementById('audioStream');
    this.onLivePlay = () => {
      if (this.player && !this.player.paused) {
        this.player.pause();
        this.isplaying = false;
      }
    };
    if (this.liveStream) {
      this.liveStream.addEventListener('play', this.onLivePlay);
    }
  },
  beforeDestroy() {
    if (this.player) this.player.pause();
    if (this.liveStream) {
      this.liveStream.removeEventListener('play', this.onLivePlay);
    }
  }
};
</script>
<style scoped></style>
