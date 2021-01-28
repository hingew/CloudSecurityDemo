import React from 'react'
import PropTypes from 'prop-types'

import Empty from '../empty'
import Icon from '../icon'

const List = ({ data = [], renderItem, className }) => {
  if (!data || data.length === 0) {
    return Empty({ title: 'Not Lists found', text: 'Create a new One!', icon: Icon.TYPES.search })
  }

  return (
    <ul className={className}>
      {data.map((item, idx) =>
        <li key={`list-item-${idx}`}>
          {renderItem(item)}
        </li>)}
    </ul>
  )
}

List.defaultProps = {
  data: [],
  renderItem: (item) => null,
  className: 'divide-y divide-gray-200'
}

List.propTypes = {
  data: PropTypes.array,
  renderItem: PropTypes.func,
  className: PropTypes.string
}

export default List
