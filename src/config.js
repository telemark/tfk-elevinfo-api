module.exports = {
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/elevinfo',
  TOKEN_KEY: process.env.TOKEN_KEY || 'your key to validate jwt'
}
