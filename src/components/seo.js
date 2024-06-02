/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const isBrowser = typeof window !== "undefined"

const Seo = ({ description, lang, meta, title }) => {
  const {
    site: { siteMetadata, og, siteUrl },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            og {
              siteName
            }
            siteUrl
          }
        }
      }
    `
  )

  const [windowPath, setWindowPath] = useState("")
  useEffect(() => {
    if (isBrowser) {
      setWindowPath(window.location.pathname)
    }
  }, [windowPath])

  const metaDescription = siteMetadata?.description || description
  const defaultTitle = siteMetadata?.title || title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      description={metaDescription}
      featuredImage="https://kargelbuilds.com/wp-content/uploads/2021/04/bigbuilds_rbg-dark-2.png"
      titleTemplate={
        windowPath === "/" ? `Home | ${defaultTitle}` : `%s | ${defaultTitle}`
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: defaultTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo
