let mongoose = require('mongoose');
// https://transform.tools/json-to-mongoose
let audioSchema = mongoose.Schema({
  filename: {
    type: 'String',
    default: null,
  },
  yamlFilename: {
    type: 'String',
    default: null,
  },
  yamlFilenamePath: {
    type: 'String',
    default: null,
  },
  jsonFilename: {
    type: 'String',
    default: null,
  },
  jsonFilenamePath: {
    type: 'String',
    default: null,
  },
  filePath: {
    type: 'String',
    default: null,
  },
  version: {
    type: 'Number',
    default: null,
  },
  literal_text: {
    type: 'String',
    default: null,
  },
  literal_text_english: {
    type: 'String',
    default: null,
  },
  user_timestamp: {
    type: 'Date',
    default: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString(),
  },
  user_timestamp_string: {
    type: 'Date',
    default: null,
  },
  server_timestamp: {
    type: 'Date',
    default: null,
  },
  keywords: {
    type: ['String'],
    default: null,
  },
  tags: {
    type: ['String'],
    default: null,
  },
  language: {
    type: 'String',
    required: true,
  },
  language_short: {
    type: 'String',
    default: null,
  },
  dialect: {
    type: 'String',
    default: null,
  },
  speaker_native_language: {
    type: 'String',
    default: null,
  },
  country: {
    type: 'String',
    default: null,
  },
  country_code: {
    type: 'String',
    default: null,
  },
  town: {
    type: 'String',
    default: null,
  },
  coordinates: {
    lat: {
      type: 'Number',
      default: null,
    },
    long: {
      type: 'Number',
      default: null,
    },
  },
  approved: {
    type: 'Boolean',
    default: false,
  },
  approval_date: {
    type: 'Date',
    default: null,
  },
  approved_by: {
    type: 'String',
    default: null,
  },
});
let Audio = mongoose.model('Audio', audioSchema);
module.exports = Audio;
