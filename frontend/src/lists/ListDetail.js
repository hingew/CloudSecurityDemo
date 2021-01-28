import React from 'react'
import PropTypes from 'prop-types'
import AvatarPlaceholder from '../common/avatar/placeholder'

const ListDetail = ({ name = '' }) => (
  <div>
    <div>
      <img className='h-32 w-full object-cover lg:h-48' src='https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80' alt='' />
    </div>
    <div className='max-w-5xl mx-auto px-8'>
      <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
        <div className='flex'>
          <AvatarPlaceholder text={name.substring(0, 2)} />
        </div>

      </div>
    </div>
  </div>
)

ListDetail.defaultProps = {
  name: '',
  onClick: () => null
}

ListDetail.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func
}

export default ListDetail
