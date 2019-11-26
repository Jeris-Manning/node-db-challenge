
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {project_name: 'Build a Lamp', project_description: 'Build lamp from junk around house.', completed: false},
        {project_name: 'Destress the Cat', project_description: 'Find and implement stress reduction tools for the cat', completed: false},
        {project_name: 'Make slot machine app for portfolio', project_description: 'Working slot machine showcasing state-management, logic, design and animation', completed: false}
      ]);
    });
};
