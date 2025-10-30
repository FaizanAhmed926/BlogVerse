import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  
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
    <header className='bg-slate-800/80 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-40 shadow-xl'>
      <Container>
        <nav className='flex items-center justify-between py-4'>
          {/* Logo */}
          <Link to='/' className='flex items-center space-x-3 group'>
            <Logo/>
          </Link>

          {/* Navigation */}
          <div className='flex items-center space-x-2'>
            {navItems.map((item) => (
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className='flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 group'
                >
                  <span className='text-lg'>{item.icon}</span>
                  <span className='font-medium'>{item.name}</span>
                </button>
              ) : null
            ))}
            {authStatus && (
              <div className='ml-4'>
                <LogoutBtn />
              </div>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;