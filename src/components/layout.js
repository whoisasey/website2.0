import React, { useState, useEffect, Fragment } from "react"
import { Navigation } from "../components/Navigation/index"
import Logo from "../images/b_rbg-dark signature.png"
import { AiOutlineInstagram } from "react-icons/ai"

const Layout = ({ children }) => {
  const [isPage, setIsPage] = useState(null)
  const [fakeImage, setFakeImage] = useState([])
  const [feed, setFeed] = useState([])
  const press = "/press/"

  useEffect(() => {
    setIsPage(window.location.pathname)
  }, [isPage])

  useEffect(() => {
    fetch(
      `https://graph.instagram.com/${process.env.GATSBY_INSTAGRAM_ID}/media?fields=id,media_url,permalink,thumbnail_url,caption&access_token=${process.env.GATSBY_INSTAGRAM_TOKEN}`
    )
      .then(res => res.json())
      .then(response => setFeed(response.data.slice(0, 12)))
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(res => res.json())
      .then(response => setFakeImage(response.slice(0, 7)))
      .catch(err => console.log(err))
  }, [])

  const instagramFeed = () => {
    return feed.map(({ media_url, permalink, thumbnail_url, caption }, i) => {
      if (!thumbnail_url) {
        return (
          <li key={i}>
            <a href={permalink} target="_blank" rel="noreferrer">
              <img src={media_url} alt={caption} />
            </a>
          </li>
        )
      } else
        return (
          <li key={i}>
            <a href={media_url} target="_blank" rel="noreferrer">
              <img src={thumbnail_url} alt="" />
            </a>
          </li>
        )
    })
  }

  const fakeFeed = () => {
    if (process.env.NODE_ENV === "development") {
      return fakeImage.map(({ thumbnailUrl, title, url }, i) => {
        return (
          <li key={i}>
            <a href={url}>
              <img src={thumbnailUrl} alt={title} />
            </a>
          </li>
        )
      })
    }
  }
  return (
    <Fragment>
      <div className={isPage === press ? `press_page` : null}>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
      </div>
      <footer className="container">
        <div className="footer_feed">
          {instagramFeed()}
          {fakeFeed()}
        </div>
        <div className="footer_logo">
          <img src={Logo} alt="Big Builds Dark Signature Logo" />
          <a href="tel:647-456-4956">
            <p>647-456-4956</p>
          </a>
          <a href="mailto:info@bigbuilds.ca">
            <p> info@bigbuilds.ca</p>
          </a>
          <div className="footer_icon">
            <p>Toronto, Canada</p>
            <a
              href="https://www.instagram.com/bigbuilds.ca/"
              target="_blank"
              rel="noreferrer"
            >
              <AiOutlineInstagram />
            </a>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}

export default Layout
