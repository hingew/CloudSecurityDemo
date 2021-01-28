import React from 'react'
import PropTypes from 'prop-types'
import Navigation from './index'
import Icon from '../icon'
import Auth from '../../utils/auth'
const NavigationContainer = ({ children }) => (
  <div className='flex flex-shrink-0'>
    <div className='flex flex-col w-64'>
      <nav className='bg-gray-800 border-r border-gray-900 pb-4 flex flex-col flex-grow overflow-y-auto'>
        <div className='flex items-center h-16 flex-shrink-0 px-4 bg-gray-900'>
          <Icon type={Icon.TYPES.cloud} className='block h-8 w-auto text-white' />
          <h1 className='text-xl ml-2 text-gray-200 font-bold'>Cloud</h1>
        </div>
        <div className='flex-grow mt-5 flex flex-col'>
          <div className='flex-1 space-y-1'>
            {children}
          </div>
        </div>
        <div className='flex-shrink-0 block w-full'>
          <Navigation.Item label='Logout' icon={Icon.TYPES.logout} route='login' onClick={() => Auth.removeBearer()} />
        </div>
      </nav>
    </div>
  </div>
)

NavigationContainer.propTypes = {
  children: PropTypes.node
}

export default NavigationContainer
