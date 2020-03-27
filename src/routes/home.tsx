import * as React from 'react';

import GamesDashboard from '../features/GamesDashboard';
import { StyledMain } from './styles';
import Pagination from '../features/GamesDashboard/components/pagination';

export default () => (
  <StyledMain>
    <Pagination />
    <h2 className="mainHeading">Game Arena</h2>
    <GamesDashboard />
  </StyledMain>
);
