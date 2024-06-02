import React from "react"
import { Heading } from "../Heading"
import { Paragraph } from "../Paragraph"

export const Component = ({
  name,
  attributes,
  innerBlocks,
  content,
  originalContent,
}) => {
  const ComponentToRender = componentMapping[name] || PlaceholderComponent

  return (
    <ComponentToRender
      name={name}
      {...attributes}
      innerBlocks={innerBlocks}
      content={content}
      originalContent={originalContent}
    />
  )
}

const PlaceholderComponent = ({ name }) => {
  return <p>{`You need to make a component map for ${name}`}</p>
}

Component.displayName = "BlockRenderer"

const componentMapping = {
  "core/heading": Heading,
  "core/paragraph": Paragraph,
}
