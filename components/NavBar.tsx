import React from 'react';
import Link from 'next/link';
import Headroom from 'headroom.js';
import { Collapse, NavbarBrand, Navbar, NavItem, Nav, Container, UncontrolledTooltip } from 'reactstrap';

const NavBar = ({ session, login, logout, signedInAs }) => {
  const [bodyClick, setBodyClick] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(true);
  React.useEffect(() => {
    let headroom = new Headroom(document.getElementById('navbar-main'));
    headroom.init();
  });
  const authLinks = (
    <>
      <NavItem>
        <Link href='/account'>
          <a className='nav-link'>Account</a>
        </Link>
      </NavItem>

      <NavItem>
        <Link href='/account/invoices'>
          <a className='nav-link'>My Invoices</a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href='/account/addinvoice'>
          <a className='nav-link'>New Invoice</a>
        </Link>
      </NavItem>
      <NavItem onClick={logout} style={{ cursor: 'pointer' }}>
        <a className='nav-link'>Logout</a>
      </NavItem>
    </>
  );
  const guestLinks = (
    <NavItem onClick={login}>
      <a className='nav-link'>Login</a>
    </NavItem>
  );

  return (
    <>
      {bodyClick ? (
        <div
          id='bodyClick'
          onClick={() => {
            document.documentElement.classList.toggle('nav-open');
            setBodyClick(false);
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar expand='lg' id='navbar-main' color='danger'>
        <Container>
          <div className='navbar-translate'>
            <NavbarBrand id='navbar-brand' to='/index' href='/'>
              Invoicify
            </NavbarBrand>
            <UncontrolledTooltip placement='bottom' target='navbar-brand'>
              Invoicify
            </UncontrolledTooltip>
            <button
              className='navbar-toggler'
              id='navigation'
              type='button'
              onClick={() => {
                document.documentElement.classList.toggle('nav-open');
                setBodyClick(true);
                setCollapseOpen(true);
              }}>
              <span className='navbar-toggler-bar bar1' />
              <span className='navbar-toggler-bar bar2' />
              <span className='navbar-toggler-bar bar3' />
            </button>
          </div>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <Link href='/'>
                  <a className='nav-link active' aria-current='page'>
                    Home
                  </a>
                </Link>
              </NavItem>
              {session ? authLinks : guestLinks}
              <NavItem>
                {session && (
                  <Link href='/account'>
                    <a className='nav-link'>{signedInAs}</a>
                  </Link>
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
