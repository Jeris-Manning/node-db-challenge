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

// function findTasks(id) {
//     return db('projects').innerJoin('tasks', 'projects.id', 'tasks.project_id').where(projects.id, id)
// }

function findTasks() {
  return db('projects')
    .join('tasks', 'tasks.id', 'tasks.project_id')
    .select(
      'projects.id',
      'projects.project_name',
      'projects.project_description',
      'tasks.task_description',
      'tasks.task_notes'
    )
    .groupBy({task_description});
}

// select ProductName, Quantity from OrderDetail
// join Product on OrderDetail.ProductId = Product.Id
// where OrderDetail.OrderId = 10251

function findById(table, id) {
  return db(table).where({ id });
}

// function add(postBody, table) {
//   return db(table).insert(postBody);

// }
function add(table, postbody) {
  return db(table)
    .insert(postbody)
    .then((posted) => {
      return findById(table, posted[0]);
    });
}
