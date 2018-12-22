import React from "react"
import styled from "styled-components"

import Navigation from "./Navigation";

import "./../normalize.css"
import "./../skeleton.css"
import "./../custom.css"
import Footer from "./Footer";

const MainContent = styled.div`
padding-top: 100px;
`;

export default ({ children }) => (
  <div className="container">

    <Navigation />

    <MainContent>
      {children}
    </MainContent>

    <Footer />

  </div>);