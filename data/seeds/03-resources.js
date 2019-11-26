
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {resource_name: 'Goodwill'},
        {resource_name: 'Home Resource'},
        {resource_name: 'Internet'}
      ]);
    });
};
