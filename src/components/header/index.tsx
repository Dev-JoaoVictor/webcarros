import logo from '../../assets/logo.svg';

import { Link } from 'react-router-dom';

import { FiUser, FiLogIn } from 'react-icons/fi'

export function Header() {
  const signed = false;
  const loadingAuth = false;

  return (
    <div className='w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4'>
      <header className='w-full flex items-center justify-between max-w-7xl px-4 mx-auto'>
        <Link to="/">
          <img src={logo} alt="Logo do site" />
        </Link>
        {
          !loadingAuth && signed && (
            <Link to="/dashboard" className='border-2 rounded-full p-1 border-gray-900'>
              <FiUser size={24} color="#000" />
            </Link>
          )
        }

        {
          !loadingAuth && !signed && (
            <Link to="/login" className='border-2 rounded-full p-1 border-gray-900'>
              <FiLogIn size={24} color="#000" />
            </Link>
          )
        }
      </header>
    </div>
  )
}