
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {task_description: 'Finish adhering nails to harp', task_notes: 'Remember to clamp to hold epoxy in place', completed: true, project_id: 1},
        {task_description: 'Find appropriate base for lamp', task_notes: 'Check goodwill, tj-maxx', completed: false, project_id: 1},
        {task_description: 'Build cat tower for play', task_notes: 'Needs to be Marlin-proof', completed: false, project_id: 2},
        {task_description: 'Research CSS animation and decide on reel animation approach', completed: false, project_id: 3},
      ]);
    });
};
