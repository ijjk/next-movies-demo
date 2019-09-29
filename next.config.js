const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  env: {
    SERVER_URL: isDev
      ? 'http://localhost:3000/'
      : 'https://next-movies.jj4.now.sh/',
    OMDB_KEY: process.env.OMDB_KEY
  }
}
