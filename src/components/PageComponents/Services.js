import React, { Fragment } from "react"
import { sortedNodes } from "../../helpers"
import { graphql, useStaticQuery, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Services = () => {
  const {
    allWpService: { nodes },
    allWpMediaItem,
  } = useStaticQuery(query)
  const imageFour = getImage(allWpMediaItem.nodes[0].localFile)

  return (
    <Fragment>
      <section className="wrapper services_gallery">
        <h1>Services</h1>
        <div className="block_gallery columns_2">
          <ul className="blocks_gallery_grid">
            {sortedNodes(nodes).map(
              ({ uri, servicesPostType: { heading, image } }) => {
                if (image === null) return null
                else {
                  const src = getImage(image.localFile)
                  return (
                    <div className="blocks_gallery_item">
                      <Link to={uri}>
                        <li>
                          <figure>
                            <GatsbyImage image={src} alt={heading} />
                          </figure>
                        </li>
                      </Link>
                      <div className="showcase_overlay">
                        <Link to={uri}>
                          <h3>{heading}</h3>
                        </Link>
                      </div>
                    </div>
                  )
                }
              }
            )}
            <div className="blocks_gallery_item">
              <li>
                <figure>
                  <GatsbyImage
                    image={imageFour}
                    alt="splash image of green plant"
                  />
                </figure>
              </li>
            </div>
          </ul>
        </div>
      </section>
    </Fragment>
  )
}

export const query = graphql`
  query serviceQuery {
    allWpService {
      nodes {
        uri
        databaseId
        servicesPostType {
          heading
          image {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
    allWpMediaItem(filter: { title: { eq: "plant" } }) {
      nodes {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default Services
