const db = require("../data/config");

function find() {
  return db("schemes"); // select * from schemes
}

function findById(id) {
  // select * from schemes
  // where id = ?
  return db("schemes")
    .where({ id })
    .first();
}

module.exports = {
  find,
  findById
};
