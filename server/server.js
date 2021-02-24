require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 1312;
const PORTHTTPS = process.env.PORTHTTPS || 1313;
const IP = process.env.IP || '127.0.0.1';
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/db');
const app = express();
const fs = require('fs');
const http = require('http');

// console.log(PORTHTTPS);
// let https;
// let options;

// if (PORTHTTPS !== 1313) {
//   console.log('runs');
//   https = require('https');
//   options = {
//     key: fs.readFileSync(
//       '/etc/letsencrypt/live/zukunftsmusik.radio/privkey.pem'
//     ),
//     cert: fs.readFileSync('/etc/letsencrypt/live/zukunftsmusik.radio/cert.pem'),
//     ca: fs.readFileSync('/etc/letsencrypt/live/zukunftsmusik.radio/chain.pem'),
//   };
// }

//configure database and mongoose
mongoose.set('useCreateIndex', true);
mongoose
  .connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    pass: config.secret,
    user: config.user,
  })
  .then(() => {
    console.log('Database is connected');
  })
  .catch((err) => {
    console.log({ database_error: err });
  });
// db configuaration ends here
//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here
app.use(morgan('dev')); // configire morgan
// define first route
app.get('/', (req, res) => {
  res.json('');
});

app.use('/uploads', express.static('uploads'));

const audioRoutes = require('./api/routes/audio'); //bring in our user routes
app.use('/audio', audioRoutes);

// app.listen(PORT, IP, () => {
//   console.log(`Server started at ${IP} on port: ${PORT}`);
// });

const httpServer = http.createServer(app);

// let httpsServer;

// if (PORTHTTPS !== 1313) {
//   httpsServer = https.createServer(options, app);
// }
// // server.listen(PORT, IP, function () {
// //   console.log(
// //     `http started at ${IP} on port: ${PORT}.`
// //   );
// // });

httpServer.listen(PORT, IP, function () {
  console.log(`Server started at ${IP} on port: ${PORT}`);
});
// if (PORTHTTPS !== 1313) {
//   httpsServer.listen(PORTHTTPS, IP, function () {
//     console.log(`Https started at ${IP} on port: ${PORTHTTPS}`);
//   });
// }
