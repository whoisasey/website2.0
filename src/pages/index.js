import React, { createElement } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Image from "gatsby-image"
import { Cover } from "../components/Blocks/Cover"
import Layout from "../components/layout"
import Seo from "../components/seo"
import parse from "html-react-parser"

const Homepage = ({
  data: {
    wpPage: {
      valuesGroup: { valuesTitle, valuesDescription },
      heroTextAndImage: { fullWidthImage, heroText },
      customButton,
    },
    allWpService: { nodes },
  },
}) => {
  const image = getImage(fullWidthImage.localFile)

  return (
    <Layout>
      <Seo
        title="Home"
        description="Big Builds provides custom millwork solutions in the GTA"
      />

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
          <GatsbyImage
            image={image}
            alt="living space with furnishings"
            layout={"fullWidth"}
          />
        </figure>
      </div>
      <section className="wrapper">
        {createElement(`h${valuesTitle.fontsize}`, {}, valuesTitle.text)}
        {createElement(
          "p",
          { style: { paddingTop: "1.5rem" } },
          parse(valuesDescription)
        )}
      </section>

      <section className="services_links">
        {nodes.map(({ uri, title, id }) => (
          <h2 key={id}>
            <Link to={uri}>{title}</Link>
          </h2>
        ))}
      </section>

      <Cover {...customButton} />
    </Layout>
  )
}

export const query = graphql`
  query homepageAndServicesQuery {
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
      customButton {
        backgroundColour
        buttonBackgroundColour
        buttonTextColour
        contactText
        content
        contentHeader
        textColour
      }
    }
    allWpService {
      nodes {
        id
        title
        uri
      }
    }
  }
`

export default Homepage
