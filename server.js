const express = require('express');
const DB = require('./projectsDb3Model');
const server = express();

server.use(express.json());

// Returns all tasks and their corresponding project information

server.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await DB.findTasks();
    booleanBuster(tasks, res);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Returns all projects, tasks, or resources

server.get('/api/:table', async (req, res) => {
  const targetTable = req.params.table;
  try {
    const allEntries = await DB.find(targetTable);
    booleanBuster(allEntries, res);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Returns the row from the table of choice by ID

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

// Posts a new entry to table of choice

server.post('/api/:table', async (req, res) => {
  const postbody = req.body;
  const targettable = req.params.table;
  try {
    const posted = await DB.add(targettable, postbody);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = server;

// Function checks response for any "completed" key in object and converts boolean
// from "0 or 1" to "False or True"

async function booleanBuster(allEntries, res) {
  if (allEntries[0].hasOwnProperty('completed')) {
    const boolEntries = await allEntries.map((entry) => {
      if (entry.completed == '0') {
        return { ...entry, completed: false };
      }
      return { ...entry, completed: true };
    });
    try {
      res.status(200).json(boolEntries);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  try {
    res.status(200).json(allEntries);
  } catch (err) {
    res.status(500).json(err);
  }
}
