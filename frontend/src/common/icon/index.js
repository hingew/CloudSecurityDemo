import PropTypes from 'prop-types'

import search from './search'
import like from './like'
import comment from './comment'
import retweet from './retweet'
import home from './home'
import stream from './stream'
import filter from './filter'
import tag from './tag'
import up from './up'
import down from './down'
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
  comment,
  like,
  retweet,
  search,
  home,
  stream,
  filter,
  tag,
  up,
  down,
  logout,
  list,
  cloud
}

export default Icon
