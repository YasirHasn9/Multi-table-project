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

function findSteps(scheme_id) {
  // select *  from steps
  // join schemes
  // on steps.scheme_id = schemes.id
  return db("steps")
    .join("schemes", "schemes.id", "steps.scheme_id")
    .where({ scheme_id });
  // if we chained the first() to where , it return the first step
  // so first is only for a single return .
}


async function add(scheme) {
	const [id] = await db("schemes").insert(scheme)
	return db("schemes").where({ id }).first()
}

module.exports = {
  find,
  findById,
  findSteps,
  add
};
