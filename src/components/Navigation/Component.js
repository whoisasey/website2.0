import { graphql, Link, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React, { useState, useEffect } from "react"
import { AiOutlineInstagram } from "react-icons/ai"
import Hamburger from "../../../assets/hamburger.svg"
import Close from "../../../assets/hamburger_close.svg"
import LightLogo from "../../../assets/bigbuilds_light.svg"
import DarkLogo from "../../../assets/bigbuilds_dark.svg"

const query = graphql`
  query singleShowcaseQuery {
    wpMenu(locations: { in: GATSBY_HEADER_MENU }) {
      menuItems {
        nodes {
          label
          title
          id
          url
        }
      }
    }
  }
`

export const Component = () => {
  const {
    wpMenu: {
      menuItems: { nodes },
    },
  } = useStaticQuery(query)

  const [isPage, setIsPage] = useState(null)
  const [isMenuPopoutOpen, setIsMenuPopoutOpen] = useState(false)
  const press = "/press/"

  const NavList = () => {
    return nodes.map(({ label, url, id }) => {
      return (
        <li key={id}>
          <Link to={url}>{label}</Link>
        </li>
      )
    })
  }

  const handleCloseMenu = () => {
    setIsMenuPopoutOpen(false)
  }
  const handleOpenMenu = () => {
    setIsMenuPopoutOpen(true)
  }

  useEffect(() => {
    setIsPage(window.location.pathname)
  }, [isPage])

  return (
    <nav className={isPage === press ? `light_nav` : null}>
      <Link to="/">
        {isPage === press ? (
          // <StaticImage
          //   src="../../../assets/bigbuilds_light.svg"
          //   alt="Big Builds Light Logo"
          //   placeholder="tracedSVG"
          //   layout="fixed"
          //   width={300}
          // />
          <LightLogo />
        ) : (
          // <StaticImage
          //   src="../../../assets/bigbuilds_dark.svg"
          //   alt="Big Builds Dark Logo"
          //   placeholder="tracedSVG"
          //   layout="fixed"
          //   width={300}
          // />
          <DarkLogo />
        )}
      </Link>

      <div className="mobile_nav">
        <div className="menu_open">
          <button
            className="no_appearance"
            onClick={handleOpenMenu}
            tabIndex="0"
            aria-label="hamburger mobile menu"
          >
            <Hamburger />
          </button>
        </div>
        <div className={`popout_menu ${isMenuPopoutOpen ? "open" : "closed"}`}>
          <div className="menu_close">
            <StaticImage
              src="../../../assets/bigbuilds_dark.svg"
              alt="Big Builds Dark Logo"
              placeholder="tracedSVG"
              layout="fixed"
              width={300}
            />
            <button
              onClick={handleCloseMenu}
              className="no_appearance"
              tabIndex="0"
            >
              <Close />
            </button>
          </div>
          <ul>
            <NavList />
          </ul>
          <div className="mobile_social">
            <a
              href="https://www.instagram.com/bigbuilds.ca/"
              target="_blank"
              rel="noreferrer"
            >
              <AiOutlineInstagram />
            </a>{" "}
          </div>
        </div>
      </div>

      <div className="desktop_nav">
        <ul>
          <NavList />
        </ul>
      </div>
    </nav>
  )
}

Component.displayName = "Navigation"
