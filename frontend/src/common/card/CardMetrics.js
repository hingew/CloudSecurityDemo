/* eslint-disable camelcase */
import Icon from '../icon'
import PropTypes from 'prop-types'

const CardMetrics = ({ icon, value = 0 }) => (
  <div className='w-0 flex-1 flex'>
    <div className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent hover:text-gray-500'>
      <Icon type={icon} className='w-5 h-5 text-gray-400' />
      <span className='ml-3'>{value}</span>
    </div>
  </div>
)

const Metrics = ({ like, retweet, reply }) => {
  return (
    <div className='-mt-px flex divide-x divide-gray-200 border-t-2'>
      <CardMetrics icon={Icon.TYPES.like} value={like} />
      <CardMetrics icon={Icon.TYPES.retweet} value={retweet} />
      <CardMetrics icon={Icon.TYPES.comment} value={reply} />
    </div>
  )
}

CardMetrics.propTypes = {
  like: PropTypes.number,
  retweet: PropTypes.number,
  reply: PropTypes.number
}

export default Metrics
