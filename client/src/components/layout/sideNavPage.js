
import React from 'react';
import { MDBIcon, MDBSideNavCat, MDBSideNavNav, MDBSideNav, MDBSideNavLink, MDBContainer, MDBRow, MDBBtn } from 'mdbreact';

class SideNavPage extends React.Component {
  state = {
    isOpen: false
  }

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    var profile = <NavItem eventKey="home">
        <NavIcon>
        <a href="/profile">
            <i className="far fa-user" style={{ fontSize: '1.75em'  }} ></i>
            </a>
        </NavIcon>
        <NavText >
            <a href="/profile">
            My Page
            </a>
        </NavText>
    </NavItem>
   
    var signout = <NavItem eventKey="home">
    <NavIcon>
    <a onClick={this.logOut}>
        <i className=" 	fas fa-sign-in-alt" style={{ fontSize: '1.75em'  }} ></i>
        </a>
    </NavIcon>
    <NavText >
        <a onClick={this.logOut}>
        Logout
        </a>
    </NavText>
</NavItem>
    const { isOpen } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBBtn onClick={this.handleToggle}><MDBIcon icon="bars" size="5x" /></MDBBtn>
        </MDBRow>
        <MDBSideNav
          // logo="https://mdbootstrap.com/img/logo/mdb-transparent.png"
          // hidden
          triggerOpening={isOpen}
          breakWidth={1300}
          className="deep-purple darken-4"
        >
          <li>
            <ul className="social">
              <li>
                <a href="#!">
                  <MDBIcon fab icon="facebook-f" />
                </a>
              </li>
              <li>
                <a href="#!">
                  <MDBIcon fab icon="pinterest" />
                </a>
              </li>
              <li>
                <a href="#!">
                  <MDBIcon fab icon="google-plus-g" />
                </a>
              </li>
              <li>
                <a href="#!">
                  <MDBIcon fab icon="twitter" />
                </a>
              </li>
            </ul>
          </li>
          <MDBSideNavNav>
            <MDBSideNavCat
              name="Submit blog"
              id="submit-blog"
              icon="chevron-right"
            >
              <MDBSideNavLink>Submit listing</MDBSideNavLink>
              <MDBSideNavLink>Registration form</MDBSideNavLink>
            </MDBSideNavCat>
            <MDBSideNavCat
              name="Instruction"
              id="instruction"
              iconRegular
              icon="hand-pointer"
              href="#"
            >
              <MDBSideNavLink>For bloggers</MDBSideNavLink>
              <MDBSideNavLink>For authors</MDBSideNavLink>
            </MDBSideNavCat>
            <MDBSideNavCat name="About" id="about" icon="eye">
              <MDBSideNavLink>Instruction</MDBSideNavLink>
              <MDBSideNavLink>Monthly meetings</MDBSideNavLink>
            </MDBSideNavCat>
            <MDBSideNavCat name="Contact me" id="contact-me" iconRegular icon="envelope">
              <MDBSideNavLink>FAQ</MDBSideNavLink>
              <MDBSideNavLink>Write a message</MDBSideNavLink>
            </MDBSideNavCat>
          </MDBSideNavNav>
        </MDBSideNav>
      </MDBContainer>
    );
  }
}

export default SideNavPage;