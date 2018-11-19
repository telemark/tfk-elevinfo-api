const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URL } = require('./config')
// Utilities
const handler = require('./handlers')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// ROUTES
router.get('/', handler.getFrontpage)
router.get('/relatives/:id', handler.getRelatives)
router.put('/relatives', handler.putRelatives)
router.post('/relatives/:id', handler.postRelatives)
router.delete('/relatives/:id', handler.deleteRelatives)

const setup = async (handler) => {
  mongoose.Promise = global.Promise
  const options = {
    keepAlive: true,
    keepAliveInitialDelay: 3000000,
    useNewUrlParser: true
  }
  try {
    await mongoose.connect(MONGODB_URL, options)
    return handler
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = setup((request, response) => {
  router(request, response, finalhandler(request, response))
})
