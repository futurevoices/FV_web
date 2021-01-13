let multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    let currentDate = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
      currentDate
    );
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(
      currentDate
    );
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(
      currentDate
    );
    let day = `${ye}-${mo}-${da}`;
    let time = currentDate.toLocaleTimeString('en-US', { hour12: false }); //"07:22:13"
    let dateString = day + '-' + time;
    dateString = dateString.replace(/[^\w]/gi, '-');
    let humanReadableTimestamp = dateString;

    let country = req.body.country.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    if (country == '' || country == null) {
      country = 'countryUnknown';
    }

    let language = req.body.language_short
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase();
    if (language == '' || language == null) {
      language = 'languageUnknown';
    }

    let fileExtension = file.originalname.split('.').pop();
    if (fileExtension == 'blob') {
      fileExtension = 'wav';
    }

    let filename = `${humanReadableTimestamp}_${country}_${language}.${fileExtension}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'audio/mpeg' ||
    file.mimetype === 'audio/wave' ||
    file.mimetype === 'audio/wav' ||
    file.mimetype === 'audio/mp3'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
  fileFilter: fileFilter,
});
