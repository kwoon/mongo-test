const mongoose = require('mongoose')
const faker = require('faker')
const _ = require('lodash')
const db = require('./db')

function generateSport() {
  const name = faker.name.title()
  const slug = _.kebabCase(name)
  const enabled = true
  const categories = _.range(1, 20).map(generateCategory)

  return { name, slug, enabled, categories }
}

function generateCategory() {
  const name = faker.name.title()
  const slug = _.kebabCase(name)
  const enabled = true
  const competitions = _.range(1, 20).map(generateCompetition)

  return { name, slug, enabled, competitions }
}

function generateCompetition() {
  const name = faker.name.title()
  const slug = _.kebabCase(name)
  const enabled = true
  const events = _.range(1, 50).map(generateEvent)

  return { name, slug, enabled, events }
}

function generateEvent() {
  const name = faker.name.title()
  const enabled = true
  const status = 'notstarted'
  const startTime = new Date()
  const selections = _.range(1, _.random(2, 20)).map(generateSelection)

  return { name, enabled, status, startTime, selections }
}

function generateSelection() {
  const name = faker.company.companyName()
  const asset = _.kebabCase(name)
  const pool = _.random(100, 10000)

  return { name, asset, pool }
}

const SelectionSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  asset: { type: String },
  pool: { type: Number, default: 0 }
})

const EventSchema = new mongoose.Schema({
  name: String,
  enabled: Boolean,
  status: { type: String, enum: ['notstarted', 'started'], default: 'notstarted' },
  startTime: Date,
  selections: [SelectionSchema]
})

const CompetitionSchema = new mongoose.Schema({
  name: String,
  slug: String,
  enabled: Boolean,
  events: [EventSchema]
})

const CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  enabled: Boolean,
  competitions: [CompetitionSchema]
})

const SportSchema = new mongoose.Schema({
  name: String,
  slug: String,
  enabled: Boolean,
  categories: [CategorySchema]
})

const Sport = mongoose.model('Sport', SportSchema)

module.exports.generateSport = generateSport
module.exports.Sport = Sport
