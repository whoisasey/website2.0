require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `BIG BUILDS`,
  },
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL || `https://kargelbuilds.com/graphql`,
        // useACF: true,
        verboseOutput: true,
        type: {
          BlockEditorContentNode: { exclude: true },
        },
        presets: null,
      },
    },

    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require(`node-sass`),
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-apollo`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/, // See below to configure properly
        },
      },
    },
    `gatsby-remark-prismjs`,
    `gatsby-remark-copy-linked-files`,
    `gatsby-remark-smartypants`,
    {
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 630,
      },
    },
    {
      resolve: `gatsby-remark-responsive-iframe`,
      options: {
        wrapperStyle: `margin-bottom: 1.0725rem`,
      },
    },
    // {
    //   resolve: `gatsby-transformer-remark`,
    //   options: {
    //     plugins: [
    //       // {
    //       //   resolve: `gatsby-remark-images`,
    //       //   options: {
    //       //     maxWidth: 630,
    //       //   },
    //       // },
    //       // {
    //       //   resolve: `gatsby-remark-responsive-iframe`,
    //       //   options: {
    //       //     wrapperStyle: `margin-bottom: 1.0725rem`,
    //       //   },
    //       // },
    //       // `gatsby-remark-prismjs`,
    //       // `gatsby-remark-copy-linked-files`,
    //       // `gatsby-remark-smartypants`,
    //     ],
    //   },
    // },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        checkSupportedExtensions: true,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Big Builds Website`,
        short_name: `BigBuilds`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/favicon.ico`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
  ],
}
