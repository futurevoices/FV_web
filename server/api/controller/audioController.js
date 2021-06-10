let mongoose = require('mongoose');
const Audio = require('../model/Audio');
const fs = require('fs');
const fsPromises = fs.promises;
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const mv = promisify(fs.rename);
const yaml = require('js-yaml');
const { Console } = require('console');

exports.getAllAudios = async (req, res) => {
  try {
    let audio = await Audio.find(
      {},
      {
        _id: 0, // don't send id on public page
      }
    );
    res.status(200).json(audio);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllAudiosWithId = async (req, res) => {
  try {
    let audio = await Audio.find();
    res.status(200).json(audio);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getSingleAudio = async (req, res) => {
  try {
    console.log(req.params.audioId);

    let audio = await Audio.findById(req.params.audioId);
    res.status(200).json(audio);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.addNewAudio = async (req, res) => {
  let generatedFilenameByMulter = res.req.file.filename;
  let destination = res.req.file.destination.substring(2);
  let filenameNoExt = generatedFilenameByMulter
    .split('.')
    .slice(0, -1)
    .join('.');

  let currentDate = new Date();

  try {
    const data = {
      // userdata
      literal_text: req.body.literal_text,
      literal_text_english: req.body.literal_text_english,
      tags: JSON.parse(req.body.tags),
      keywords: JSON.parse(req.body.keywords),
      language_short: req.body.language_short,
      language: req.body.language,
      dialect: req.body.dialect,
      speaker_native_language: req.body.speaker_native_language,
      country_code: req.body.country_code,
      country: req.body.country,
      town: req.body.town,
      coordinates: {
        lat: req.body.long,
        long: req.body.lat,
      },

      // calculated
      version: 0.1,
      server_timestamp: currentDate.toISOString(), // getting the correct iso string Die Zeitzone ist immer 0 UTC, wie es durch den Suffix "Z" angedeutet wird.,

      // validation
      approved: false,
      approval_date: null,
      approved_by: 'needs approval',

      // user timestamps
      user_timestamp: req.body.user_timestamp,
      user_timestamp_string: req.body.user_timestamp_string,

      filename: `${generatedFilenameByMulter}`, // the filename that fot generated by multer
      filePath: `${destination}/${generatedFilenameByMulter}`,
      yamlFilename: `${filenameNoExt}.yaml`,
      yamlFilenamePath: `${destination}/${filenameNoExt}.yaml`,
      jsonFilename: `${filenameNoExt}.json`,
      jsonFilenamePath: `${destination}/${filenameNoExt}.json`,
      // audio: req.audio, // don't need it???
    };

    // create mongodb entry
    const audio = new Audio(data);
    let newAudio = await audio.save();

    // create the yaml file
    let yamlStr = yaml.safeDump(data);
    await fsPromises.writeFile(`${destination}/${data.yamlFilename}`, yamlStr);

    // create json file
    let jsonStr = JSON.stringify(data);
    await fsPromises.writeFile(`${destination}/${data.jsonFilename}`, jsonStr);

    res.status(200).json({ data: newAudio });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateSingleAudio = async (req, res) => {
  // careful: this data is calculated from the frontend and not the backend.
  let data = req.body;
  const id = req.body._id;
  console.log(data);

  // removing id from data
  delete data['_id'];

  try {
    // update mongodb entry
    let update = await Audio.updateOne({ _id: id }, data);

    // create the yaml file
    let destination = 'uploads'; // sorry for hardcoding
    let yamlStr = yaml.safeDump(data);
    await fsPromises.writeFile(`${destination}/${data.yamlFilename}`, yamlStr);

    // also update json
    // only if there is a filestring
    if (data.jsonFilename) {
      let jsonStr = JSON.stringify(data);
      console.log(jsonStr);
      await fsPromises.writeFile(
        `${destination}/${data.jsonFilename}`,
        jsonStr
      );
    }

    res.status(200).json({ data: update });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
exports.deleteAudio = async (req, res) => {
  try {
    const id = req.params.audioId;

    const audioData = await Audio.findById(id).exec();

    const filePath = audioData.filePath;
    const yamlFilePath = audioData.yamlFilenamePath;

    // Delete the file like normal
    // await unlinkAsync(filePath);
    // await unlinkAsync(yamlFilePath);

    console.log(filePath);
    // uploads/2021-01-05-00-44-34_germany_de.wav
    const originalWav = filePath;
    const targetWav =
      'uploads/_deleted/' + originalWav.replace(/uploads\//g, '');
    await mv(originalWav, targetWav);

    const originalYaml = yamlFilePath;
    const targetYaml =
      'uploads/_deleted/' + originalYaml.replace(/uploads\//g, '');
    await mv(originalYaml, targetYaml);

    if (audioData.jsonFilenamePath) {
      const jsonFilePath = audioData.jsonFilenamePath;
      const originaljson = jsonFilePath;
      const targetjson =
        'uploads/_deleted/' + originaljson.replace(/uploads\//g, '');
      await mv(originaljson, targetjson);
    }

    // remove from mongo
    let result = await Audio.remove({ _id: id });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteAudioTest = async (req, res) => {
  try {
    const id = req.params.audioId;
    console.log('deleteAudioTest has been called');

    res.status(200).json({ answer: 'deleteAudioTest has been called' });
  } catch (err) {
    res.status(500).json(err);
  }
};
