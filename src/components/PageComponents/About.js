import React, { Fragment, createElement } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { BlockRenderer } from "../Blocks/BlockRenderer"
import BackgroundImage from "gatsby-background-image"
import { convertToBgImage } from "gbimage-bridge"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Seo from "../seo"

const About = ({ name }) => {
  const {
    wpPage: {
      title,
      blocks,
      coverGroup: {
        coverText: { content, fontSize },
        coverImage,
        coverButton: { buttonText, buttonColor, buttonTextColor },
      },
    },
  } = useStaticQuery(query)

  const image = coverImage ? getImage(coverImage.localFile) : null
  const bgImage = convertToBgImage(image)

  const coverText = createElement(`h${fontSize}`, {}, content)

  return (
    <Fragment>
      <Seo title={name} />
      <div className="container">
        <h1>{title}</h1>
        {blocks.map((block, i) => {
          return (
            <Fragment key={i}>
              <BlockRenderer {...block} />
            </Fragment>
          )
        })}
      </div>
      {/* <GatsbyImage image={image} /> */}
      <BackgroundImage
        Tag="section"
        {...bgImage}
        preserveStackingContext
        className="background_cover"
      >
        <div className="cover">
          {coverText}
          <a
            href="mailto:info@bigbuilds.ca"
            className="button"
            style={{
              color: `${buttonTextColor}`,
              backgroundColor: `${buttonColor}`,
            }}
          >
            {buttonText}
          </a>
        </div>
      </BackgroundImage>
    </Fragment>
  )
}

export const query = graphql`
  query aboutUsPageQuery {
    wpPage(databaseId: { eq: 531 }) {
      title
      blocks {
        name
        ... on WpCoreParagraphBlock {
          originalContent
          attributes {
            ... on WpCoreParagraphBlockAttributes {
              align
              anchor
              content
            }
          }
        }
      }
      coverGroup {
        coverText {
          content
          fontSize
        }
        coverImage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        coverButton {
          buttonText
          buttonColor
          buttonTextColor
        }
      }
    }
  }
`
export default About
