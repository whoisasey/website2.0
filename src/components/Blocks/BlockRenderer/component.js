import React from "react"
import { Heading } from "../Heading"
import { Paragraph } from "../Paragraph"
import { Cover } from "../Cover"
import { Gallery } from "../Gallery"
import { Buttons } from "../Buttons"
import { Quote } from "../Quotes"

export const Component = ({
  name,
  attributes,
  innerBlocks,
  originalContent,
}) => {
  const ComponentToRender = componentMapping[name] || PlaceholderComponent
  return (
    <ComponentToRender
      name={name}
      {...attributes}
      innerBlocks={innerBlocks}
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
  "core/cover": Cover,
  "core/gallery": Gallery,
  "core/quote": Quote,
  "core/buttons": Buttons,
}
