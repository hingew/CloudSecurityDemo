import Avatar from '../avatar'
import Utils from '../../utils'
import PropTypes from 'prop-types'

function CardTitle ({ name, userName, imgUrl, createdAt }) {
  return (
    <div className='w-full flex items-center justify-between p-6'>
      <div className='flex-1 truncate'>
        <div className='flex items-center space-x-3'>
          <h3 className='text-gray-900 text-sm font-medium truncate'>
            {name}
          </h3>
          <p className='text-sm text-gray-500'>
            {Utils.Date.toRelative(createdAt)}
          </p>
        </div>
        <p className='mt-1 text-gray-500 text-sm truncate'>
          @{userName}
        </p>
      </div>
      <Avatar
        className='w-10 h-10 bg-gray-300 rounded-full flex-shrink-0'
        src={imgUrl}
      />
    </div>
  )
}

CardTitle.defaultProps = {
  name: null,
  userName: null,
  imgUrl: null,
  createdAt: null
}

CardTitle.propTypes = {
  name: PropTypes.string,
  userName: PropTypes.string,
  imgUrl: PropTypes.string,
  createdAt: PropTypes.string
}
export default CardTitle
