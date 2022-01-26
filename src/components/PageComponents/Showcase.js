import React, { Fragment } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery, Link } from "gatsby"
import { sortedNodes } from "../../helpers"

const Showcase = () => {
  const {
    allWpShowcase: { nodes },
  } = useStaticQuery(query)

  return (
    <Fragment>
      <section className="container showcase">
        <h1>Showcase</h1>
        <div className=" block_gallery columns_3">
          <ul className="blocks_gallery_grid">
            {sortedNodes(nodes).map(
              ({
                title,
                uri,
                databaseId,
                showcaseGallery: {
                  imageGallery: { image1 },
                },
              }) => {
                const image = getImage(image1.localFile)

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
    allWpShowcase {
      nodes {
        databaseId
        title
        uri
        showcaseGallery {
          imageGallery {
            image1 {
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
