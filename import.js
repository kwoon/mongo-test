const db = require('./db')
const { Sport, generateSport } = require('./sport')
const _ = require('lodash')

async function importDatabase() {
  const sports = _.range(1, 20).map(generateSport)
  await Sport.insertMany(sports)
  db.close()
}

importDatabase()
