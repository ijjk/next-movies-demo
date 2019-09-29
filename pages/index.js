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
    if (pendingRef.current && movieData.loading) return
    pendingRef.current = true

    fetch(`${process.env.SERVER_URL}api/movie?title=The+Great+Gatsby`)
      .then(async res => {
        if (res.ok) {
          const resData = await res.json()

          setData({
            error: null,
            details: resData,
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

  return (
    <>
      {pendingRef.current && movieData.loading ? '...' : (
        <p>{JSON.stringify(movieData.details)}</p>
      )}
    </>
  )
}

export default IndexPage