import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../common/icon'

const SearchInput = ({ onChange, value, icon, placeholder }) => (
  <>
    <label htmlFor='search' className='sr-only'>Search</label>
    <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
      <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
        <Icon type={icon} className='h-5 w-5' />
      </div>
      <input
        name='search'
        className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm'
        type='search'
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  </>
)

SearchInput.defaultProps = {
  onChange: () => null,
  value: '',
  icon: Icon.TYPES.search,
  placeholder: 'Search for something ...'
}

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default SearchInput
