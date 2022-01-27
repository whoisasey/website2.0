import React, { createElement } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Image from "gatsby-image"
import { BlockRenderer } from "../components/Blocks/BlockRenderer"
import Layout from "../components/layout"
import Seo from "../components/seo"
import parse from "html-react-parser"

const Homepage = ({
  data: {
    wpPage: {
      valuesGroup: { valuesTitle, valuesDescription },
      quickLinks: { linkFour, linkOne, linkTwo, linkThree },
      heroTextAndImage: { fullWidthImage, heroText },
      blocks,
    },
  },
}) => {
  const image = getImage(fullWidthImage.localFile)

  return (
    <Layout>
      <Seo title="All posts" />

      {createElement(
        `h${heroText.fontSize}`,
        {
          className: "header",
        },
        heroText.text
      )}
      <div className="hero_image">
        <figure className="hero_mobile">
          <Image
            fixed={fullWidthImage.localFile.childImageSharp.fixed}
            style={{ height: "100vh", width: "100%" }}
          />
        </figure>
        <figure className="hero_desktop">
          <GatsbyImage image={image} alt="" layout={"fullWidth"} />
        </figure>
      </div>
      <section className="wrapper">
        {createElement(
          `h${valuesTitle.fontsize}`,
          {
            className: "",
          },
          valuesTitle.text
        )}
        {parse(valuesDescription)}
      </section>

      <section className="services_links">
        {linkOne.link ? (
          <h2>
            <Link to={linkOne.link.uri}>{linkOne.title}</Link>
          </h2>
        ) : null}
        {linkTwo.link ? (
          <h2>
            <Link to={linkTwo.link.uri}>{linkTwo.title} </Link>
          </h2>
        ) : null}
        {linkThree.link ? (
          <h2>
            <Link to={linkThree.link.uri}>{linkThree.title} </Link>
          </h2>
        ) : null}
        {linkFour.link ? (
          <h2>
            <Link to={linkFour.link.uri}>{linkFour.title}</Link>
          </h2>
        ) : null}
      </section>
      {/* {blocks.map((block, i) => {
        console.log(block)
        return <BlockRenderer {...block} key={i} />
      })} */}
    </Layout>
  )
}

export const query = graphql`
  query homepageQuery {
    wpPage(isFrontPage: { eq: true }) {
      heroTextAndImage {
        heroText {
          fontSize
          text
        }
        fullWidthImage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
              fixed(height: 800, width: 414) {
                srcSet
                base64
                width
                height
                src
              }
            }
          }
        }
      }
      valuesGroup {
        valuesTitle {
          fontsize
          text
        }
        valuesDescription
      }
      quickLinks {
        linkFour {
          link {
            ... on WpService {
              uri
            }
          }
          title
        }
        linkOne {
          link {
            ... on WpService {
              uri
            }
          }
          title
        }
        linkThree {
          link {
            ... on WpService {
              uri
            }
          }
          title
        }
        linkTwo {
          link {
            ... on WpService {
              uri
            }
          }
          title
        }
      }
      blocks {
        name
        originalContent
        ... on WpCoreCoverBlock {
          innerBlocks {
            name
            originalContent
            ... on WpCoreParagraphBlock {
              originalContent
              attributes {
                ... on WpCoreParagraphBlockAttributes {
                  content
                }
              }
            }
            ... on WpCoreHeadingBlock {
              originalContent
              attributes {
                ... on WpCoreHeadingBlockAttributes {
                  content
                  level
                }
              }
            }
            ... on WpCoreButtonsBlock {
              innerBlocks {
                name
                originalContent
                ... on WpCoreButtonBlock {
                  attributes {
                    ... on WpCoreButtonBlockAttributes {
                      text
                      textColor
                      backgroundColor
                      url
                    }
                  }
                }
              }
            }
          }
          originalContent
          attributes {
            ... on WpCoreCoverBlockAttributes {
              url
              customOverlayColor
            }
          }
        }
      }
    }
  }
`

export default Homepage
