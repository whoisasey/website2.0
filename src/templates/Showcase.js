import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Left from "../images/left_arrow.png"
import Right from "../images/right_arrow.png"

const Showcase = ({
  pageContext,
  data: {
    wpShowcase: {
      showcaseGallery: { columns, nextPage, previousPage, imageGallery },
    },
  },
}) => {
  const galleryArry = Object.entries(imageGallery)

  return (
    <Layout>
      <div className="project_wrapper">
        <h1>{pageContext.title}</h1>
        <div className={`block_gallery columns_2`}>
          <ul className="blocks_gallery_grid">
            {galleryArry.map(image => {
              if (image[1] !== null) {
                const file = image[1].localFile
                const img = getImage(file)

                return (
                  <li className="blocks_gallery_item">
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
      </div>
    </Layout>
  )
}
export const query = graphql`
  query singleShowcaseQueryAndSingleShowcaseQuery($slug: String) {
    wpShowcase(slug: { eq: $slug }) {
      showcaseGallery {
        columns
        nextPage {
          ... on WpShowcase {
            uri
            title
          }
        }
        previousPage {
          ... on WpShowcase {
            title
            uri
          }
        }
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
  }
`

export default Showcase
