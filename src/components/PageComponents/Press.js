import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import parse from "html-react-parser"

const Press = () => {
  const {
    wpPage: { title, blocks },
  } = useStaticQuery(query)
  return (
    <div className="container">
      <h1>{title}</h1>
      <div className="component_wrapper">
        {parse(blocks[0].attributes.content)}
      </div>
    </div>
  )
}

export const query = graphql`
  query pressPageQuery {
    wpPage(databaseId: { eq: 238 }) {
      title
      blocks {
        name
        ... on WpCoreParagraphBlock {
          attributes {
            ... on WpCoreParagraphBlockAttributes {
              content
            }
          }
        }
      }
    }
  }
`
export default Press
