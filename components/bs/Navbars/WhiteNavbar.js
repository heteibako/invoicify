import React from 'react';
import Link from 'next/link';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  UncontrolledTooltip,
} from 'reactstrap';
// core components

function WhiteNavbar() {
  const [bodyClick, setBodyClick] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    let headroom = new Headroom(document.getElementById('navbar-main'));
    // initialise
    headroom.init();
  });
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
      <Navbar expand='lg' id='navbar-main'>
        <Container>
          <div className='navbar-translate'>
            <NavbarBrand id='navbar-brand' to='/index'>
              Paper Kit PRO React
            </NavbarBrand>
            <UncontrolledTooltip placement='bottom' target='navbar-brand'>
              Paper Kit PRO React
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
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className='mr-2' color='default' caret nav>
                  Components
                </DropdownToggle>
                <DropdownMenu className='dropdown-danger' right>
                  <DropdownItem to='/index'>All Components</DropdownItem>
                  <DropdownItem to='/presentation'>Presentation</DropdownItem>
                  <DropdownItem
                    href='https://demos.creative-tim.com/paper-kit-pro-react/#/documentation/introduction?ref=pkpr-white-navbar'
                    target='_blank'>
                    Documentation
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className='mr-2' color='default' caret nav>
                  Sections
                </DropdownToggle>
                <DropdownMenu className='dropdown-danger' right>
                  <DropdownItem to='/sections#headers'>
                    <i className='nc-icon nc-tile-56' />
                    Headers
                  </DropdownItem>
                  <DropdownItem to='/sections#features'>
                    <i className='nc-icon nc-settings' />
                    Features
                  </DropdownItem>
                  <DropdownItem to='/sections#blogs'>
                    <i className='nc-icon nc-bullet-list-67' />
                    Blogs
                  </DropdownItem>
                  <DropdownItem to='/sections#teams'>
                    <i className='nc-icon nc-single-02' />
                    Teams
                  </DropdownItem>
                  <DropdownItem to='/sections#projects'>
                    <i className='nc-icon nc-calendar-60' />
                    Projects
                  </DropdownItem>
                  <DropdownItem to='/sections#pricing'>
                    <i className='nc-icon nc-money-coins' />
                    Pricing
                  </DropdownItem>
                  <DropdownItem to='/sections#testimonials'>
                    <i className='nc-icon nc-badge' />
                    Testimonials
                  </DropdownItem>
                  <DropdownItem to='/sections#contact-us'>
                    <i className='nc-icon nc-mobile' />
                    Contact Us
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle color='default' caret nav>
                  Examples
                </DropdownToggle>
                <DropdownMenu className='dropdown-danger' right>
                  <DropdownItem to='/about-us'>
                    <i className='nc-icon nc-bank' />
                    About-us
                  </DropdownItem>
                  <DropdownItem to='/add-product'>
                    <i className='nc-icon nc-basket' />
                    Add Product
                  </DropdownItem>
                  <DropdownItem to='/blog-post'>
                    <i className='nc-icon nc-badge' />
                    Blog Post
                  </DropdownItem>
                  <DropdownItem to='/blog-posts'>
                    <i className='nc-icon nc-bullet-list-67' />
                    Blog Posts
                  </DropdownItem>
                  <DropdownItem to='/contact-us'>
                    <i className='nc-icon nc-mobile' />
                    Contact Us
                  </DropdownItem>
                  <DropdownItem to='/discover'>
                    <i className='nc-icon nc-world-2' />
                    Discover
                  </DropdownItem>
                  <DropdownItem to='/e-commerce'>
                    <i className='nc-icon nc-send' />
                    Ecommerce
                  </DropdownItem>
                  <DropdownItem to='/landing-page'>
                    <i className='nc-icon nc-spaceship' />
                    Landing Page
                  </DropdownItem>
                  <DropdownItem to='/login-page'>
                    <i className='nc-icon nc-lock-circle-open' />
                    Login Page
                  </DropdownItem>
                  <DropdownItem to='/product-page'>
                    <i className='nc-icon nc-album-2' />
                    Product Page
                  </DropdownItem>
                  <DropdownItem to='/profile-page'>
                    <i className='nc-icon nc-single-02' />
                    Profile Page
                  </DropdownItem>
                  <DropdownItem to='/register-page'>
                    <i className='nc-icon nc-bookmark-2' />
                    Register Page
                  </DropdownItem>
                  <DropdownItem to='/search-with-sidebar'>
                    <i className='nc-icon nc-zoom-split' />
                    Search Page
                  </DropdownItem>
                  <DropdownItem to='/settings'>
                    <i className='nc-icon nc-settings-gear-65' />
                    Settings Page
                  </DropdownItem>
                  <DropdownItem to='/twitter-redesign'>
                    <i className='nc-icon nc-tie-bow' />
                    Twitter
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Button
                  className='btn-round'
                  color='danger'
                  href='https://www.creative-tim.com/product/paper-kit-pro-react?ref=pkpr-white-navbar'
                  target='_blank'>
                  <i className='nc-icon nc-cart-simple' /> Buy Now
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default WhiteNavbar;
