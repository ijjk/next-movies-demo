import React, { useEffect, useState, useRef } from 'react'
import fetch from 'isomorphic-unfetch'

function IndexPage(props) {
  const pendingRef = useRef(null)
  const [movieData, setData] = useState({
    error: null,
    details: null,
    loading: true,
  })

  useEffect(() => {
    if (pendingRef.current || movieData.details) return
    pendingRef.current = true

    fetch(`${process.env.SERVER_URL}api/movie?title=The+Great+Gatsby`)
      .then(async res => {
        if (res.ok) {
          const { details } = await res.json()

          console.log(details);

          return setData({
            details,
            error: null,
            loading: false,
          })
        }
        throw new Error(`Failed to get response ${res.status}`)
      })
      .catch(err => {
        setData({
          error: err.message,
          loading: false,
        })
      })
  })

  console.log(movieData, pendingRef.current);

  return (
    <>
      {pendingRef.current && !movieData.details ? '...' : (
        <p>{JSON.stringify(movieData.details)}</p>
      )}
    </>
  )
}

export default IndexPage