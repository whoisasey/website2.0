import Layout from "../components/layout"
import { graphql } from "gatsby"
import React, { Fragment, useEffect, useState, createElement } from "react"
import { BlockRenderer } from "../components/Blocks/BlockRenderer"
import { Showcase } from "../components/PageComponents/Showcase"
import Contact from "../components/PageComponents/Contact"
import Services from "../components/PageComponents/Services"
import BackgroundImage from "gatsby-background-image"
import { convertToBgImage } from "gbimage-bridge"
import { getImage } from "gatsby-plugin-image"

const Page = ({
  pageContext: { title },
  data: {
    wpPage: {
      blocks,
      coverGroup: {
        coverButton: { buttonText, buttonTextColor, buttonColor },
        coverImage,
        coverText: { content, fontSize },
      },
    },
  },
}) => {
  const [isPage, setIsPage] = useState(null)
  const showcase = "/showcase/"
  const contact = "/contact/"
  const services = "/services/"
  useEffect(() => {
    setIsPage(window.location.pathname)
  }, [isPage])

  const image = coverImage ? getImage(coverImage.localFile) : null
  // console.log(image)
  const bgImage = convertToBgImage(image)

  const coverText = createElement(
    `h${fontSize}`,
    {
      // className: ""
    },
    content
  )

  if (isPage === showcase) {
    return <Showcase />
  }
  if (isPage === contact) {
    return <Contact />
  }
  if (isPage === services) {
    return <Services />
  } else {
    return (
      <Layout>
        <div className="container">
          <h1>{title}</h1>
          {blocks.map(block => {
            return (
              <Fragment>
                <BlockRenderer {...block} />
              </Fragment>
            )
          })}
        </div>
        <BackgroundImage Tag="section" {...bgImage} preserveStackingContext>
          <div className="wrapper cover">
            {/* <div className="container cover"> */}
            {coverText}
            <button
              className="button"
              style={{
                color: `${buttonTextColor}`,
                backgroundColor: `${buttonColor}`,
              }}
            >
              {buttonText}
            </button>
          </div>
        </BackgroundImage>
      </Layout>
    )
  }
}

export const query = graphql`
  query pageQuery($slug: String) {
    wpPage(slug: { eq: $slug }) {
      title
      blocks {
        name
        ... on WpCoreParagraphBlock {
          dynamicContent
          originalContent
          name
        }
      }
      coverGroup {
        coverButton {
          buttonText
          buttonTextColor
          buttonColor
        }
        coverImage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        coverText {
          fontSize
          content
        }
      }
    }
    allWpShowcase {
      nodes {
        title
        slug
        showcaseGallery {
          imageGallery {
            image1 {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Page
