import React, { useState } from 'react';
import { useAuth } from '../../context/context';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing the icons from react-icons

const Header: React.FC = () => {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
	
    <nav className="bg-gray-200 fixed w-full z-30">
	  <div className='flex flex-row justify-between items-center max-w-7xl mx-auto h-[8vh] px-4 md:px-8'>
		{/* logo */}
		<div>
			<h1 className='text-3xl font-bold text-gray-900'>MEDIBOT</h1>
		</div>
		{/* navlinks */}
		{/* <div className="hidden md:flex md:items-center md:space-x-4">
              <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </ScrollLink>
              <ScrollLink to="services" smooth={true} duration={500} className="cursor-pointer text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Services
              </ScrollLink>
              <ScrollLink to="testimonials" smooth={true} duration={500} className="cursor-pointer text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Reviews
              </ScrollLink>
              <ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                About
              </ScrollLink>
              {auth?.isLoggedIn ? (
                <RouterLink to="/" onClick={auth.logout} className="hover:bg-gray-600 px-4 py-2 rounded-md text-lg font-medium bg-[#05101c] text-white">
                  Logout
                </RouterLink>
              ) : (
                <RouterLink to="/login" className="hover:bg-gray-600 px-4 py-2 rounded-md text-lg font-medium bg-[#05101c] text-white">
                  Log In
                </RouterLink>
              )}
            </div> */}



            <div className="hidden md:flex md:items-center md:space-x-4">
              
              {auth?.isLoggedIn ? (
                
                <RouterLink to="/" onClick={auth.logout} className="hover:bg-gray-600 px-4 py-2 rounded-md text-lg font-medium bg-[#05101c] text-white">
                  Logout
                </RouterLink>
              ) : (

                <>

                <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-medium">
                Home
              </ScrollLink>
              <ScrollLink to="services" smooth={true} duration={500} className="cursor-pointer text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-medium">
                Services
              </ScrollLink>
              <ScrollLink to="testimonials" smooth={true} duration={500} className="cursor-pointer text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-medium">
                Reviews
              </ScrollLink>
              <ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-medium">
                About
              </ScrollLink>

                <RouterLink to="/login" className="hover:bg-gray-600 px-4 py-2 rounded-md text-lg font-medium bg-[#05101c] text-white">
                  Log In
                </RouterLink>
                </>
              )}
            </div>



			<div className="flex items-center md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500">
              {menuOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

	  </div>

      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <ScrollLink to="home" smooth={true} duration={500} onClick={closeMenu} className="cursor-pointer text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </ScrollLink>
            <ScrollLink to="services" smooth={true} duration={500} onClick={closeMenu} className="cursor-pointer text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Services
            </ScrollLink>
            <ScrollLink to="reviews" smooth={true} duration={500} onClick={closeMenu} className="cursor-pointer text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Reviews
            </ScrollLink>
            <ScrollLink to="about" smooth={true} duration={500} onClick={closeMenu} className="cursor-pointer text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              About
            </ScrollLink>
            <ScrollLink to="footer" smooth={true} duration={500} onClick={closeMenu} className="cursor-pointer text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Footer
            </ScrollLink>
            {auth?.isLoggedIn ? (
              <RouterLink to="/" onClick={() => {auth.logout(); closeMenu();}} className="hover:bg-gray-600 px-4 py-2 rounded-md text-lg font-medium bg-[#05101c] text-white">
                Logout
              </RouterLink>
            ) : (
              <RouterLink to="/login" onClick={closeMenu} className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium bg-[#05101c] w-20">
                Log In
              </RouterLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;

