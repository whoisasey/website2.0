import React, { Fragment } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery, Link } from "gatsby"
import { sortedNodes } from "../../helpers"
import Seo from "../seo"

const textures = [
  "https://bigbuilds.ca/wp-content/uploads/2022/03/david-clode-pla5ZKH-2k4-unsplash-scaled.jpg",
  "https://bigbuilds.ca/wp-content/uploads/2022/03/marina-reich-0F5ircXar2g-unsplash-scaled.jpg",
  "https://bigbuilds.ca/wp-content/uploads/2022/03/derick-mckinney-VFSlkhMIjEs-unsplash-scaled.jpg",
]

const Showcase = ({ name }) => {
  const {
    allWpShowcase: { nodes },
  } = useStaticQuery(query)

  const addOneTexture = () => {
    if (nodes.length % 3 === 2)
      return (
        <div className="blocks_gallery_item">
          <li>
            <figure>
              <img src={textures[2]} alt="" />
            </figure>
          </li>
        </div>
      )
  }

  const addTwoTextures = () => {
    if (nodes.length % 3 === 1) {
      textures.pop()
      return textures.map((texture, i) => {
        return (
          <div className="blocks_gallery_item" key={i}>
            <li>
              <figure>
                <img src={texture} alt="" />
              </figure>
            </li>
          </div>
        )
      })
    }
  }

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
            {addOneTexture()}
            {addTwoTextures()}
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
