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
import Pagination from './components/pagination';
import { groupByPlatForm } from '../../store/utils';

interface State {
  data: GameData[] | null;
  options: SortOption[];
  defaultOption: string;
  selectedSort: string;
  searchString: string;
  currentPage: number;
  gameesPerPage: number;
  isDataGroupedByPlatform: boolean;
  platformSpecificData: {[key: string]: GameData[]};
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
      currentPage: 1,
      gameesPerPage: 4,
      isDataGroupedByPlatform: false,
      platformSpecificData: {},
    };

    this.onSortSelection = this.onSortSelection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.updatePageNumber = this.updatePageNumber.bind(this);
    this.groupByPlatform = this.groupByPlatform.bind(this);

  }

  componentDidMount(): void {
    this.props.fetchGames();
  }

  componentWillReceiveProps(nextProps: Props): void {
    const gamesData = nextProps.gameData;
    const isData = Array.isArray(gamesData) && gamesData.length;
    this.setState({
      data:  isData ? gamesData : null,
      platformSpecificData: isData ? groupByPlatForm(gamesData) : {},
    });
  }

  onSortSelection = (option: SortOption) => {
    const { selectedSort, searchString, data} = this.state;
    if (selectedSort === option.value) {
      return;
    }

    const sortedData = sortData(option.value, searchString.length && data
      ? data : this.props.gameData);

    this.setState({
      defaultOption: option.value,
      data: sortedData,
      selectedSort: option.value,
      platformSpecificData: groupByPlatForm(sortedData),
    });
  };

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const filterText = event.currentTarget.value;
    if (filterText && filterText.length) {
      const filterdData = filterData(filterText, this.props.gameData);
      this.setState({
        searchString: filterText,
        data: filterdData,
        platformSpecificData: groupByPlatForm(filterdData),
        defaultOption: 'none',
        selectedSort: 'none',
      });

      return;
    }

    this.clearSearch();
  }

  clearSearch(): void {
    this.setState({
      searchString: '',
      data: this.props.gameData,
      defaultOption: 'none',
      selectedSort: 'none',
    });
  }

  updatePageNumber(currentPage: number): void {
    this.setState({
      currentPage,
    });
  }

  groupByPlatform(): void {
    this.setState({
      isDataGroupedByPlatform: !this.state.isDataGroupedByPlatform,
    });
  }

  renderGamesCards(games: GameData[]): React.ReactNode {
    return games.map((game: GameData, index: number) => {
      return (
        <GameCard
          key={`${game.title}${game.score}${index}`}
          title={game.title}
          platform={game.platform}
          editors_choice={game.editors_choice}
          genre={game.genre}
          score={game.score} />
      );
    });
  }

  render(): React.ReactNode {
    const { options, defaultOption, data, currentPage, gameesPerPage } = this.state;
    const { isDataGroupedByPlatform, platformSpecificData } = this.state;
    const { isLoading } = this.props;

    const indexOfLastTodo = currentPage * gameesPerPage;
    const indexOfFirstTodo = indexOfLastTodo - gameesPerPage;
    const currentGames = data && data.slice(indexOfFirstTodo, indexOfLastTodo);

    return (
      <div className="container">
        <div className="headerTab">
        <h2 className="mainHeading">Game Arena</h2>
        {isLoading ? null : <button
          onClick={this.groupByPlatform}>
            {isDataGroupedByPlatform ? `See Full View` : `groupBy Platform`}
          </button>}
        </div>
        {isLoading ? null : <div className="filterWrapper">
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
        </div>}
        {isLoading
        ? <p>Loading...</p>
        : isDataGroupedByPlatform
        ? <section className="gameCardsWrapper">
          {Object.keys(platformSpecificData) && Object.keys(platformSpecificData).length
          ? Object.keys(platformSpecificData).map((platform: string, index: number) => {
            return (<div key={`${platform}${index}`}>
              <h3 className="platformHeader">{platform.toUpperCase()}</h3>
              <div className="gameCardsWrapper">
              {this.renderGamesCards(platformSpecificData[platform])}
              </div>
            </div>);
          })
          : null}
        </section>
        : currentGames
        ? <section className="gameCardsWrapper">
          {this.renderGamesCards(currentGames)}
        </section>
        : null}
        {isDataGroupedByPlatform
        ? null
        : <Pagination gamesLength ={data ? data.length : 0} updatePageNumber={this.updatePageNumber}/>}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchProps
)(GamesDashboard);
