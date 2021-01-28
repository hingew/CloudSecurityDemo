import React from 'react'
import Icon from '../common/icon'
import Navigation from '../common/navigation'

const ViewContainer = ({ children }) => (
  <div className='bg-gray-200 h-screen flex overflow-hidden'>
    <Navigation.Container>
      <Navigation.Item route='/' icon={Icon.TYPES.list} label='Files' />
    </Navigation.Container>
    {children}
  </div>
)

export default ViewContainer
