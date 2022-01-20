import React from "react"
import { sortedNodes } from "../../helpers"
import { graphql, useStaticQuery, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../layout"

const query = graphql`
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
const Services = () => {
  const {
    allWpService: { nodes },
  } = useStaticQuery(query)

  // console.log("services page")
  return (
    <Layout>
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
                        <h3>{heading}</h3>
                      </div>
                    </div>
                  )
                }
              }
            )}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default Services
