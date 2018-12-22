import * as React from 'react'
import styled from "styled-components"

const NavBar = styled.nav`
display: block;
width: 100%;
height: 6.5rem;
background: #fff;
z-index: 99;
border-top: 1px solid #eee;
border-bottom: 1px solid #eee;
`;

const NavBarLink = styled.a`
text-transform: uppercase;
font-size: 11px;
font-weight: 600;
letter-spacing: .2rem;
text-decoration: none;
line-height: 6.5rem;
color: #222;

:hover {
  color: #f7484e; 
}
`;

const NavBarItem = styled.li`
position: relative;
margin-left: 35px;
float: left;
margin-bottom: 0; 

@media (max-width: 550px) {
  display: none;
}
`

const NavBarItems = styled.ul`
list-style: none;
margin-bottom: 0; 
float: right;
`

export default class Navigation extends React.Component<{}, {}> {

  public render() {
    return (<NavBar className="fixed">
      <div className="container">

        <NavBarLink href="/">olivia ifrim</NavBarLink>

        <NavBarItems>
          <NavBarItem><NavBarLink href="/#about">about</NavBarLink></NavBarItem>
          <NavBarItem><NavBarLink href="/#blog">blog</NavBarLink></NavBarItem>
          <NavBarItem><NavBarLink href="/#contact">contact</NavBarLink></NavBarItem>
        </NavBarItems>
      </div>
    </NavBar>);
  }
}