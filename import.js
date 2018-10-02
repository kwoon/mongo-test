const db = require('./db')
const { Event, generateEvent } = require('./event')
const _ = require('lodash')

async function importDatabase() {
  const events = _.range(1, 10000).map(generateEvent)
  await Event.insertMany(events)
  db.close()
}

importDatabase()
