<template>
  <section v-if="allAudio">
    <div class="container">
      <!-- <div class="">
        <h3 class="text-center">Manager</h3>
        <p style="color:red" class="text-center">Don't share this page!</p>
        <p>
          Number of all recordings: <span>{{ getRecordingCount() }}</span>
        </p>
      </div> -->

      <!-- <div class="row">
        <div class="col-md-12">
          <div class="card showdow">
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
          
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
                    <th class="filter-town" scope="col">Town</th>
                    <th class="filter-coordinates" scope="col">Coordinates</th>
                    <th class="filter-approval" scope="col">Approved</th>
                    <th class="filter-approval" scope="col">
                      Last approved by
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tr v-for="(audio, index) in allAudio" :key="index">
          
                  <td class="filter-literal">{{ audio.literal_text }}</td>
                  <td class="filter-literalEnglish">
                    {{ audio.literal_text_english }}
                  </td>
                  <td class="filter-tags">
                    <div v-for="(tag, index) in audio.tags" :key="index">
                      <span>{{ tag }}</span>
                    </div>
                  </td>
                  <td class="filter-keywords">
                    <div
                      v-for="(keyword, index) in audio.keywords"
                      :key="index"
                    >
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
                    {{ audio.coordinates.lat }}, <br />{{
                      audio.coordinates.long
                    }}
                  </td>
                  <td class="filter-approval">{{ audio.approved }}</td>
                  <td class="filter-approval">{{ audio.approved_by }}</td>
                  <td>
                    <button
                      class="btn btn-primary btn-sm edit-buttons"
                      @click="play(audio)"
                    >
                      Play
                    </button>
                    <button
                      class="btn btn-warning btn-sm edit-buttons"
                      @click="editAudio(audio._id)"
                    >
                      Edit
                    </button>
                    <button
                      class="btn btn-danger btn-sm edit-buttons"
                      @click="deleteAudio(audio._id)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="spacer"></div>

    <div class="recordingsWrapper">
      <div class="instructions ">
        <h1 style="color: red">Manager</h1>
        <h1 style="color: red">Do not share!</h1>
        <h3>Total {{ getRecordingCount() }} recordings</h3>
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
        <button
          class="btn btn-sm active btn-filter-tags"
          @click="toggleData('tags', $event)"
        >
          Tags
        </button>
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
          Location
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
      <div class="filter-wrapper">
        <button
          class="btn btn-outline-dark btn-sm btn-filter-approval"
          @click="filterAudios('unapproved', $event)"
        >
          Only show unapproved
        </button>
      </div>

      <div class="tableWrapper">
        <div id="customTableHeader" class="customTable customTableHeader">
          <div class="headerTable">
            <div class=" custom-width-90-desktop table-first-element-spacing">
              Listen
            </div>
            <div class="filter-approval custom-width-90-desktop">
              Approved
            </div>
            <div class="filter-approval custom-width-150-desktop">
              Last approved by
            </div>
            <div class="filter-literal custom-width-600-desktop">
              Literal text
            </div>
            <div class="filter-literalEnglish custom-width-600-desktop">
              Literal text english
            </div>
            <div class="filter-tags custom-width-180-desktop">Tags</div>
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
                class="row-element custom-width-90-desktop table-first-element-spacing"
              >
                <button class="btn play-button" @click="play(audio)">
                  Play
                </button>
                <button class="btn edit-button" @click="editAudio(audio._id)">
                  Edit
                </button>
                <button
                  class="btn delete-button"
                  @click="deleteAudio(audio._id)"
                >
                  Delete
                </button>
              </div>
              <div class="row-element filter-approval custom-width-90-desktop">
                <p
                  :class="[
                    audio.approved == false ? 'color-red' : '',
                    audio.approved == true ? 'color-green' : ''
                  ]"
                >
                  {{ audio.approved }}
                </p>
              </div>
              <div class="row-element filter-approval custom-width-150-desktop">
                <p
                  :class="[
                    audio.approved_by === 'needs approval' ? 'color-red' : ''
                  ]"
                >
                  {{ audio.approved_by }}
                </p>
              </div>
              <div class="row-element filter-literal custom-width-600-desktop">
                <p>{{ audio.literal_text }}</p>
              </div>
              <div
                class="row-element filter-literalEnglish custom-width-600-desktop"
              >
                <p>{{ audio.literal_text_english }}</p>
              </div>
              <div class="row-element filter-tags custom-width-180-desktop">
                <div v-for="(tag, index) in audio.tags" :key="index">
                  <span
                    ><p>{{ tag }}</p></span
                  >
                </div>
              </div>
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
.color-red {
  color: red;
}

.color-green {
  color: green;
}

.spacer {
  height: 50px;
}
table {
  font-size: 12px;
}

.card-body {
  overflow-x: scroll;
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
      background-color: black;
      border-radius: 0;
      border: 0;
      color: white;
      border: solid 1px black;
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
    // font-family: Arial, Helvetica, sans-serif;

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
        margin-bottom: 12px;
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
            }

            .edit-button {
              margin-bottom: 6px;
              background-color: orange;
            }

            .delete-button {
              font-size: 10px;
              margin-bottom: 6px;
              background-color: red;
              // transform: scale(0.7);
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
</style>

<script>
import swal from 'sweetalert';
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
        // "literalEnglish",
        // 'tags',
        // "keywords",
        // "language",
        'dialect',
        'native-language',
        'country',
        // "town",
        'coordinates'
        // "approval",
      ],
      dataFilterActive: {
        onlyUnapproved: false
      },
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
  methods: {
    async initPlayer() {
      if (this.allAudio !== []) {
        this.current = await this.allAudio[this.index];
        // console.log(this.current);
        this.player.src = `${this.$config.baseURL}${this.current.filePath}`;
      } else {
        this.song = true;
      }
    },
    async getAllAudios() {
      try {
        let response = await this.$axios.$get(
          '/audio/private/withid' // {},
          // {
          //   auth: {
          //     username: '.',
          //     password: '.'
          //   }
          // }
        );
        response.reverse();
        // console.log(response);
        if (response === []) {
          this.song = true;
          this.current = null;
        } else {
          this.song = false;
          this.allAudio = response;
          this.originalAllAudio = response;
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
    deleteAudio(id) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this Audio!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.$axios
            .$delete('/audio/private/' + id)
            .then(response => {
              this.getAllAudios();
              swal('Poof! Your Audio file has been deleted!', {
                icon: 'success'
              });
            })
            .catch(err => {
              swal('Error', 'Somethimg went wrong', 'error');
            });
        } else {
          swal('Your Audio file is safe!');
        }
      });
    },
    editAudio(id) {
      console.log(id);
      // this.$router.push('/manager/' + id);
      let routeData = this.$router.resolve({ name: '/manager/' + id });
      console.log(routeData);
      window.open(routeData.route.name, '_blank');
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
    },
    filterAudios(filter) {
      if (filter === 'unapproved') {
        this.dataFilterActive.onlyUnapproved = !this.dataFilterActive
          .onlyUnapproved;
      }

      let audios = this.originalAllAudio;
      let filtered = [];

      for (let i = 0; i < audios.length; i++) {
        const a = audios[i];

        if (this.dataFilterActive.onlyUnapproved) {
          if (a.approved) {
            continue;
          }
        }
        filtered.push(a);
      }

      this.allAudio = filtered;
      console.log(this.allAudio.length);
    }
  },

  created() {
    if (process.client) {
      this.player = new Audio();
    }
  },
  mounted() {
    this.getAllAudios();
  }
};
</script>
