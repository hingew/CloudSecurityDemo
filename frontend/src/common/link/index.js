import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ url }) => {
  const text = url.split('https://')[1]
  return <a className='text-teal-700 font-bold no-underline hover:underline' href={url}>{text}</a>
}

Link.propTypes = {
  url: PropTypes.string.isRequired
}

export default Link
