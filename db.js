const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/my_database_1', { useNewUrlParser: true })
mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = db