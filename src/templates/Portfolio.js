import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Layout from "../components/layout"
import Left from "../images/left_arrow.png"
import Right from "../images/right_arrow.png"
import { getNextPost, getPrevPost } from "../helpers"

const Portfolio = ({
  pageContext,
  data: {
    wpService: {
      servicesPostType: {
        heading,
        image: { localFile },
      },
    },
    allWpService: { nodes },
  },
}) => {
  const [currentPost, setCurrentPost] = useState(0)
  const [nextPost, setNextPost] = useState(null)
  const [prevPost, setPrevPost] = useState(null)
  const image = getImage(localFile)

  useEffect(() => {
    nodes.filter((node, id) => {
      if (node.title === pageContext.title) setCurrentPost(id)
    })

    setNextPost(getNextPost(nodes, currentPost))
    setPrevPost(getPrevPost(nodes, currentPost))
  }, [nextPost, prevPost]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout>
      <Seo title={pageContext.title} />
      <section className="service_wrapper">
        <h1>{pageContext.title}</h1>
      </section>
      <section>
        <GatsbyImage image={image} alt={heading} />
      </section>

      <section className="buttons component_wrapper">
        {prevPost ? (
          <Link to={prevPost.uri} className="prev_page">
            <img src={Left} alt="left arrow" />
            {prevPost.title}
          </Link>
        ) : null}
        {nextPost ? (
          <Link to={nextPost.uri} className="next_page">
            {nextPost.title}
            <img src={Right} alt="right arrow" />
          </Link>
        ) : null}
      </section>
    </Layout>
  )
}

export const query = graphql`
  query singleServiceAndAllServiceQuery($slug: String) {
    wpService(slug: { eq: $slug }) {
      servicesPostType {
        heading
        image {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
    allWpService {
      nodes {
        title
        uri
      }
    }
  }
`

export default Portfolio
