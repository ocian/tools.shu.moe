import React from 'react'

type SidebarProp = { name: string; link: string }[]
interface WrapProps {
  sidebars: SidebarProp
}

const Sidebar = (props: { sidebars: SidebarProp }) => (
  <ul className="list-group">
    {props.sidebars.map((item) => (
      <li className="list-group-item" key={item.name}>
        <a href={item.link}>{item.name}</a>
      </li>
    ))}
  </ul>
)

export function Wrap(props: React.PropsWithChildren<WrapProps>) {
  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-auto">
          <Sidebar sidebars={props.sidebars} />
        </div>
        <div className="col">{props.children}</div>
      </div>
    </div>
  )
}
