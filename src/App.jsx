import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice";
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.log("Unexpected authentication error:", error);
        dispatch(logout());
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50">
          <div className="youtube-loader h-full bg-blue-500 origin-left"></div>
        </div>
      )}
      
      <div className='min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App