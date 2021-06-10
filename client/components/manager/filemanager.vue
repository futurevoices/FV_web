<template>
  <section class="">
    <div class="container mb-4">
      <div class="row mt-2 mb-1">
        <div class="col-md-12">
          <br />
          <br />
          <br />
          <h3 style="color:red" class="text-center">File Edit</h3>
          <p style="color: red; text-align:center">
            Only disapprove hatespeach. Grammar errors or bad quality are fine.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card shaddow ">
            <div class="card-body col-md-6 mx-auto">
              <form>
                <h3 for="audio">Audio</h3>
                <audio id="preview-audio" controls src=""></audio>
                <h3 for="audio">Metadata</h3>

                <div class="form-group">
                  <label for="title">Literal Text</label>
                  <textarea
                    type="text"
                    v-model="audioDetails.literal_text"
                    class="form-control growingTextbox"
                  />
                </div>

                <div class="form-group">
                  <label for="title">Literal Text English (voluntary)</label>
                  <textarea
                    type="text"
                    v-model="audioDetails.literal_text_english"
                    class="form-control growingTextbox"
                  />
                </div>

                <div class="form-group">
                  <label for="title">Keywords</label>
                  <client-only>
                    <vue-tags-input
                      v-model="tagKeyword"
                      :tags="tagsKeyword"
                      :autocomplete-items="filteredItemsKeyword"
                      @tags-changed="newTags => (tagsKeyword = newTags)"
                    />
                  </client-only>
                </div>

                <div class="form-group">
                  <label for="title">Tags</label>
                  <client-only>
                    <vue-tags-input
                      v-model="tagTag"
                      :tags="tagsTag"
                      :autocomplete-items="filteredItemsTag"
                      @tags-changed="newTags => (tagsTag = newTags)"
                    />
                  </client-only>
                </div>

                <div class="form-group">
                  <label for="language"
                    >Language <span style="color:red">*</span></label
                  >
                  <select
                    id="language-selector"
                    v-model="audioDetails.language_short"
                    class="form-control"
                  >
                    <option value="" disabled selected>Speaker language</option>
                    <option value="DE">German</option>
                    <option value="EN">English</option>
                    <option value="ES">Spanish</option>
                    <option value="ZH">Chinese (Mandarin)</option>
                    <option value="AF">Afrikaans</option>
                    <option value="SQ">Albanian</option>
                    <option value="AR">Arabic</option>
                    <option value="HY">Armenian</option>
                    <option value="EU">Basque</option>
                    <option value="BN">Bengali</option>
                    <option value="BG">Bulgarian</option>
                    <option value="CA">Catalan</option>
                    <option value="KM">Cambodian</option>
                    <option value="HR">Croatian</option>
                    <option value="CS">Czech</option>
                    <option value="DA">Danish</option>
                    <option value="NL">Dutch</option>
                    <option value="ET">Estonian</option>
                    <option value="FJ">Fiji</option>
                    <option value="FI">Finnish</option>
                    <option value="FR">French</option>
                    <option value="KA">Georgian</option>
                    <option value="EL">Greek</option>
                    <option value="GU">Gujarati</option>
                    <option value="HE">Hebrew</option>
                    <option value="HI">Hindi</option>
                    <option value="HU">Hungarian</option>
                    <option value="IS">Icelandic</option>
                    <option value="ID">Indonesian</option>
                    <option value="GA">Irish</option>
                    <option value="IT">Italian</option>
                    <option value="JA">Japanese</option>
                    <option value="JW">Javanese</option>
                    <option value="KO">Korean</option>
                    <option value="LA">Latin</option>
                    <option value="LV">Latvian</option>
                    <option value="LT">Lithuanian</option>
                    <option value="MK">Macedonian</option>
                    <option value="MS">Malay</option>
                    <option value="ML">Malayalam</option>
                    <option value="MT">Maltese</option>
                    <option value="MI">Maori</option>
                    <option value="MR">Marathi</option>
                    <option value="MN">Mongolian</option>
                    <option value="NE">Nepali</option>
                    <option value="NO">Norwegian</option>
                    <option value="FA">Persian</option>
                    <option value="PL">Polish</option>
                    <option value="PT">Portuguese</option>
                    <option value="PA">Punjabi</option>
                    <option value="QU">Quechua</option>
                    <option value="RO">Romanian</option>
                    <option value="RU">Russian</option>
                    <option value="SM">Samoan</option>
                    <option value="SR">Serbian</option>
                    <option value="SK">Slovak</option>
                    <option value="SL">Slovenian</option>
                    <option value="SW">Swahili</option>
                    <option value="SV">Swedish</option>
                    <option value="TA">Tamil</option>
                    <option value="TT">Tatar</option>
                    <option value="TE">Telugu</option>
                    <option value="TH">Thai</option>
                    <option value="BO">Tibetan</option>
                    <option value="TO">Tonga</option>
                    <option value="TR">Turkish</option>
                    <option value="UK">Ukrainian</option>
                    <option value="UR">Urdu</option>
                    <option value="UZ">Uzbek</option>
                    <option value="VI">Vietnamese</option>
                    <option value="CY">Welsh</option>
                    <option value="XH">Xhosa</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="title">Speaker Dialect</label>
                  <input
                    type="text"
                    v-model="audioDetails.dialect"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <label for="language">Speaker native language</label>
                  <select
                    id="language-native-selector"
                    v-model="audioDetails.speaker_native_language"
                    class="form-control"
                  >
                    <option value="" disabled selected
                      >Speaker native language</option
                    >
                    <option value="DE">German</option>
                    <option value="EN">English</option>
                    <option value="ES">Spanish</option>
                    <option value="ZH">Chinese (Mandarin)</option>
                    <option value="AF">Afrikaans</option>
                    <option value="SQ">Albanian</option>
                    <option value="AR">Arabic</option>
                    <option value="HY">Armenian</option>
                    <option value="EU">Basque</option>
                    <option value="BN">Bengali</option>
                    <option value="BG">Bulgarian</option>
                    <option value="CA">Catalan</option>
                    <option value="KM">Cambodian</option>
                    <option value="HR">Croatian</option>
                    <option value="CS">Czech</option>
                    <option value="DA">Danish</option>
                    <option value="NL">Dutch</option>
                    <option value="ET">Estonian</option>
                    <option value="FJ">Fiji</option>
                    <option value="FI">Finnish</option>
                    <option value="FR">French</option>
                    <option value="KA">Georgian</option>
                    <option value="EL">Greek</option>
                    <option value="GU">Gujarati</option>
                    <option value="HE">Hebrew</option>
                    <option value="HI">Hindi</option>
                    <option value="HU">Hungarian</option>
                    <option value="IS">Icelandic</option>
                    <option value="ID">Indonesian</option>
                    <option value="GA">Irish</option>
                    <option value="IT">Italian</option>
                    <option value="JA">Japanese</option>
                    <option value="JW">Javanese</option>
                    <option value="KO">Korean</option>
                    <option value="LA">Latin</option>
                    <option value="LV">Latvian</option>
                    <option value="LT">Lithuanian</option>
                    <option value="MK">Macedonian</option>
                    <option value="MS">Malay</option>
                    <option value="ML">Malayalam</option>
                    <option value="MT">Maltese</option>
                    <option value="MI">Maori</option>
                    <option value="MR">Marathi</option>
                    <option value="MN">Mongolian</option>
                    <option value="NE">Nepali</option>
                    <option value="NO">Norwegian</option>
                    <option value="FA">Persian</option>
                    <option value="PL">Polish</option>
                    <option value="PT">Portuguese</option>
                    <option value="PA">Punjabi</option>
                    <option value="QU">Quechua</option>
                    <option value="RO">Romanian</option>
                    <option value="RU">Russian</option>
                    <option value="SM">Samoan</option>
                    <option value="SR">Serbian</option>
                    <option value="SK">Slovak</option>
                    <option value="SL">Slovenian</option>
                    <option value="SW">Swahili</option>
                    <option value="SV">Swedish</option>
                    <option value="TA">Tamil</option>
                    <option value="TT">Tatar</option>
                    <option value="TE">Telugu</option>
                    <option value="TH">Thai</option>
                    <option value="BO">Tibetan</option>
                    <option value="TO">Tonga</option>
                    <option value="TR">Turkish</option>
                    <option value="UK">Ukrainian</option>
                    <option value="UR">Urdu</option>
                    <option value="UZ">Uzbek</option>
                    <option value="VI">Vietnamese</option>
                    <option value="CY">Welsh</option>
                    <option value="XH">Xhosa</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="language"
                    >Country <span style="color:red">*</span></label
                  >
                  <select v-model="audioDetails.country" class="form-control">
                    <option value="" disabled selected>Country</option>
                    <!-- https://www.freeformatter.com/iso-country-list-html-select.html#alpha2 -->
                    <option value="DE">Germany</option>
                    <option value="US">United States</option>
                    <option value="AF">Afghanistan</option>
                    <option value="AX">Åland Islands</option>
                    <option value="AL">Albania</option>
                    <option value="DZ">Algeria</option>
                    <option value="AS">American Samoa</option>
                    <option value="AD">Andorra</option>
                    <option value="AO">Angola</option>
                    <option value="AI">Anguilla</option>
                    <option value="AQ">Antarctica</option>
                    <option value="AG">Antigua and Barbuda</option>
                    <option value="AR">Argentina</option>
                    <option value="AM">Armenia</option>
                    <option value="AW">Aruba</option>
                    <option value="AU">Australia</option>
                    <option value="AT">Austria</option>
                    <option value="AZ">Azerbaijan</option>
                    <option value="BS">Bahamas</option>
                    <option value="BH">Bahrain</option>
                    <option value="BD">Bangladesh</option>
                    <option value="BB">Barbados</option>
                    <option value="BY">Belarus</option>
                    <option value="BE">Belgium</option>
                    <option value="BZ">Belize</option>
                    <option value="BJ">Benin</option>
                    <option value="BM">Bermuda</option>
                    <option value="BT">Bhutan</option>
                    <option value="BO">Bolivia, Plurinational State of</option>
                    <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                    <option value="BA">Bosnia and Herzegovina</option>
                    <option value="BW">Botswana</option>
                    <option value="BV">Bouvet Island</option>
                    <option value="BR">Brazil</option>
                    <option value="IO">British Indian Ocean Territory</option>
                    <option value="BN">Brunei Darussalam</option>
                    <option value="BG">Bulgaria</option>
                    <option value="BF">Burkina Faso</option>
                    <option value="BI">Burundi</option>
                    <option value="KH">Cambodia</option>
                    <option value="CM">Cameroon</option>
                    <option value="CA">Canada</option>
                    <option value="CV">Cape Verde</option>
                    <option value="KY">Cayman Islands</option>
                    <option value="CF">Central African Republic</option>
                    <option value="TD">Chad</option>
                    <option value="CL">Chile</option>
                    <option value="CN">China</option>
                    <option value="CX">Christmas Island</option>
                    <option value="CC">Cocos (Keeling) Islands</option>
                    <option value="CO">Colombia</option>
                    <option value="KM">Comoros</option>
                    <option value="CG">Congo</option>
                    <option value="CD">
                      Congo, the Democratic Republic of the
                    </option>
                    <option value="CK">Cook Islands</option>
                    <option value="CR">Costa Rica</option>
                    <option value="CI">Côte d'Ivoire</option>
                    <option value="HR">Croatia</option>
                    <option value="CU">Cuba</option>
                    <option value="CW">Curaçao</option>
                    <option value="CY">Cyprus</option>
                    <option value="CZ">Czech Republic</option>
                    <option value="DK">Denmark</option>
                    <option value="DJ">Djibouti</option>
                    <option value="DM">Dominica</option>
                    <option value="DO">Dominican Republic</option>
                    <option value="EC">Ecuador</option>
                    <option value="EG">Egypt</option>
                    <option value="SV">El Salvador</option>
                    <option value="GQ">Equatorial Guinea</option>
                    <option value="ER">Eritrea</option>
                    <option value="EE">Estonia</option>
                    <option value="ET">Ethiopia</option>
                    <option value="FK">Falkland Islands (Malvinas)</option>
                    <option value="FO">Faroe Islands</option>
                    <option value="FJ">Fiji</option>
                    <option value="FI">Finland</option>
                    <option value="FR">France</option>
                    <option value="GF">French Guiana</option>
                    <option value="PF">French Polynesia</option>
                    <option value="TF">French Southern Territories</option>
                    <option value="GA">Gabon</option>
                    <option value="GM">Gambia</option>
                    <option value="GE">Georgia</option>
                    <option value="GH">Ghana</option>
                    <option value="GI">Gibraltar</option>
                    <option value="GR">Greece</option>
                    <option value="GL">Greenland</option>
                    <option value="GD">Grenada</option>
                    <option value="GP">Guadeloupe</option>
                    <option value="GU">Guam</option>
                    <option value="GT">Guatemala</option>
                    <option value="GG">Guernsey</option>
                    <option value="GN">Guinea</option>
                    <option value="GW">Guinea-Bissau</option>
                    <option value="GY">Guyana</option>
                    <option value="HT">Haiti</option>
                    <option value="HM">
                      Heard Island and McDonald Islands
                    </option>
                    <option value="VA">Holy See (Vatican City State)</option>
                    <option value="HN">Honduras</option>
                    <option value="HK">Hong Kong</option>
                    <option value="HU">Hungary</option>
                    <option value="IS">Iceland</option>
                    <option value="IN">India</option>
                    <option value="ID">Indonesia</option>
                    <option value="IR">Iran, Islamic Republic of</option>
                    <option value="IQ">Iraq</option>
                    <option value="IE">Ireland</option>
                    <option value="IM">Isle of Man</option>
                    <option value="IL">Israel</option>
                    <option value="IT">Italy</option>
                    <option value="JM">Jamaica</option>
                    <option value="JP">Japan</option>
                    <option value="JE">Jersey</option>
                    <option value="JO">Jordan</option>
                    <option value="KZ">Kazakhstan</option>
                    <option value="KE">Kenya</option>
                    <option value="KI">Kiribati</option>
                    <option value="KP">
                      Korea, Democratic People's Republic of
                    </option>
                    <option value="KR">Korea, Republic of</option>
                    <option value="KW">Kuwait</option>
                    <option value="KG">Kyrgyzstan</option>
                    <option value="LA">Lao People's Democratic Republic</option>
                    <option value="LV">Latvia</option>
                    <option value="LB">Lebanon</option>
                    <option value="LS">Lesotho</option>
                    <option value="LR">Liberia</option>
                    <option value="LY">Libya</option>
                    <option value="LI">Liechtenstein</option>
                    <option value="LT">Lithuania</option>
                    <option value="LU">Luxembourg</option>
                    <option value="MO">Macao</option>
                    <option value="MK">
                      Macedonia, the former Yugoslav Republic of
                    </option>
                    <option value="MG">Madagascar</option>
                    <option value="MW">Malawi</option>
                    <option value="MY">Malaysia</option>
                    <option value="MV">Maldives</option>
                    <option value="ML">Mali</option>
                    <option value="MT">Malta</option>
                    <option value="MH">Marshall Islands</option>
                    <option value="MQ">Martinique</option>
                    <option value="MR">Mauritania</option>
                    <option value="MU">Mauritius</option>
                    <option value="YT">Mayotte</option>
                    <option value="MX">Mexico</option>
                    <option value="FM">Micronesia, Federated States of</option>
                    <option value="MD">Moldova, Republic of</option>
                    <option value="MC">Monaco</option>
                    <option value="MN">Mongolia</option>
                    <option value="ME">Montenegro</option>
                    <option value="MS">Montserrat</option>
                    <option value="MA">Morocco</option>
                    <option value="MZ">Mozambique</option>
                    <option value="MM">Myanmar</option>
                    <option value="NA">Namibia</option>
                    <option value="NR">Nauru</option>
                    <option value="NP">Nepal</option>
                    <option value="NL">Netherlands</option>
                    <option value="NC">New Caledonia</option>
                    <option value="NZ">New Zealand</option>
                    <option value="NI">Nicaragua</option>
                    <option value="NE">Niger</option>
                    <option value="NG">Nigeria</option>
                    <option value="NU">Niue</option>
                    <option value="NF">Norfolk Island</option>
                    <option value="MP">Northern Mariana Islands</option>
                    <option value="NO">Norway</option>
                    <option value="OM">Oman</option>
                    <option value="PK">Pakistan</option>
                    <option value="PW">Palau</option>
                    <option value="PS">Palestinian Territory, Occupied</option>
                    <option value="PA">Panama</option>
                    <option value="PG">Papua New Guinea</option>
                    <option value="PY">Paraguay</option>
                    <option value="PE">Peru</option>
                    <option value="PH">Philippines</option>
                    <option value="PN">Pitcairn</option>
                    <option value="PL">Poland</option>
                    <option value="PT">Portugal</option>
                    <option value="PR">Puerto Rico</option>
                    <option value="QA">Qatar</option>
                    <option value="RE">Réunion</option>
                    <option value="RO">Romania</option>
                    <option value="RU">Russian Federation</option>
                    <option value="RW">Rwanda</option>
                    <option value="BL">Saint Barthélemy</option>
                    <option value="SH">
                      Saint Helena, Ascension and Tristan da Cunha
                    </option>
                    <option value="KN">Saint Kitts and Nevis</option>
                    <option value="LC">Saint Lucia</option>
                    <option value="MF">Saint Martin (French part)</option>
                    <option value="PM">Saint Pierre and Miquelon</option>
                    <option value="VC">Saint Vincent and the Grenadines</option>
                    <option value="WS">Samoa</option>
                    <option value="SM">San Marino</option>
                    <option value="ST">Sao Tome and Principe</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="SN">Senegal</option>
                    <option value="RS">Serbia</option>
                    <option value="SC">Seychelles</option>
                    <option value="SL">Sierra Leone</option>
                    <option value="SG">Singapore</option>
                    <option value="SX">Sint Maarten (Dutch part)</option>
                    <option value="SK">Slovakia</option>
                    <option value="SI">Slovenia</option>
                    <option value="SB">Solomon Islands</option>
                    <option value="SO">Somalia</option>
                    <option value="ZA">South Africa</option>
                    <option value="GS">
                      South Georgia and the South Sandwich Islands
                    </option>
                    <option value="SS">South Sudan</option>
                    <option value="ES">Spain</option>
                    <option value="LK">Sri Lanka</option>
                    <option value="SD">Sudan</option>
                    <option value="SR">Suriname</option>
                    <option value="SJ">Svalbard and Jan Mayen</option>
                    <option value="SZ">Swaziland</option>
                    <option value="SE">Sweden</option>
                    <option value="CH">Switzerland</option>
                    <option value="SY">Syrian Arab Republic</option>
                    <option value="TW">Taiwan</option>
                    <option value="TJ">Tajikistan</option>
                    <option value="TZ">Tanzania, United Republic of</option>
                    <option value="TH">Thailand</option>
                    <option value="TL">Timor-Leste</option>
                    <option value="TG">Togo</option>
                    <option value="TK">Tokelau</option>
                    <option value="TO">Tonga</option>
                    <option value="TT">Trinidad and Tobago</option>
                    <option value="TN">Tunisia</option>
                    <option value="TR">Turkey</option>
                    <option value="TM">Turkmenistan</option>
                    <option value="TC">Turks and Caicos Islands</option>
                    <option value="TV">Tuvalu</option>
                    <option value="UG">Uganda</option>
                    <option value="UA">Ukraine</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="GB">United Kingdom</option>
                    <option value="UM">
                      United States Minor Outlying Islands
                    </option>
                    <option value="UY">Uruguay</option>
                    <option value="UZ">Uzbekistan</option>
                    <option value="VU">Vanuatu</option>
                    <option value="VE">
                      Venezuela, Bolivarian Republic of
                    </option>
                    <option value="VN">Viet Nam</option>
                    <option value="VG">Virgin Islands, British</option>
                    <option value="VI">Virgin Islands, U.S.</option>
                    <option value="WF">Wallis and Futuna</option>
                    <option value="EH">Western Sahara</option>
                    <option value="YE">Yemen</option>
                    <option value="ZM">Zambia</option>
                    <option value="ZW">Zimbabwe</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="title">Town</label>
                  <input
                    type="text"
                    v-model="audioDetails.town"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="title">Coordinates</label>
                  <input
                    id="inputLat"
                    type="text"
                    v-model="audioDetails.lat"
                    class="form-control"
                    placeholder="Latitude"
                  />
                  <input
                    id="inputLong"
                    style="margin-bottom: 4px;"
                    type="text"
                    v-model="audioDetails.long"
                    class="form-control"
                    placeholder="Longitude"
                  />
                </div>
                <h3>Approval</h3>
                <div class="form-group">
                  <select
                    id="approval-selector"
                    v-model="audioDetails.approved"
                    class="form-control"
                  >
                    <option disabled value="">Please select one</option>
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="title"
                    >Approved by <span style="color:red">*</span></label
                  >
                  <input
                    type="text"
                    v-model="audioDetails.approved_by"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <button
                    class="btn btn-primary"
                    @click="updateAudio()"
                    type="button"
                  >
                    <span
                      class="spinner-border spinner-border-sm"
                      v-if="addLoading"
                      role="status"
                      aria-hidden="true"
                    ></span
                    >Update Audio
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

<style lang="scss">
h3 {
  margin-bottom: 18px;
  margin-top: 12px;
}
</style>

<script>
import swal from 'sweetalert';
import ISO6391 from 'iso-639-1';
import countriesList from 'countries-list';

export default {
  props: ['dataid'],
  data() {
    return {
      loadedData: null,
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
        // audio: ""
        approved: false,
        approval_date: null,
        approved_by: ''
      },
      addLoading: false,
      audioData: null,
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
    async getAudio() {
      try {
        let response = await this.$axios.$get(
          '/audio/single/' + this.dataid
          // {},
          // {
          //   auth: {
          //     username: '.',
          //     password: '.'
          //   }
          // }
        );
        this.loadedData = response;
        console.log(response);
        if (response === []) {
          swal(
            'Sorry',
            'There was data recieved loading the audiofile. Check the ID',
            'error'
          );
        } else {
          this.filloutFields(response);
        }
      } catch (err) {
        swal(
          'Sorry',
          'There was an error loading the audiofile. Check the ID',
          'error'
        );
        console.log(err);
      }
    },
    filloutFields(data) {
      this.audioDetails.literal_text = data.literal_text;
      this.audioDetails.literal_text_english = data.literal_text_english;

      data.keywords.forEach(key => {
        this.tagsKeyword.push({
          text: key
        });
      });

      data.tags.forEach(tag => {
        this.tagsTag.push({
          text: tag
        });
      });

      this.audioDetails.language_short = data.language_short;
      this.audioDetails.dialect = data.dialect;
      this.audioDetails.speaker_native_language = data.speaker_native_language;
      this.audioDetails.country = data.country_code;
      this.audioDetails.town = data.town;

      this.audioDetails.lat = data.coordinates.lat;
      this.audioDetails.long = data.coordinates.long;

      this.audioDetails.approved = data.approved;

      this.audioDetails.approved_by = data.approved_by;

      if (this.audioDetails.approved_by === 'needs approval') {
        this.audioDetails.approved_by = '';
      }

      document.getElementById(
        'preview-audio'
      ).src = `${this.$config.baseURL}${data.filePath}`;
    },

    updateAudio() {
      // transform dropdown to boolean // was bugging before.
      this.audioDetails.approved =
        document.getElementById('approval-selector').value == 'true';

      let formDataObj = {
        literal_text: this.audioDetails.literal_text,
        literal_text_english: this.audioDetails.literal_text_english,
        keywords: [],
        tags: [],
        language_short: this.audioDetails.language_short,
        language: ISO6391.getName(
          this.audioDetails.language_short.toLowerCase()
        ),
        dialect: this.audioDetails.dialect,
        speaker_native_language: this.audioDetails.speaker_native_language,
        country_code: this.audioDetails.country,
        country: countriesList.countries[this.audioDetails.country].name,
        coordinates: {
          lat: this.audioDetails.lat,
          long: this.audioDetails.long
        },
        lat: this.audioDetails.lat,
        user_timestamp: this.loadedData.user_timestamp,
        user_timestamp_string: this.loadedData.user_timestamp_string,
        approved: this.audioDetails.approved,
        approved_by: this.audioDetails.approved_by,
        approval_date: new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000
        ).toISOString(),
        // other db data
        filePath: this.loadedData.filePath,
        filename: this.loadedData.filename,
        yamlFilename: this.loadedData.yamlFilename,
        yamlFilenamePath: this.loadedData.yamlFilenamePath,
        jsonFilename: this.loadedData.jsonFilename,
        jsonFilenamePath: this.loadedData.jsonFilenamePath,
        version: this.loadedData.version,
        user_timestamp: this.loadedData.user_timestamp,

        user_timestamp_string: this.loadedData.user_timestamp_string,
        _id: this.loadedData._id
      };

      this.tagsKeyword.forEach(tag => {
        formDataObj.keywords.push(tag.text);
      });

      this.tagsTag.forEach(tag => {
        formDataObj.tags.push(tag.text);
      });

      if (this.audioDetails.approved_by == '') {
        swal('Error', 'Please add the approvers name', 'error');
        return;
      }
      this.$axios
        .$post('/audio/private/updateSingleAudio', formDataObj, {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
          console.log(response);
          swal('Success', 'updatedAudio', 'success').then(function() {
            // this.$router.push("/manager"); // not working?
            location.reload();
          });
        })
        .catch(err => {
          this.addLoading = false;
          swal('Error', 'Something Went wrong', 'error');
          console.log(err);
        });

      // approval_date: (...)
      // approved: (...)
      // approved_by: (...)
      // coordinates: (...)
      // country: (...)
      // country_code: (...)
      // dialect: (...)
      // filePath: (...)
      // filename: (...)
      // keywords: (...)
      // language: (...)
      // language_short: (...)
      // literal_text: (...)
      // literal_text_english: (...)
      // server_timestamp: (...)
      // speaker_native_language: (...)
      // tags: (...)
      // town: (...)
      // user_timestamp: (...)
      // user_timestamp_string: (...)
      // version: (...)
      // yamlFilename: (...)
      // yamlFilenamePath: (...)
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
    },
    runResizingOnEveryTextbox() {
      this.textBoxes = document.getElementsByClassName('growingTextbox');
      this.textBoxes.forEach(txtbox => {
        txtbox.style.overflow = 'hidden';
        txtbox.style.height = 0;
        txtbox.style.height = txtbox.scrollHeight + 'px';
      });
    }
  },
  mounted() {
    this.getAudio();
    this.growingTextbox();
    setTimeout(() => {
      this.runResizingOnEveryTextbox();
    }, 1000);
  },
  created() {}
};
</script>
