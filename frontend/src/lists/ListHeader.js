import React from 'react'
import PropTypes from 'prop-types'
import Input from '../common/input'

const ListHeader = ({ search = '', onSearch, count = 0 }) => (
  <div className='px-6 pt-6 pb-4'>
    <h2 className='text-lg font-medium text-gray-900'> Files</h2>
    <p className='mt-1 text-sm-text-gray-600'>
      Search in {count} entries
    </p>
    <div className='mt-6 flex space-x-4'>
      <div className='flex-1 min-w-0'>
        <Input
          value={search}
          onChange={value => onSearch(value)}
          placeholder='Search'
          type='text'
          name='search'
        />
      </div>
    </div>
  </div>
)

ListHeader.defaultProps = {
  search: '',
  onSearch: (value) => null,
  listCount: 0
}

ListHeader.propTypes = {
  search: PropTypes.string,
  onSearch: PropTypes.func,
  listCount: PropTypes.number
}

export default ListHeader
