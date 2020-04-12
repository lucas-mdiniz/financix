const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://lucas_financix:financix32120720@cluster0-u1eaa.mongodb.net/financix?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');
});
