import React from 'react'
import styled from 'styled-components'
import logo from '../TMNYC_W@2x.png'



const Container = styled.div`
    height: 80px;
    background-color: #222;


`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex; 
    align-items: center;
    justify-content: space-between
    
`
const Logo = styled.img`
        height: 60px;
        width: 110px;
`

const Navbar = ({children}) => {
  return (
    <Container>
        <Wrapper>
            <Logo src={logo} />
            {children}
        </Wrapper>
    </Container>
  )
}

export default Navbar