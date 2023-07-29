"use client"

import { useState } from "react"

interface DescriptionClickProps {
  description: string
}

export default function DescriptionClick({ description }: DescriptionClickProps) {
  const [showDescription, setShowDescription] = useState(false)

  return (
    <div className="inline-block md:text-lg">
      {/* 250 was chosen after fine tuning UI */}
      {description.length < 250 ? (
        // If description is short, show full description
        <p className="line-clamp-none">{description}</p>
      ) : (
        // Else line clamp the description
        <>
          <p className={showDescription ? "line-clamp-none" : "line-clamp-3"}>{description}</p>
          <button
            className="inline text-blue-700/80 hover:text-blue-700 hover:underline"
            onClick={() => setShowDescription(!showDescription)}
          >
            {showDescription ? "Show less" : "Read more..."}
          </button>
        </>
      )}
    </div>
  )
}
