import PropTypes from 'prop-types'
import Link from '../link'
const MENTIONS = /((http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?|#\w+|@\w+)/gi

const getHighlight = (value = '') => {
  if (value.charAt(0) === '@') { return <Mention className='font-bold text-blue-700'>{value}</Mention> }

  if (value.charAt(0) === '#') { return <Mention className='font-bold text-red-700'>{value}</Mention> }

  if (value.startsWith('http')) {
    return <Link url={value} />
  }

  return value
}
const Mention = ({ children, className }) => (<span className={className}>{children}</span>)

const highlightMentions = (text = '') => {
  const chunks = text.split(MENTIONS)

  return (
    <span>
      {chunks.map((obj) => getHighlight(obj))}
    </span>
  )
}

const CardContent = ({ text }) => (
  <div className='px-4 mb-4 relative'>
    {text && <p className='text-medium text-gray-800'>{highlightMentions(text)}</p>}
  </div>
)

CardContent.defaultProps = {
  text: ''
}

CardContent.propTypes = {
  text: PropTypes.string
}

export default CardContent
