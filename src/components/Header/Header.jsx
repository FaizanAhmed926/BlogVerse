import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
      icon: '🏠'
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: '🔐'
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: '📝'
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: '📚'
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: '✨'
    },
  ];

  return (
    <header className='bg-slate-800/90 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50 shadow-xl'>
      <Container>
        <nav className='flex items-center justify-between py-3'>
          {/* Logo */}
          <Link to='/' className='flex items-center space-x-2 group flex-shrink-0'>
             <Logo/>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1 lg:space-x-2'>
            {navItems.map((item) => (
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className='flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 text-sm lg:text-base'
                >
                  <span className='text-sm lg:text-base'>{item.icon}</span>
                  <span className='font-medium'>{item.name}</span>
                </button>
              ) : null
            ))}
            {authStatus && (
              <div className='ml-2'>
                <LogoutBtn />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className='md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden border-t border-slate-700 pt-4 pb-2'>
            <div className='flex flex-col space-y-2'>
              {navItems.map((item) => (
                item.active ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.slug);
                      setIsMenuOpen(false);
                    }}
                    className='flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 text-left'
                  >
                    <span className='text-lg'>{item.icon}</span>
                    <span className='font-medium'>{item.name}</span>
                  </button>
                ) : null
              ))}
              {authStatus && (
                <div className='px-4 py-2'>
                  <LogoutBtn />
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;