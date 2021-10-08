import React from 'react'

interface RLinkProps {
  value?: string,
  className?: string
}

const TextLink = (props: RLinkProps) => {
  return (
    <button
      className={`${props.className}
      cursor-pointer select-none
      flex items-center justify-center tracking-wide
      outline-none focus:outline-none`}
    >
      {props.value || ''}
    </button>
  )
}

export default TextLink
