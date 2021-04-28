import React from 'react';

const NavBar = ({ session, login, logout, signedInAs }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          Navbar
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a className='nav-link active' aria-current='page' href='#'>
                Home
              </a>
            </li>
            {session ? (
              <li className='nav-item' onClick={logout}>
                <a className='nav-link' href='#'>
                  Logout
                </a>
              </li>
            ) : (
              <li className='nav-item' onClick={login}>
                <a className='nav-link' href='#'>
                  LogIn
                </a>
              </li>
            )}
          </ul>
        </div>
        {session ? <span>{signedInAs}</span> : null}
      </div>
    </nav>
  );
};

export default NavBar;
