const db = require('./db')
const Sport = require('./sport')
const _ = require('lodash')

async function getEnabledSports() {
  return await Sport.find({ enabled: true }).select('name slug')
}

async function getAllEvents() {
  return await Sport.find({ 'categories.competitions.events.name': /ab/ }).select('categories.competitions.events.name').limit(3)
}

async function createRequests() {
  // console.time('enabled-sports')
  // const enabledSports = await getEnabledSports()
  // console.timeEnd('enabled-sports')

  console.time('all events')
  const allEvents = await getAllEvents()
  console.log(allEvents)
  console.timeEnd('all events')

  db.close()
}

createRequests()