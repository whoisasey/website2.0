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
      "https://graph.instagram.com/me/media?fields=id,media_url,permalink,media_type,thumbnail_url&access_token=IGQVJWU2Q4RFlPcml4bVpsQ19vS2tNbnlNa3JIb1pTRUdsei1VbTN6bnRhVGZA0R015bllLWkljSDFwdUVzYkJubUJCZA2hiREZAXdHg1Y3lzbjdvZAXo1U3pmTENvTzA1N19RTXU0NHZAaT0F1OFhfa1pWeFZAGTy1RSEtnSVQ4"
    )
      .then(res => res.json())
      .then(response => setFeed(response.data))
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(res => res.json())
      .then(response => setFakeImage(response.slice(0, 7)))
      .catch(err => console.log(err))
  }, [])

  const instagramFeed = () => {
    return feed.map(
      ({ media_url, permalink, media_type, thumbnail_url }, i) => {
        if (!thumbnail_url) {
          return (
            <li>
              <a href={permalink} target="_blank" rel="noreferrer">
                <img src={media_url} alt="" />
              </a>
            </li>
          )
        } else
          return (
            <li>
              <a href={media_url}>
                <img src={thumbnail_url} alt="" />
              </a>
            </li>
          )
      }
    )
  }

  const fakeFeed = () => {
    return fakeImage.map(({ thumbnailUrl, title, url }) => {
      return (
        <li>
          <a href={url}>
            <img src={thumbnailUrl} alt={title} />
          </a>
        </li>
      )
    })
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
