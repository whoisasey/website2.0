import React, { Fragment, useState, useEffect } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery, Link } from "gatsby"
import { sortedNodes } from "../../helpers"
import Seo from "../seo"

const Showcase = ({ name }) => {
  const {
    allWpShowcase: { nodes },
  } = useStaticQuery(query)

  const [texture, setTexture] = useState(false)
  // console.log(nodes.length)

  useEffect(() => {
    if (nodes.length % 3) {
      console.log("not equal")
      setTexture(true)
    }
  }, [])

  const addTexture = () => {}

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
                ({
                  title,
                  uri,
                  databaseId,
                  showcaseGallery: { imageGallery },
                }) => {
                  const image = getImage(imageGallery.image1.localFile)

                  if (imageGallery.image2 !== null)
                    return (
                      <div className="blocks_gallery_item" key={databaseId}>
                        <Link to={uri}>
                          <li>
                            <figure>
                              <GatsbyImage image={image} alt={title} />
                            </figure>
                          </li>
                          <div className="showcase_overlay">
                            <h3>{title}</h3>
                          </div>
                        </Link>
                      </div>
                    )

                  return (
                    <div className="blocks_gallery_item" key={databaseId}>
                      <div>
                        <li>
                          <figure>
                            <GatsbyImage image={image} alt={title} />
                          </figure>
                        </li>
                        <div className="showcase_overlay">
                          <h3>{title}</h3>
                        </div>
                      </div>
                    </div>
                  )
                  // show texture if 2 or 3 in row is empty
                }
              )}
          </ul>
        </div>
      </section>
    </Fragment>
  )
}

export const query = graphql`
  query allShowcaseQuery {
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
