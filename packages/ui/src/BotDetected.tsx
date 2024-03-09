"use client"

import React from "react";
import {styled} from "styled-components";
import {useGlitch} from "react-powerglitch";

const BotWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`
const BotWarning = styled.div`
    color: white;
    background: rgba(0, 0, 0, 0.84);
`

type BotDetectedProps = {

} & React.ComponentPropsWithoutRef<'div'>

const BotDetected: React.FC<BotDetectedProps> = ({...props}) => {

  const glitch = useGlitch({
    timing: {
      duration: Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000,
      iterations: 25,
      easing: 'ease-in-out',
    },
    slice: {
      count:  Math.floor(Math.random() * (60 - 30 + 1)) + 30,
      velocity: 45,
      minHeight: 0.02,
      maxHeight: 0.90,
      hueRotate: true,
    },
    shake: {
      amplitudeX: 0.82
    }
  })

  return <BotWrapper {...props}>
    <BotWarning ref={glitch.ref}>
      <span>⚠️</span>BOT DETECTED<span>⚠️</span>
    </BotWarning>
  </BotWrapper>
}

export default BotDetected
