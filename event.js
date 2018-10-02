const mongoose = require('mongoose')
const faker = require('faker')
const _ = require('lodash')
const db = require('./db')

function generateSport() {
  const name = faker.name.title()
  const slug = _.kebabCase(name)
  return { name, slug }
}

function generateCategory() {
  const name = faker.name.title()
  const slug = _.kebabCase(name)
  return { name, slug }
}

function generateCompetition() {
  const name = faker.name.title()
  const slug = _.kebabCase(name)
  return { name, slug }
}

function generateEvent() {
  const name = faker.name.title()
  const sport = generateSport()
  const category = generateSport()
  const competition = generateCompetition()
  const enabled = [true, false][_.random(0, 1)]
  const status = 'notstarted'
  const startTime = new Date()
  const selections = _.range(1, _.random(2, 20)).map(generateSelection)

  return { name, sport, category, competition, enabled, status, startTime, selections }
}

function generateSelection() {
  const name = faker.company.companyName()
  const asset = _.kebabCase(name)
  const pool = _.random(100, 10000)
  const status = 'pending'

  return { name, asset, pool }
}

const SelectionSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  asset: { type: String },
  pool: { type: Number, default: 0 },
  status: { type: String, default: 'pending' }
})

const EventSchema = new mongoose.Schema({
  name: String,
  sport: { name: String, asset: String, },
  category: { name: String, asset: String, },
  competition: { name: String, asset: String, },
  enabled: Boolean,
  status: { type: String, enum: ['notstarted', 'started'], default: 'notstarted' },
  startTime: Date,
  selections: [SelectionSchema]
})

const Event = mongoose.model('Event', EventSchema)

module.exports.generateEvent = generateEvent
module.exports.Event = Event
