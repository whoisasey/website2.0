import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Left from "../images/left_arrow.png"
import Right from "../images/right_arrow.png"

const Showcase = ({
  pageContext,
  data: {
    wpShowcase: {
      showcaseGallery: { imageGallery },
    },
    allWpShowcase: { nodes },
  },
}) => {
  const galleryArry = Object.entries(imageGallery)
  const [currentPost, setCurrentPost] = useState(0)
  const [nextPost, setNextPost] = useState(null)
  const [prevPost, setPrevPost] = useState(null)

  useEffect(() => {
    nodes.filter((node, id) => {
      if (node.title === pageContext.title) setCurrentPost(id)
    })

    const lastPost = nodes[nodes.length - 1]
    const getNextPost = () => {
      if (nodes[currentPost + 1] === undefined) {
        return nodes[0]
      }
      return nodes[currentPost + 1]
    }

    const getPrevPost = () => {
      // if index = 0, go to last node
      if (currentPost === 0) {
        return lastPost
        // else, return nodes[-1]
      } else return nodes[currentPost - 1]
    }
    return () => {
      setNextPost(getNextPost())
      setPrevPost(getPrevPost())
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout>
      <Seo title={pageContext.title} />
      <div className="project_wrapper">
        <h1>{pageContext.title}</h1>
        <div className={`block_gallery columns_2`}>
          <ul className="blocks_gallery_grid">
            {galleryArry.map((image, i) => {
              if (image[1] !== null) {
                const file = image[1].localFile
                const img = getImage(file)

                return (
                  <li className="blocks_gallery_item" key={i}>
                    <figure>
                      <GatsbyImage image={img} alt="" />
                    </figure>
                  </li>
                )
              } else return null
            })}
          </ul>
        </div>
        <section className="buttons">
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
      </div>
    </Layout>
  )
}
export const query = graphql`
  query singleShowcaseQueryAndAllShowcaseQuery($slug: String) {
    wpShowcase(slug: { eq: $slug }) {
      showcaseGallery {
        imageGallery {
          image1 {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          image2 {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          image3 {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          image4 {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          image5 {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          image6 {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          image7 {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
    allWpShowcase {
      nodes {
        title
        uri
      }
    }
  }
`

export default Showcase
