import React from 'react'

const Header = ({ children }) => (
  <div className='relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200'>
    <div className='flex-1 px-4 py-3 flex justify-between'>
      {children}
    </div>
  </div>

)

export default Header
