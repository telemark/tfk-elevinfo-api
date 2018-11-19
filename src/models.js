const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    mail: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, default: Date.now },
    studentId: { type: String, required: true }
  }
)

module.exports = mongoose.models.Person || mongoose.model('Person', schema)
