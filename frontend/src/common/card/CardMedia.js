import PropTypes from 'prop-types'

import Utils from '../../utils'

const CardMedia = ({ media }) => (
  <div className='px-4 mb-4 relative'>
    {media && Utils.Media.getComponent(media)}
  </div>
)

CardMedia.defaultProps = {
  media: PropTypes.object
}

export default CardMedia
