"use client"

import React, {Dispatch, SetStateAction, useEffect} from "react";
import {css, styled} from "styled-components";
import {useGlitch} from "react-powerglitch";

const BoardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 60px);
    justify-items: center;
    gap: 8px;
    color: white;
    border: 1px solid rgba(100, 100, 100, 0.5);
    background: rgba(0, 0, 0, 0.84);
    border-radius: 8px;
    padding: 16px;
`
const BoardItem = styled.div<{ $isSelected: boolean, $isRolled: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 25px;
    padding: 20px;
    cursor: pointer;

    ${props => props.$isRolled &&
            css`
                background: red;
                border-radius: 50%;
            `
    }
    ${props => props.$isSelected &&
            css`
                background: #e8e8e8;
                color: #0a0a0a;
                border-radius: 4px;
            `
    }
`

type CallerBoardProps = {
  gameArray: number[]
  remainingItems: number[]
  setRemainingItems: Dispatch<SetStateAction<number[]>>
  isRolling: boolean
  selectedItem: number | null
  toggleGlitch?: boolean
} & React.ComponentPropsWithoutRef<'div'>

const CallerBoard: React.FC<CallerBoardProps> = (
  {
    gameArray,
    isRolling,
    remainingItems,
    setRemainingItems,
    selectedItem,
    toggleGlitch,
    ...props
  }) => {

  const glitch = useGlitch({

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

  return <BoardWrapper ref={glitch.ref} {...props}>
    {
      gameArray.map(item =>
        <BoardItem
          key={item}
          $isRolled={item === selectedItem}
          $isSelected={!remainingItems.includes(item)}
          onClick={() => {
            if (!isRolling) {
              if (remainingItems.includes(item)) {
                setRemainingItems(remainingItems.filter(number => item !== number))
              } else {
                setRemainingItems([...remainingItems, item])
              }
            }
          }}
        >
          {item}
        </BoardItem>)
    }
  </BoardWrapper>
}

export default CallerBoard
