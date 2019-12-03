exports.up = function(knex) {
  return knex.schema

    .dropTableIfExists('project_resources')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects')
    .createTable('projects', (tbl) => {
      tbl.increments();
      tbl.string('project_name', 128).notNullable();
      tbl.string('project_description');
      tbl
        .boolean('completed')
        .notNullable()
        .defaultTo(false);
    })
    .createTable('tasks', (tbl) => {
      tbl.increments();
      tbl.string('task_description').notNullable();
      tbl.string('task_notes');
      tbl
        .boolean('completed')
        .notNullable()
        .defaultTo(false);
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })

    .createTable('resources', (tbl) => {
      tbl.increments();
      tbl.string('resource_name', 128).notNullable();
      tbl.string('resource_description');
    })

    .createTable('project_resources', (tbl) => {
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('resource_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.primary(['project_id', 'resource_id']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects');
};
