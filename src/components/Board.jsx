import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Box = styled.div`
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  width: 360px;
  margin: 40px auto;
`;

const Square = styled.div`
  height: 16px;
  width: 16px;
  border: 1px solid black;
  background-color: ${(props) => props.color}
`;

const randomPosition = () => Math.floor(Math.random() * 399);

const Board = ({ size }) => {
  const [snakePosition, setSnakePosition] = useState(360);
  const [foodPosition, setFoodPosition] = useState(randomPosition);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        if (snakePosition >= 20) {
          setSnakePosition(snakePosition - 20);
        }
      }
      if (e.key === 'ArrowDown') {
        if (snakePosition <= 379) {
          setSnakePosition(snakePosition + 20);
        }
      }
      if (e.key === 'ArrowRight') {
        if (snakePosition < 399 && (snakePosition + 1) % 20 != 0) {
          setSnakePosition(snakePosition + 1);
        }
      }
      if (e.key === 'ArrowLeft') {
        if (snakePosition > 0 && snakePosition % 20 != 0) {
          setSnakePosition(snakePosition - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const renderSquares = () => {
    const squares = [];

    for (let i = 0; i < size * size; i++) {
      if (i === snakePosition) {
        squares.push(<Square color="red" />);
      } else if (i === foodPosition) {
        squares.push(<Square color="blue" />);
      } else if (snakePosition === foodPosition) {
        setFoodPosition(randomPosition);
      } else {
        squares.push(<Square />);
      }
    }

    return squares;
  };

  return <Box>{renderSquares()}</Box>;
};

export default Board;
