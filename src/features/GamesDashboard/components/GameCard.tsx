import * as React from 'react';
import { GameData } from '../types';

type Props = GameData;

function GameCard( props: Props) {
  const {title, platform, editors_choice, genre, score} = props;
  return (
    <div style={getStyle()}>
      <div>
        <img alt={title}/>
        <div>
          <h2>{title}</h2>
          <p>{platform}</p>
        </div>
        {editors_choice.toString() === 'y' ? `show star` : null}
        </div>
      <div>
        <p> {`genre: ${genre}`}</p>
        <p>{score}</p>
      </div>
    </div>
  );
}

const getStyle = (): React.CSSProperties => ({
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
});

export default GameCard;
