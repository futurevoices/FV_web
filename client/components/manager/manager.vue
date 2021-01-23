<template>
  <section v-if="allAudio">
    <div class="container">
      <div class="row mt-2 mb-1">
        <div class="col-md-12">
          <h3 class="text-center">Manager</h3>
          <p style="color:red" class="text-center">Don't share this page!</p>
          <p>
            Number of all recordings: <span>{{ getRecordingCount() }}</span>
          </p>
        </div>
      </div>

      <div class="row mt-2 mb-1">
        <div class="col-md-12">
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
            <button
              class="btn btn-outline-dark btn-sm active btn-filter-approval"
              @click="toggleData('approval', $event)"
            >
              Approval
            </button>
          </div>
          <div class="filter-wrapper">
            <button
              class="btn btn-outline-dark btn-sm btn-filter-approval"
              @click="filterAudios('unapproved', $event)"
            >
              Only show unapproved
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card showdow">
            <div class="card-body">
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
                  <!-- <th>{{ index + 1 }}</th> -->
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
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
table {
  font-size: 12px;
}

.card-body {
  overflow-x: scroll;
}

.filter-wrapper {
  /* display: flex; */
  /* justify-content: center;
  align-items: center; */
  margin-bottom: 24px;
  margin-top: 12px;
}

.edit-buttons {
  margin-bottom: 4px;
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
      player: ''
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
  mounted() {},
  created() {
    if (process.client) {
      this.player = new Audio();
    }
    this.getAllAudios();
  }
};
</script>
