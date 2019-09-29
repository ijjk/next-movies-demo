import React from 'react'
import fetch from 'isomorphic-unfetch'

function IndexPage({ error, details }) {
  return (
    <>
      {error ? <p>{error}</p> : (
        <p>{JSON.stringify(details)}</p>
      )}
    </>
  )
}

IndexPage.getInitialProps = async () => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}api/movie/The Great Gatsby`
    )
    if (res.ok) {
      const { details } = await res.json()
      return { details }
    }
    throw new Error(`Failed to get response ${res.status}`)
  } catch (err) {
    return {
      error: err.message
    }
  }
}

export default IndexPage