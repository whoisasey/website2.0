import React, { Fragment } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Seo from "../seo"
import { BlockRenderer } from "../Blocks/BlockRenderer"

const Contact = ({ name }) => {
  const {
    wpPage: { blocks },
  } = useStaticQuery(query)
  return (
    <Fragment>
      <Seo title={name} />
      <div className="container contact">
        <h1>Contact Us</h1>
        <div>
          {blocks.map((block, i) => {
            return (
              <Fragment key={i}>
                <BlockRenderer {...block} />
              </Fragment>
            )
          })}
        </div>
      </div>
    </Fragment>
  )
}

export default Contact

export const query = graphql`
  query specialProjectsQuery {
    wpPage(slug: { eq: "contact" }) {
      blocks {
        name
        originalContent
      }
    }
  }
`
