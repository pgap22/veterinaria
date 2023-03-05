import { NavLink as NavlinkReact } from 'react-router-dom'

export const NavLink = ({ stylesComponent, classNameIsActive, to, children, ...props }) => {
  return (
    <NavlinkReact
      {...props}
      className={({ isActive }) => isActive ? `${classNameIsActive}` : `${stylesComponent}`}
      to={to}
    >
      {children}
    </NavlinkReact>
  )
}
