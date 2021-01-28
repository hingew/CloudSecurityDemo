import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../../common/icon'
const Empty = ({ title, text, icon }) => (
  <div className='bg-transparent overflow-hidden w-full pt-40'>
    <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100'>
      <Icon type={icon} className='h-6 w-6 text-gray-600' />
    </div>
    <div className='mt-3 text-center sm:mt-5'>
      <h3 className='text-lg leading-6 font-medium text-gray-900'>
        {title}
      </h3>
      <div className='mt-2'>
        <p className='text-sm text-gray-500'>
          {text}
        </p>
      </div>
    </div>
  </div>
)

Empty.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
}

Empty.defaultProps = {
  title: 'No Results',
  icon: Icon.TYPES.search,
  text: 'Try something different ...'
}

export default Empty
