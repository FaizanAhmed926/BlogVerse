import React from 'react'

export const Logo = ({width = '100px'}) => {
  return (
    <div className="flex items-center space-x-2">
      <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
        <span className='text-white font-bold text-sm'>B</span>
      </div>
      <span className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
        BlogVerse
      </span>
    </div>
  )
}
