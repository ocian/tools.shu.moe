import React from 'react'

export function Wrap(props: React.PropsWithChildren<{}>) {
  return <div>{props.children}</div>
}
