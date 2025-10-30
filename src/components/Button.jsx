import React from 'react'

const Button = ({
    children,
    type='button',
    textColor='text-emerald-950',
    bgColor='bg-white',
    className='',
    ...props
}) => {
  return (
    <button className={` px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}{...props}>
        {children}
    </button>
  )
}

export default Button