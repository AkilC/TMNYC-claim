import React from 'react'
import styled from 'styled-components'



const Button = styled.button`

        position: relative;
        background-color: white;
        width: 80px;
        height: 45px;
        
        border: none;
        border-color: white;
        color: black;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
        border-radius: 8px;

        &:hover{
            background-color: lightgray;
        
        }

//note to self error - i didnt include the props at first and
//when i placed this component in another component
//the onClick property was not working 
`
const LogoutB = ({onClick, style}) => {
  return (
    <Button onClick={onClick} style={style}>Logout</Button>

  )
}

export default LogoutB