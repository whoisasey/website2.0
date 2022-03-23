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
      <div className="form_container">
        <div className="">
          <h1>Contact Us</h1>
          {blocks.map((block, i) => {
            return (
              <Fragment key={i}>
                <BlockRenderer {...block} />
              </Fragment>
            )
          })}
          <hr />
          <p>Toronto, Canada </p>
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
