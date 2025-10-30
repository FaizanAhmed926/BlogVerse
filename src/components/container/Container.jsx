import React from 'react'

const Container = ({children, className = ""}) => {
  return (
    <div className={`w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 ${className}`}>
        {children}
    </div>
  );
}

export default Container;