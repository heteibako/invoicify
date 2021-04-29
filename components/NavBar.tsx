import React from 'react';
import Link from 'next/link';

const NavBar = ({ session, login, logout, signedInAs }) => {
  const authLinks = (
    <>
      <li className='nav-item'>
        <Link href='/account'>
          <a className='nav-link'>Account</a>
        </Link>
      </li>
      <li className='nav-item' onClick={logout}>
        <a className='nav-link'>Logout</a>
      </li>
      <li>
        <Link href='/account/invoices'>
          <a className='nav-link'>My Invoices</a>
        </Link>
      </li>
      <li>
        <Link href='/account/addinvoice'>
          <a className='nav-link'>New Invoice</a>
        </Link>
      </li>
    </>
  );
  const guestLinks = (
    <li className='nav-item' onClick={login}>
      <a className='nav-link'>Login</a>
    </li>
  );
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
              <Link href='/'>
                <a className='nav-link active' aria-current='page'>
                  Home
                </a>
              </Link>
            </li>
            {session ? authLinks : guestLinks}
          </ul>
        </div>
        {session ? <small className='text-muted'>{signedInAs}</small> : null}
      </div>
    </nav>
  );
};

export default NavBar;
