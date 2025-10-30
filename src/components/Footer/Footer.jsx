import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';

function Footer() {
  return (
    <footer className="bg-slate-800/80 backdrop-blur-lg border-t border-slate-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold'>B</span>
              </div>
              <span className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                BlogVerse
              </span>
            </div>
            <p className="text-slate-400 max-w-md">
              Share your stories, ideas, and experiences with the world. Join our community of passionate writers and readers.
            </p>
            <p className="text-slate-500 text-sm mt-4">
              &copy; {new Date().getFullYear()} BlogVerse. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Explore</h3>
            <ul className="space-y-3">
              {['Home', 'All Posts', 'Add Post'].map((item) => (
                <li key={item}>
                  <Link
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-3">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            Made with ❤️ for the blogging community
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;