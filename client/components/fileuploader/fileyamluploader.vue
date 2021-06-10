<template>
  <section class="">
    <div class="container mb-4">
      <div class="row mt-2 mb-1">
        <div class="col-md-12">
          <h3 class="text-center">Secret file uploader</h3>
          <h3 class="text-center">Don't share!</h3>
          <h3 class="text-center">
            Unfortunately only works in Chrome (no firefox / safari)
          </h3>
        </div>
      </div>
      <div class="row uploader-card">
        <div class="col-md-12">
          <div class="card shaddow">
            <div class="card-body col-md-6 mx-auto">
              <form @submit.prevent="addNewAudio">
                <div class="form-group">
                  <label for="artist"
                    >Audio <span style="color: red">*</span> (only wavs)</label
                  >
                  <div class="custom-file">
                    <input
                      type="file"
                      id="customFile"
                      ref="file"
                      v-on:change="handleFileUpload()"
                      class="custom-file-input"
                      accept=".wav"
                    />
                    <label class="custom-file-label" for="customFile"
                      >Choose file</label
                    >
                  </div>
                  <div class="custom-file">
                    <input
                      type="file"
                      id="customYaml"
                      ref="file2"
                      v-on:change="handleYamlUpload()"
                      class="custom-file-input"
                      accept=".yaml"
                    />
                    <label class="custom-file-label" for="customYaml"
                      >Choose yaml</label
                    >
                  </div>
                </div>

                <div class="form-group">
                  <button class="btn btn-primary" :disabled="isDisabled">
                    <span
                      class="spinner-border spinner-border-sm"
                      v-if="addLoading"
                      role="status"
                      aria-hidden="true"
                    ></span
                    >Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import swal from 'sweetalert';
import ISO6391 from 'iso-639-1';
import countriesList from 'countries-list';
import yaml from 'js-yaml';

export default {
  data() {
    return {
      loadedJSON: '',
      audioDetails: {
        literal_text: '',
        literal_text_english: '',
        keywords: [],
        tags: [],
        language_short: '',
        dialect: '',
        speaker_native_language: '',
        country: '',
        town: '',
        long: '',
        lat: '',
        audio: ''
      },
      allAudio: [],
      audioLoading: false,
      isValid: false,
      addState: false,
      addLoading: false,
      tagKeyword: '',
      tagsKeyword: [],
      autocompleteItemsKeyword: [
        // {
        //   text: "Spain"
        // },
        // {
        //   text: "France"
        // },
        // {
        //   text: "USA"
        // },
        // {
        //   text: "Germany"
        // },
        // {
        //   text: "China"
        // }
      ],
      tagTag: '',
      tagsTag: [],
      autocompleteItemsTag: []
    };
  },
  computed: {
    isDisabled: function() {
      if (this.audioDetails.audio === '' || this.loadedJSON === '') {
        return !this.isValid;
      }
    },
    filteredItemsKeyword() {
      return this.autocompleteItemsKeyword.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
    filteredItemsTag() {
      return this.autocompleteItemsTag.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
    getKeywordTags() {
      return this.tagsKeyword;
    },
    getTagTags() {
      return this.tagsTag;
    }
  },
  methods: {
    initForm() {
      this.addState = !this.addState;
    },
    handleFileUpload() {
      console.log('yeah');
      console.log(this.$refs.file.files);
      this.audioDetails.audio = this.$refs.file.files[0];
      console.log(this.audioDetails.audio);
      console.log(this.audioDetails.audio.type);
    },
    handleYamlUpload() {
      var self = this;
      let fileToLoad = this.$refs.file2.files[0];

      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        let parsed = yaml.load(textFromFileLoaded);
        self.loadedJSON = parsed;
        // console.log(JSON.stringify(parsed));
        console.log(self.loadedJSON);
      };

      fileReader.readAsText(fileToLoad, 'UTF-8');

      // yaml.loadAll(file, function(doc) {
      //   console.log(doc);
      // });
      // console.log(file);
      // console.log(this.audioDetails.audio);
      // console.log(this.audioDetails.audio.type);
    },
    addNewAudio() {
      let types = /(\.|\/)(mp3|wav)$/i;
      if (
        types.test(this.audioDetails.audio.type) ||
        types.test(this.audioDetails.audio.name)
      ) {
        // let formData = new FormData();
        // formData.append('literal_text', this.audioDetails.literal_text);
        // formData.append(
        //   'literal_text_english',
        //   this.audioDetails.literal_text_english
        // );

        // // keywords tags
        // let ktags = [];
        // this.tagsKeyword.forEach(tag => {
        //   ktags.push(tag.text);
        // });
        // formData.append('keywords', JSON.stringify(ktags));

        // // tag tags
        // let ttags = [];
        // this.tagsTag.forEach(tag => {
        //   ttags.push(tag.text);
        // });
        // formData.append('tags', JSON.stringify(ttags));

        // formData.append('language_short', this.audioDetails.language_short);
        // formData.append(
        //   'language',
        //   ISO6391.getName(this.audioDetails.language_short.toLowerCase())
        // );

        // formData.append('dialect', this.audioDetails.dialect);
        // formData.append(
        //   'speaker_native_language',
        //   this.audioDetails.speaker_native_language
        // );
        // formData.append('country_code', this.audioDetails.country);
        // formData.append(
        //   'country',
        //   countriesList.countries[this.audioDetails.country].name
        // );

        // formData.append('town', this.audioDetails.town);
        // formData.append('long', this.audioDetails.long);
        // formData.append('lat', this.audioDetails.lat);
        // formData.append('audio', this.audioDetails.audio);

        // // timestamps
        // const timestampstring = new Date().toString();

        // formData.append(
        //   'user_timestamp',
        //   new Date(
        //     new Date().getTime() - new Date().getTimezoneOffset() * 60000
        //   ).toISOString()
        // );
        // formData.append('user_timestamp_string', timestampstring);

        // Display the key/value pairs
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ", " + pair[1]);
        // }

        var formData = new FormData();

        for (var key in this.loadedJSON) {
          formData.append(key, this.loadedJSON[key]);
        }

        this.addLoading = true;
        this.$axios
          .$post('/audio', formData)
          .then(response => {
            console.log(response);
            this.addLoading = false;
            this.audioDetails = {};
            swal('Success', 'New Audio Added', 'success');
          })
          .catch(err => {
            this.addLoading = false;
            swal('Error', 'Something Went wrong', 'error');
            console.log(err);
          });
      } else {
        swal('Error', 'Invalid file type', 'error');
        return !this.isValid;
      }
    },
    getGps() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setPosition);
        document.getElementById('gps-button-text').innerHTML = '...';
      } else {
        swal('Sorry', 'Your device doesn‘t support geolocation.', 'error');
      }
    },
    setPosition(position) {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      document.getElementById('inputLat').value =
        Math.floor(lat * 100 + 0.5) / 100;
      document.getElementById('inputLong').value =
        Math.floor(long * 100 + 0.5) / 100;
      console.log(position);
      document.getElementById('gps-button-text').innerHTML =
        'Use Gps (rounded to 2 decimals for privacy)';
      // somehow the data doesn't get passed, so adding it manually
      this.audioDetails.lat = document.getElementById('inputLat').value;
      this.audioDetails.long = document.getElementById('inputLong').value;
    },
    growingTextbox() {
      this.textBoxes = document.getElementsByClassName('growingTextbox');
      this.textBoxes.forEach(txtbox => {
        txtbox.addEventListener(
          'keyup',
          function() {
            this.style.overflow = 'hidden';
            this.style.height = 0;
            this.style.height = this.scrollHeight + 'px';
          },
          false
        );
        txtbox.style.overflow = 'hidden';
        txtbox.style.height = 0;
        txtbox.style.height = txtbox.scrollHeight + 'px';
      });
    }
  },
  mounted() {
    this.growingTextbox();
  },
  created() {}
};
</script>

<style lang="scss">
.custom-file {
  margin-bottom: 24px;
}

#gps-button-text {
  margin: 0 !important;
  padding: 0;
}
#inputLat {
  margin-bottom: 4px;
}
.uploader-card {
  margin-bottom: $footerRadioHeight;
}

/* style the background and the text color of the input ... */
.vue-tags-input {
  background: #324652;
  max-width: 100% !important;
}

.vue-tags-input .ti-new-tag-input {
  background: transparent;
  color: #b7c4c9;
}

.vue-tags-input .ti-input {
  padding: 4px 10px;
  transition: border-bottom 200ms ease;
  border-radius: 4px;
}

/* we cange the border color if the user focuses the input */
.vue-tags-input.ti-focus .ti-input {
  border: 1px solid #ebde6e;
}

/* some stylings for the autocomplete layer */
.vue-tags-input .ti-autocomplete {
  background: #283944;
  border: 1px solid #8b9396;
  border-top: none;
}

/* the selected item in the autocomplete layer, should be highlighted */
.vue-tags-input .ti-item.ti-selected-item {
  background: #ebde6e;
  color: #283944;
}

/* style the placeholders color across all browser */
.vue-tags-input ::-webkit-input-placeholder {
  color: #a4b1b6;
}

.vue-tags-input ::-moz-placeholder {
  color: #a4b1b6;
}

.vue-tags-input :-ms-input-placeholder {
  color: #a4b1b6;
}

.vue-tags-input :-moz-placeholder {
  color: #a4b1b6;
}

/* default styles for all the tags */
.vue-tags-input .ti-tag {
  position: relative;
  background: #ebde6e;
  color: #283944;
}

/* we defined a custom css class in the data model, now we are using it to style the tag */
.vue-tags-input .ti-tag.custom-class {
  background: transparent;
  border: 1px solid #ebde6e;
  color: #ebde6e;
  margin-right: 4px;
  border-radius: 0px;
  font-size: 13px;
}

/* the styles if a tag is invalid */
.vue-tags-input .ti-tag.ti-invalid {
  background-color: #e88a74;
}

/* if the user input is invalid, the input color should be red */
.vue-tags-input .ti-new-tag-input.ti-invalid {
  color: #e88a74;
}

/* if a tag or the user input is a duplicate, it should be crossed out */
.vue-tags-input .ti-duplicate span,
.vue-tags-input .ti-new-tag-input.ti-duplicate {
  text-decoration: line-through;
}

/* if the user presses backspace, the complete tag should be crossed out, to mark it for deletion */
.vue-tags-input .ti-tag:after {
  transition: transform 0.2s;
  position: absolute;
  content: '';
  height: 2px;
  width: 108%;
  left: -4%;
  top: calc(50% - 1px);
  background-color: #000;
  transform: scaleX(0);
}

.vue-tags-input .ti-deletion-mark:after {
  transform: scaleX(1);
}
</style>
