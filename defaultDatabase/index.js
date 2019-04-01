const files = [
 'geography',
];

let questions = [];

files.forEach(filename => {
  const next = require('./' + filename);
  questions = [...questions, ...next];
});

module.exports = questions;
