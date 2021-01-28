import React from 'react'
import PropTypes from 'prop-types'

const ListItem = ({ fileName = '', onClick }) => (
  <div onClick={onClick} className='cursor-pointer relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-inset focus-within:ring-teal-500'>
    <div className='flex-1-min-w-0'>
      <p className='text-sm font-medium text-gray-900'>
        {fileName}
      </p>
    </div>
  </div>
)

ListItem.defaultProps = {
  fileName: '',
  onClick: () => null
}

ListItem.propTypes = {
  fileName: PropTypes.string,
  onClick: PropTypes.func
}

export default ListItem
