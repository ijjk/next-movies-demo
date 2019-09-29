const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  env: {
    SERVER_URL: isDev
      ? 'http://localhost:3000/'
      : 'http://example.com/',
    OMDB_KEY: process.env.OMDB_KEY
  }
}
