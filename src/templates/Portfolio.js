import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Layout from "../components/layout"
import Left from "../images/left_arrow.png"
import Right from "../images/right_arrow.png"

const Portfolio = ({
  pageContext,
  data: {
    wpService: {
      servicesPostType: {
        description,
        heading,
        image: { localFile },
        nextPage,
        previousPage,
      },
    },
  },
}) => {
  const image = getImage(localFile)
  return (
    <Layout>
      <Seo title={pageContext.title} />
      <section className="service_wrapper">
        <h1>{pageContext.title}</h1>
        <p>{description}</p>
      </section>
      <section>
        <GatsbyImage image={image} alt={heading} />
      </section>

      <section className="buttons component_wrapper">
        {!previousPage ? <div /> : null}
        {previousPage ? (
          <Link to={previousPage.uri} className="prev_page">
            <img src={Left} alt="" />
            {previousPage.title}
          </Link>
        ) : null}
        {nextPage ? (
          <Link to={nextPage.uri} className="next_page">
            {nextPage.title}
            <img src={Right} alt="" />
          </Link>
        ) : null}
      </section>
    </Layout>
  )
}

export const query = graphql`
  query singleServiceQuery($slug: String) {
    wpService(slug: { eq: $slug }) {
      servicesPostType {
        button {
          title
          url
        }
        description
        heading
        image {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        nextPage {
          ... on WpService {
            uri
            title
          }
        }
        previousPage {
          ... on WpService {
            uri
            title
          }
        }
      }
    }
  }
`

export default Portfolio
