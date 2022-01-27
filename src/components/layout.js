import React, { useState, useEffect, Fragment } from "react"
import { Navigation } from "../components/Navigation/index"
import Logo from "../images/b_rbg-dark signature.png"
import { AiOutlineInstagram } from "react-icons/ai"

const Layout = ({ children }) => {
  const [isPage, setIsPage] = useState(null)
  const press = "/press/"

  useEffect(() => {
    setIsPage(window.location.pathname)
  }, [isPage])

  return (
    <Fragment>
      <div className={isPage === press ? `press_page` : null}>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
      </div>
      <footer className="container">
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
