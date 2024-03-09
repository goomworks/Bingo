"use client";

import React, {useEffect, useState} from "react";
import {styled} from "styled-components";
import {useGlitch} from "react-powerglitch";

const ButtonWrapper = styled.button<{disabled?: boolean}>`
    height: 37px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    
    padding: 8px;
    border-radius: 2px;
    border: 1px solid gray;
    color: ${props => props.disabled && 'gray'};
    
    &:hover {
        ${props => !props.disabled && 'background: rgba(0, 0, 0, 0.08)'};
    }
`

type ButtonProps = {
  children: React.ReactNode
  toggleGlitch?: boolean
} & React.ComponentPropsWithoutRef<'button'>

const Button: React.FC<ButtonProps> = ({toggleGlitch, children, ...props}) => {
  const glitch = useGlitch({
    playMode: 'manual',
    timing: {
      duration: 3000
    }
  })

  const {startGlitch, stopGlitch} = glitch

  useEffect(() => {
    if (toggleGlitch) {
      startGlitch()
    } else {
      stopGlitch()
    }
  }, [toggleGlitch]);

  return <ButtonWrapper disabled={props.disabled} ref={glitch.ref} {...props}>
    {children}
  </ButtonWrapper>
}
export default Button
