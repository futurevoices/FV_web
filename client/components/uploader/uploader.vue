<template>
  <section class="">
    <div class="contentWrapper contributeWrapper">
      <h3>Make your voice heard: Contribute</h3>
      <br />
      <p class="intro-text">
        What do YOU think about the future? What do YOU expect, fear, hope,
        propose, plan for the future?
      </p>

      <form>
        <div class="form-group audio-buttons">
          <label for="audio"
            >Audio Recording<span style="color:red">*</span>
          </label>

          <button
            type="button"
            class="btn btn-primary"
            v-show="!micActivated && !micRecording"
            @click="accessMic()"
          >
            Allow Mic
          </button>
          <button
            type="button"
            class="btn btn-success"
            v-show="micActivated && !micRecording"
            @click="startRecording()"
          >
            Start Recording
          </button>

          <button
            type="button"
            class="btn btn-danger"
            v-show="micActivated && micRecording"
            @click="stopRecording()"
          >
            Stop Recording
          </button>
          <div id="audio-result-wrapper"></div>
        </div>
        <!-- <div class="form-group">
                  <label for="artist">Audio</label>
                  <div class="custom-file">
                    <input
                      type="file"
                      id="customFile"
                      ref="file"
                      v-on:change="handleFileUpload()"
                      class="custom-file-input"
                    />
                    <label class="custom-file-label" for="customFile"
                      >Choose file</label
                    >
                  </div>
                </div> -->

        <p class="intro-text file-upload">
          If you prefer to send us a file that you pre-recorded or composed,
          send us a
          <a
            href="mailto:contact@futurevoices.radio?subject=Pre-recorded%20File"
            >mail</a
          >.
        </p>
        <div class="form-group">
          <label for="title">Contribution text in original language</label>
          <textarea
            rows="1"
            type="text"
            v-model="audioDetails.literal_text"
            class="form-control growingTextbox"
          />
        </div>

        <div class="form-group">
          <label for="title">
            Contribution text in English (translation if needed)</label
          >
          <textarea
            rows="1"
            type="text"
            v-model="audioDetails.literal_text_english"
            class="form-control growingTextbox"
          />
        </div>

        <div class="form-group">
          <label for="title">Keywords (e.g. topics you are addressing)</label>
          <client-only>
            <vue-tags-input
              v-model="tagKeyword"
              :tags="tagsKeyword"
              :autocomplete-items="filteredItemsKeyword"
              @tags-changed="newTags => (tagsKeyword = newTags)"
            />
          </client-only>
        </div>

        <!-- <div class="form-group">
                  <label for="title">Tags</label>
                  <client-only>
                    <vue-tags-input
                      v-model="tagTag"
                      :tags="tagsTag"
                      :autocomplete-items="filteredItemsTag"
                      @tags-changed="newTags => (tagsTag = newTags)"
                    />
                  </client-only>
                </div> -->

        <div class="form-group">
          <label for="language"
            >Language of your the contribution<span style="color:red"
              >*</span
            ></label
          >
          <select
            id="language-selector"
            v-model="audioDetails.language_short"
            class="form-control"
          >
            <option value="" disabled selected>Language</option>
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
          <label for="title"
            >More language information (e.g. language dialect)</label
          >
          <input
            type="text"
            v-model="audioDetails.dialect"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="language">Your native / main language </label>
          <select
            id="language-native-selector"
            v-model="audioDetails.speaker_native_language"
            class="form-control"
          >
            <option value="" disabled selected>Native Language</option>
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
          <label for="language">Country<span style="color:red">*</span></label>
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
          <label for="title">City / Town</label>
          <input type="text" v-model="audioDetails.town" class="form-control" />
        </div>
        <div class="form-group">
          <label for="title">Geographical coordinates by GPS</label>
          <div
            id="gps-button-text"
            class="btn btn-link btn-primary"
            onclick="javascript:void(0)"
            @click="getGps"
          >
            Use Gps
          </div>
          <div class="long-lat-wrapper">
            <input
              id="inputLat"
              type="number"
              step=".01"
              v-model="audioDetails.lat"
              class="form-control"
              placeholder="Latitude"
            />
            <input
              id="inputLong"
              style="margin-bottom: 4px;"
              type="number"
              step=".01"
              v-model="audioDetails.long"
              class="form-control"
              placeholder="Longitude"
            />
          </div>

          <p class="twodecimals">(round to 2 decimals for privacy)</p>
        </div>

        <div class="disclaimer">
          <p>
            By submitting your contribution, you agree that your sound file
            contribution, along with its anonymized metadata, may be used and
            published in the FutureVoices art project.
            <span v-b-toggle.collapse-1 variant="primary">Read More</span
            ><span class="no-underline"> ↓</span>
          </p>
          <div>
            <b-collapse id="collapse-1" class="mt-2">
              <h3>LEGAL DISCLAIMER</h3>
              <p>
                By submitting, you agree that your soundfile, along with the
                anonymized metadata, may be published in the FutureVoices art
                project (web audio stream and website) worldwide under a
                noncommercial open access license.
              </p>
              <p>
                Incoming contributions are reviewed by a multi-lingual team in
                accordance with our <a href="/codeofconduct">Code of Conduct</a>
                and, after approval, may appear in the stream after a few days.
              </p>
              <h3>OUR CODE OF CONDUCT</h3>
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
                All contributions are personally monitored by a multi-lingual
                team before reaching the FutureVoices stream.
              </p>
              <p>
                Any kind of contributions is welcome, as long as they don't
                include any of the following:
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
            </b-collapse>
          </div>
        </div>

        <div class="form-group">
          <button
            class="btn"
            :disabled="isDisabled"
            @click="addNewAudio()"
            type="button"
          >
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
      <p class="feedback">
        For any questions or feedback, please contact us at
        <a href="mailto: contact@futurevoices.radio"
          >contact@futurevoices.radio</a
        >
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contentWrapper {
  max-width: 450px;
  padding-bottom: 40px;

  .intro-text {
    font-size: 16px;
    line-height: 21px;

    a {
      font-size: 16px;
      line-height: 21px;
    }
  }

  .file-upload {
    // font-size: 12px;
    opacity: 0.5;
    font-style: italic;
  }

  button,
  #gps-button-text {
    background-color: $green;
    border-radius: 0;
    border: 0;
    color: $black;
  }

  #gps-button-text {
    display: block;
    position: relative;
    width: fit-content;
    height: 24px;
    padding-left: 5px;
    padding-right: 5px;
    text-decoration: none;
    line-height: 12px;
    margin-bottom: 8px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // width: auto;
  }

  input[type='text'],
  textarea {
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    outline: none;
    border: 0px solid $green;
  }

  input[type='text']:focus,
  textarea:focus {
    box-shadow: 0 0 5px $green;
    border: 1px solid $green;
  }

  .ti-input {
    font-size: 16px !important;

    p,
    li,
    span {
      font-size: 16px !important;
    }
  }

  .ti-input input:focus {
    box-shadow: 0 0 0px $green;
    border: 0px solid $green;
  }

  .disclaimer {
    p,
    span,
    a,
    h3 {
      font-size: 16px !important;
      line-height: 24px;
    }

    h3 {
      font-style: italic;
    }

    span {
      text-decoration: underline;
    }
    .no-underline {
      text-decoration: none;
    }
  }

  .feedback {
    font-size: 16px;
    line-height: 24px;
    a {
      font-size: inherit;
      line-height: inherit;
    }
  }

  .twodecimals {
    color: grey;
    font-style: italic;
    font-size: 16px;
    line-height: 24px;
  }
  .long-lat-wrapper {
    display: flex;
    justify-content: space-between;
    input {
      width: calc(50% - 6px);
    }
  }

  #inputLat {
    margin-bottom: 4px;
  }

  .audio-buttons {
    button {
      display: block;
    }

    audio {
      display: block;
      // margin: 0 auto;
      margin-top: 16px;
    }
  }

  .uploader-card {
    margin-bottom: $footerRadioHeight;
  }

  /* style the background and the text color of the input ... */
  .vue-tags-input {
    background: white;
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
    border: 1px solid $green;
  }

  /* some stylings for the autocomplete layer */
  .vue-tags-input .ti-autocomplete {
    background: #283944;
    border: 1px solid #8b9396;
    border-top: none;
  }

  /* the selected item in the autocomplete layer, should be highlighted */
  .vue-tags-input .ti-item.ti-selected-item {
    background: $green;
    color: #283944;
  }

  /* style the placeholders color across all browser */
  .vue-tags-input ::-webkit-input-placeholder {
    color: white;
  }

  .vue-tags-input ::-moz-placeholder {
    color: white;
  }

  .vue-tags-input :-ms-input-placeholder {
    color: white;
  }

  .vue-tags-input :-moz-placeholder {
    color: white;
  }

  /* default styles for all the tags */
  .vue-tags-input .ti-tag {
    position: relative;
    background: $green;
    color: #283944;
  }

  /* we defined a custom css class in the data model, now we are using it to style the tag */
  .vue-tags-input .ti-tag.custom-class {
    background: transparent;
    border: 1px solid $green;
    color: $green;
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
}

/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  .contentWrapper {
    padding-left: 10px;
    padding-right: 10px;
  }

  .twodecimals {
    font-size: 16px !important;
    line-height: 24px !important;
  }
}
</style>

<script>
import swal from 'sweetalert';
import ISO6391 from 'iso-639-1';
import countriesList from 'countries-list';
import Recorder from 'recorder-js';

// import AudioMotionAnalyzer from "audiomotion-analyzer";

export default {
  data() {
    return {
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
      autocompleteItemsTag: [],
      blob: null,
      micActivated: false,
      micRecording: false,
      speakerNativeLanguageAutocomplete: true
    };
  },
  computed: {
    isDisabled: function() {
      if (
        this.audioDetails.language_short === '' ||
        this.blob === null ||
        this.audioDetails.country === ''
      ) {
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
    accessMic() {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      this.recorder = new Recorder(this.audioContext, {
        // An array of 255 Numbers
        // You can use this to visualize the audio stream
        // If you use react, check out react-wave-stream
        numChannels: 1
        // onAnalysed: data => console.log(data)
      });

      this.isRecording = false;
      this.blob = null;

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          this.audioStream = stream;
          this.recorder.init(stream);
          this.micActivated = true;
        })
        .catch(err =>
          swal('Error', "Sorry, couldn't access microphone", 'error')
        );
    },
    startRecording() {
      console.log('started rec');
      this.recorder.start().then(() => (this.micRecording = true));
    },
    stopRecording() {
      this.recorder.stop().then(({ blob, buffer }) => {
        this.micRecording = false;
        this.micActivated = false;
        this.blob = blob;
        this.audioDetails.audio = this.blob;
        this.audioStream.getAudioTracks()[0].stop();
        // this.recorder.exportWAV(this.createDownloadLink);

        let url = URL.createObjectURL(this.blob);
        let au = document.createElement('audio');
        // let li = document.createElement("li");
        // let link = document.createElement("a");
        //name of .wav file to use during upload and download (without extension)
        let filename = new Date().toISOString();
        au.controls = true;
        au.src = url;

        //save to disk link
        // link.href = url;
        // link.download = filename + ".wav"; //download forces the browser to donwload the file using the  filename
        // link.innerHTML = "Save to disk";

        //add the new audio element to li
        // li.appendChild(au);
        //add the li element to the ol
        let wrapper = document.getElementById('audio-result-wrapper');
        wrapper.innerHTML = '';
        wrapper.appendChild(au);
      });
    },
    // converts blob to base64
    blobToBase64(blob) {
      let reader = new window.FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        let base64 = reader.result;
        base64 = base64.split(',')[1];
        globalData.audio64 = base64;
      };
    },
    initForm() {
      this.addState = !this.addState;
    },
    handleFileUpload() {
      this.audioDetails.audio = this.$refs.file.files[0];
      console.log(this.audioDetails.audio);
      console.log(this.audioDetails.audio.type);
    },
    addNewAudio() {
      if (this.blob !== null) {
        let formData = new FormData();
        formData.append('literal_text', this.audioDetails.literal_text);
        formData.append(
          'literal_text_english',
          this.audioDetails.literal_text_english
        );

        // keywords tags
        let ktags = [];
        this.tagsKeyword.forEach(tag => {
          ktags.push(tag.text);
        });
        formData.append('keywords', JSON.stringify(ktags));

        // tag tags
        let ttags = [];
        this.tagsTag.forEach(tag => {
          ttags.push(tag.text);
        });
        formData.append('tags', JSON.stringify(ttags));

        formData.append('language_short', this.audioDetails.language_short);
        formData.append(
          'language',
          ISO6391.getName(this.audioDetails.language_short.toLowerCase())
        );

        formData.append('dialect', this.audioDetails.dialect);
        formData.append(
          'speaker_native_language',
          this.audioDetails.speaker_native_language
        );
        formData.append('country_code', this.audioDetails.country);
        formData.append(
          'country',
          countriesList.countries[this.audioDetails.country].name
        );

        formData.append('town', this.audioDetails.town);
        formData.append('long', this.audioDetails.long);
        formData.append('lat', this.audioDetails.lat);
        formData.append('audio', this.audioDetails.audio);

        // timestamps
        const timestampstring = new Date().toString();

        formData.append(
          'user_timestamp',
          new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          ).toISOString()
        );
        formData.append('user_timestamp_string', timestampstring);

        // Display the key/value pairs
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ", " + pair[1]);
        // }

        this.addLoading = true;
        this.$axios
          .$post('/audio', formData)
          .then(response => {
            console.log(response);
            this.addLoading = false;
            this.audioDetails = {};
            swal('Success', 'New Audio Added', 'success').then(
              this.$router.push('/explore')
            );
          })
          .catch(err => {
            this.addLoading = false;
            swal('Error', 'Something Went wrong', 'error');
            console.log(err);
          });
      } else {
        swal('Error', 'Missing info', 'error');
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
      document.getElementById('gps-button-text').innerHTML = 'Use Gps';
      // somehow the data doesn't get passed, so adding it manually
      this.audioDetails.lat = document.getElementById('inputLat').value;
      this.audioDetails.long = document.getElementById('inputLong').value;
    },
    speakerLanguageChange() {
      if (this.speakerNativeLanguageAutocomplete) {
        let language = this.languageShortSelector.value;
        // only change it if the speaker native language hasn't yet
        let nativeValue = this.languageNativeSelector.value;
        if (nativeValue == '') {
          this.languageNativeSelector.value = language;
          this.audioDetails.speaker_native_language = language;
        }
      }
      this.speakerNativeLanguageAutocomplete = false;
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
    console.log('uploader has been mounted');
    this.languageNativeSelector = document.getElementById(
      'language-native-selector'
    );
    this.languageShortSelector = document.getElementById('language-selector');
    this.languageShortSelector.addEventListener(
      'change',
      this.speakerLanguageChange
    );

    this.growingTextbox();
  },
  created() {}
};
</script>
