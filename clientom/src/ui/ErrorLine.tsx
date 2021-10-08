import React from 'react'

interface RLinkProps {
  value?: string,
  className?: string
}

const RLink = (props: RLinkProps) => {
  return (
    <p
      className={`${props.className} tracking-wide text-red-400`}
    >
      {props.value || 'ErrorLine'}
    </p>
  )
}

export default RLink
