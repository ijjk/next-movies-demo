import fetch from 'isomorphic-unfetch'

const apiEndpoint = `https://omdbapi.com?apiKey=${process.env.OMDB_KEY}`
const isDev = process.env.NODE_ENV !== 'production'

export default async (req, res) => {
  const { title } = req.query

  try {
    const apiRes = await fetch(`${apiEndpoint}&t=${title}`)

    if (apiRes.ok) {
      return res.json({ status: 'ok', details: await apiRes.json() })
    }
    throw new Error(`Request failed ${apiRes.status}`)
  } catch (err) {
    console.error(err)

    return res.json({
      status: 'error',
      message: isDev ? err.message : 'An unexpected error occurred'
    })
  }
}
