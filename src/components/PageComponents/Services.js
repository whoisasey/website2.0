import React, { Fragment } from "react"
import Seo from "../seo"
import { sortedNodes } from "../../helpers"
import { graphql, useStaticQuery, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Services = ({ name }) => {
  const {
    allWpService: { nodes },
  } = useStaticQuery(query)

  return (
    <Fragment>
      <Seo title={name} />
      <section className="container services_gallery">
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
                  <img
                    src="https://bigbuilds.ca/wp-content/uploads/2022/01/alex-perri-bmM_IdLd1SA-unsplash-scaled.jpeg"
                    alt="green plant"
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
  }
`

export default Services
