import * as React from 'react';
import Dropdown from 'react-dropdown';
// tslint:disable:no-import-side-effect
// tslint:disable-next-line:no-submodule-imports
import 'react-dropdown/style.css';
import { RootState } from 'typesafe-actions';
import GameCard from './components/GameCard';
import { GameData, SortOption } from './types';
import { sortData, filterData } from './transform';
import { connect } from 'react-redux';
import { fetchGamesAsync } from './actions';

interface State {
  data: GameData[] | null;
  options: SortOption[];
  defaultOption: string;
  selectedSort: string;
  searchString: string;
}

const mapStateToProps = (state: RootState) => ({
  isLoading: state.games.isLoadingGames,
  gameData: state.games.data,
});

const dispatchProps = {
  fetchGames: fetchGamesAsync.request,
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

class GamesDashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
      searchString: '',
      options: [
        { value: 'none', label: 'None' },
        { value: 'score_low_to_high', label: 'Score: Low to high' },
        { value: 'score_high_to_low', label: 'Score: high to low' },
      ],
      defaultOption: 'none',
      selectedSort: 'none',
    };

    this.onSortSelection = this.onSortSelection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);

  }

  onSortSelection = (option: SortOption) => {
    if (this.state.selectedSort === option.value) {
      return;
    }

    this.setState({
      data: sortData(option.value, this.props.gameData),
      selectedSort: option.value,
    });
  };

  componentDidMount(): void {
    this.props.fetchGames();
  }

  componentWillReceiveProps(nextProps: Props): void {
    const gamesData = nextProps.gameData;
    this.setState({
      data: Array.isArray(gamesData) && gamesData.length ? gamesData : null,
    });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const filterText = event.currentTarget.value;
    this.setState({
      searchString: filterText,
      data: filterData(filterText, this.props.gameData),
    });
  }

  clearSearch(): void {
    this.setState({
      searchString: '',
      data: this.props.gameData,
    });
  }

  render(): React.ReactNode {
    const { options, defaultOption, data } = this.state;
    const { isLoading } = this.props;
    return (
      <div className="container">
        <div className="filterWrapper">
          <div className="btnAndInputWrapper">
            <input
              type="text"
              value={this.state.searchString}
              onChange={this.handleChange}
              placeholder="type name of game"
            />
            <div className="crossBtn" onClick={this.clearSearch}><span>x</span></div>
          </div>
          <Dropdown
            options={options}
            onChange={this.onSortSelection}
            value={defaultOption}
            placeholder="sort" />
        </div>
        {isLoading ? <p>Loading...</p> : data ? <section className="gameCardsWrapper">
          {data.map((game: GameData, index: number) => {
            return (
              <GameCard
                key={`${game.title}${game.score}${index}`}
                title={game.title}
                platform={game.platform}
                editors_choice={game.editors_choice}
                genre={game.genre}
                score={game.score} />
            );
          })}
        </section> : null
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchProps
)(GamesDashboard);
