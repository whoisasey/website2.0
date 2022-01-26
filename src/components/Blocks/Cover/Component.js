import React from "react"
import { BlockRenderer } from "./../BlockRenderer"

export const Component = ({ innerBlocks, ...attributes }) => {
  const { customOverlayColor, url } = attributes

  console.log(innerBlocks)
  return (
    <section>
      <div
        style={{
          background: `${customOverlayColor}`,
          backgroundImage: url ? `url(${url})` : null,
        }}
        className="cover"
      >
        {innerBlocks.map(({ name, attributes, innerBlocks }, idx) => (
          <BlockRenderer
            key={idx}
            name={name}
            attributes={attributes}
            innerBlocks={innerBlocks}
          />
        ))}
      </div>
    </section>
  )
}

Component.displayName = "Cover"
