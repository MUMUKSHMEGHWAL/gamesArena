import * as React from 'react';

import GamesDashboard from '../features/GamesDashboard';
import { StyledMain } from './styles';

export default () => (
  <StyledMain>
    <h2 className="mainHeading">Game Arena</h2>
    <GamesDashboard />
  </StyledMain>
);
