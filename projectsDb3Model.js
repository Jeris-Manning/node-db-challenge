const db = require('./data/dbConfig');

module.exports = {
  find,
  findTasks,
  findById,
  add
};

// Returns all contents of whichever table is passed to it
// from the endpoint
function find(table) {
  return db(table);
}

function findTasks() {
  return db('tasks')
    .innerJoin('projects', 'projects.id', 'tasks.project_id')
    .select(
      'projects.project_name',
      'projects.project_description',
      'tasks.task_description',
      'tasks.task_notes',
      'tasks.completed'
    );
}

function findById(table, id) {
  return db(table).where({ id });
}

function add(table, postbody) {
  return db(table)
    .insert(postbody)
    .then((posted) => {
      return findById(table, posted[0]);
    });
}
