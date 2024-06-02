const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

const { SERVICE_TYPE, SHOWCASE_TYPE, PAGE_TYPE } = require("./constants")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const typeToTemplateMap = {
    [SERVICE_TYPE]: path.resolve("./src/templates/Portfolio.js"),
    [SHOWCASE_TYPE]: path.resolve("./src/templates/Showcase.js"),
    [PAGE_TYPE]: path.resolve("./src/templates/Page.js"),
  }

  const result = await graphql(
    `
      query allWpPages {
        allWpPage {
          nodes {
            title
            id
            slug
            internal {
              type
            }
          }
        }
        allWpService {
          nodes {
            slug
            title
            id
            uri
            internal {
              type
            }
          }
        }
        allWpShowcase {
          nodes {
            title
            id
            slug
            uri
            internal {
              type
            }
          }
        }
      }
    `
  )
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const wpPages = [
    ...result.data.allWpPage.nodes,
    ...result.data.allWpService.nodes,
    ...result.data.allWpShowcase.nodes,
  ]

  if (wpPages.length > 0) {
    wpPages.forEach(page => {
      createPage({
        path: page.uri ? page.uri : page.slug,
        component: typeToTemplateMap[page.internal.type],
        context: {
          title: page.title,
          slug: page.slug,
          id: page.id,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type WpBlockAttributesObject {
      foobar: String
    }
  `
  createTypes(typeDefs)
}
