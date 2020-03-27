import * as React from 'react';
import { StyledPagination } from './styles';

interface Props {
  className?: string;
  gamesLength: number;
  updatePageNumber(currentPage: number): void;
}

interface State {
  currentPage: number;
  gameesPerPage: number;
}

class Pagination extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentPage: 1,
      gameesPerPage: 4,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: React.SyntheticEvent): void {
    this.setState({
      currentPage: Number(event.currentTarget.id),
    }, () => this.props.updatePageNumber(this.state.currentPage));
  }

  render(): React.ReactNode {
    const { className, gamesLength } = this.props;
    const { gameesPerPage } = this.state;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(gamesLength / gameesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(page => {
      return (
        <li
          key={page}
          id={`${page}`}
          onClick={this.handleClick}
        >
          {page}
        </li>
      );
    });

    return (
      <StyledPagination className={className}>
        <ul>
          {renderPageNumbers}
        </ul>
      </StyledPagination>
    );
  }
}

export default Pagination;
