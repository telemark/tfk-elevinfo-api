const md = require('markdown-it')()
const { send, json } = require('micro')
const { readFile } = require('fs').promises
const Person = require('./models')

exports.getFrontpage = async (request, response) => {
  const readme = await readFile('./README.md', 'utf-8')
  const html = md.render(readme)
  send(response, 200, html)
}

exports.getRelatives = async (request, response) => {
  const { id } = request.params
  try {
    const relatives = await Person.find({ studentId: id })
    send(response, 200, relatives)
  } catch (error) {
    send(response, 500, error.message)
  }
}

exports.putRelatives = async (request, response) => {
  try {
    const payload = await json(request)
    const person = new Person(payload)
    await person.save()
    send(response, 200, { status: 'added' })
  } catch (error) {
    send(response, 500, error.message)
  }
}

exports.postRelatives = async (request, response) => {
  const { id } = request.params
  try {
    const payload = await json(request)
    await Person.findOneAndUpdate(id, payload)
    send(response, 200, { status: 'updated' })
  } catch (error) {
    send(response, 500, error.message)
  }
}

exports.deleteRelatives = async (request, response) => {
  const { id } = request.params
  try {
    await Person.findByIdAndRemove(id)
    send(response, 200, { status: 'deleted' })
  } catch (error) {
    send(response, 500, error.message)
  }
}
