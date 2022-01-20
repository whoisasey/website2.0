import { graphql } from "gatsby"

export const headingBlock = graphql`
  fragment headingBlock on WpCoreHeadingBlock {
    ... on WpCoreHeadingBlock {
      attributes {
        ... on WpCoreHeadingBlockAttributes {
          textAlign
          content
          level
        }
      }
      name
    }
  }
`

export const paragraphBlock = graphql`
  fragment paragraphBlock on WpCoreParagraphBlock {
    attributes {
      ... on WpCoreParagraphBlockAttributes {
        content
        align
      }
    }
  }
`

export const imageBlock = graphql`
  fragment imageBlock on WpCoreImageBlock {
    attributes {
      ... on WpCoreImageBlockAttributes {
        url
      }
    }
  }
`
export const buttonBlock = graphql`
  fragment buttonBlock on WpCoreButtonBlock {
    attributes {
      ... on WpCoreButtonBlockAttributes {
        url
        text
        textColor
        backgroundColor
        width
      }
    }
  }
`
export const coverBlock = graphql`
  fragment coverBlock on WpCoreCoverBlockAttributes {
    customOverlayColor
    url
  }
`

export const quoteBlock = graphql`
  fragment quoteBlock on WpCoreQuoteBlock {
    attributes {
      ... on WpCoreQuoteBlockAttributes {
        citation
        value
      }
    }
  }
`
export const galleryBlock = graphql`
  fragment galleryBlock on WpCoreGalleryBlock {
    attributes {
      ... on WpCoreGalleryBlockAttributes {
        align
        columns
        anchor
        images {
          url
          id
        }
      }
    }
  }
`
