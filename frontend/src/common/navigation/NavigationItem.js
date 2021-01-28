import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Icon from '../icon'

const NavigationItem = ({ label, route, icon, className, activeClassName, onClick }) => (
  <NavLink
    exact
    to={route}
    activeClassName={activeClassName}
    className={className}
    onClick={onClick}
  >
    <Icon className='text-gray-500 mr-3 h-6 w-6' type={icon} />
    {label}
  </NavLink>
)

NavigationItem.propTypes = {
  label: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired
}

NavigationItem.defaultProps = {
  label: '',
  route: '',
  activeClassName: 'bg-gray-900 text-white',
  className: 'text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-4 py-2 text-sm font-medium rounded-md',
  onClick: () => null
}
export default NavigationItem
