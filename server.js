const express = require('express');
const DB = require('./projectsDb3Model');
const server = express();

server.use(express.json());

server.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await DB.findTasks();
    booleanBuster(tasks, res);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get('/api/:table', async (req, res) => {
  const targetTable = req.params.table;
  try {
    const allEntries = await DB.find(targetTable);
    booleanBuster(allEntries, res);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get('/api/:table/:id', async (req, res) => {
  const targetTable = req.params.table;
  const targetId = req.params.id;
  try {
    const tableEntry = await DB.findById(targetTable, targetId);
    booleanBuster(tableEntry, res);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.post('/api/:table', async (req, res) => {
  const postbody = req.body;
  const targettable = req.params.table;
  try {
    const posted = await DB.add(targettable, postbody);
    res.status(200).json(posted);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = server;

function booleanBuster(allEntries, res) {
  if (allEntries[0].hasOwnProperty('completed')) {
    const boolEntries = allEntries.map((entry) => {
      if (entry.completed == '0') {
        return { ...entry, completed: false };
      }
      return { ...entry, completed: true };
    });
    res.status(200).json(boolEntries);
  }
  res.status(200).json(allEntries);
}
