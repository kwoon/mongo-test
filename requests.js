const db = require('./db')
const { Event } = require('./event')
const _ = require('lodash')

async function getSports() {
  return await Event.distinct('competition.name', { 'sport.name': /^Product/ })
}

async function getSidebar() {
  const events = await Event.find({ enabled: true }).limit(200)
  return events.length
}

async function createRequests() {
  console.time('all-sports')
  console.log(await getSidebar())
  console.timeEnd('all-sports')

  db.close()
}

createRequests()