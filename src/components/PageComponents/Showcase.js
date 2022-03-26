import React, { Fragment, useState } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery, Link } from "gatsby"
import { sortedNodes } from "../../helpers"
import Seo from "../seo"

const Showcase = ({ name }) => {
  const {
    allWpShowcase: { nodes },
  } = useStaticQuery(query)

  const [currentPost, setCurrentPost] = useState(0)

  console.clear()
  const getPostIndex = id => {
    setCurrentPost(id)
  }

  const getNextPost = () => {
    return nodes[currentPost + 1]
  }

  const lastPost = nodes[nodes.length - 1]
  const getPrevPost = () => {
    // if index = 0, go to last node
    if (currentPost === 0) {
      return lastPost
      // else, return nodes[-1]
    } else return nodes[currentPost - 1]
  }

  console.log(getNextPost())
  console.log(getPrevPost())
  return (
    <Fragment>
      <Seo title={name} />
      <section className="container showcase">
        <h1>Showcase</h1>
        <div className={` block_gallery `}>
          <ul className="blocks_gallery_grid">
            {sortedNodes(nodes)
              .sort((a, b) => {
                const first = new Date(a.date)
                const second = new Date(b.date)

                return second - first
              })
              .map(
                (
                  { title, uri, databaseId, showcaseGallery: { imageGallery } },
                  i
                ) => {
                  const image = getImage(imageGallery.image1.localFile)

                  if (imageGallery.image2 !== null)
                    return (
                      <div
                        className="blocks_gallery_item"
                        key={i}
                        onClick={() => getPostIndex(i)}
                      >
                        {/* <Link to={uri}> */}
                        <li>
                          <figure>
                            <GatsbyImage image={image} alt={title} />
                          </figure>
                        </li>
                        <div className="showcase_overlay">
                          <h3>{title}</h3>
                        </div>
                        {/* </Link> */}
                      </div>
                    )

                  return (
                    <div className="blocks_gallery_item" key={databaseId}>
                      <li>
                        <figure>
                          <GatsbyImage image={image} alt={title} />
                        </figure>
                      </li>
                      <div className="showcase_overlay">
                        <h3>{title}</h3>
                      </div>
                    </div>
                  )
                }
              )}
          </ul>
        </div>
      </section>
    </Fragment>
  )
}

export const query = graphql`
  query allShowcaseQueryAndTexturesQuery {
    allWpShowcase(sort: { fields: date, order: DESC }) {
      nodes {
        title
        databaseId
        uri
        date
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
          }
        }
      }
    }
  }
`

export default Showcase
