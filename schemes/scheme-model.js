const db = require("../data/config");

function find() {
  return db("schemes"); // select * from schemes
}


module.exports = {
  find
};
