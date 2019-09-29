import React from 'react'
import fetch from 'isomorphic-unfetch'

function IndexPage({ error, details }) {
  console.log(details);
  return (
    <>
      {error ? <p>{error}</p> : (
        <>
          <img src={details.Poster} />
          <h2>{details.Title} ({details.Year})</h2>
        </>
      )}

    </>
  )
}

IndexPage.getInitialProps = async ({ query }) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}api/movie/${query.title}`
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