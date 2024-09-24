/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { renderCanonicalLink } from "../helpers"
import { useSiteMetadata } from "../hooks/use-site-metadata"

function Seo({ title, description, tags, canonicalURL, lang }) {
  const { siteMetadata } = useSiteMetadata()
  const pageDescription = description || siteMetadata.description
  const meta = []
  const links = []
  if (tags) {
    // define META tags
    meta.push({
      name: "keywords",
      content: tags.join(","),
    })
  }
  if (canonicalURL) {
    links.push({
      rel: "canonical",
      href: canonicalURL,
    })
  }
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      // define META title
      title={title}
      titleTemplate={siteMetadata?.title ? `%s | ${siteMetadata.title}` : `%s`}
      link={links}
      meta={[
        // define META description
        {
          name: `description`,
          content: pageDescription,
        },
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  tags: [],
}
Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  canonicalURL: PropTypes.string,
  lang: PropTypes.string,
}

export default Seo
