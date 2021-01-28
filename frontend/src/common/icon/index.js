import PropTypes from 'prop-types'

import search from './search'
import logout from './logout'
import list from './list'
import cloud from './cloud'

function Icon ({ type, className }) {
  const Element = type

  if (!Element) {
    return null
  }

  return (
    <Element className={className} />
  )
}

Icon.defaultProps = {
  className: 'w-6 h-6'
}

Icon.propTypes = {
  className: PropTypes.string
}

Icon.TYPES = {
  search,
  logout,
  list,
  cloud
}

export default Icon
