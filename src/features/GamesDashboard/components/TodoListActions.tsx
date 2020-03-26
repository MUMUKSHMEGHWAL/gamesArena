import { RootState } from 'typesafe-actions';
import * as React from 'react';
import { connect } from 'react-redux';

import { fetchGamesAsync } from '../actions';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.games.isLoadingGames,
});
const dispatchProps = {
  loadTodos: fetchGamesAsync.request,
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

type State = {};

class TodoActions extends React.Component<Props, State> {
  render() {
    const { isLoading, loadTodos } = this.props;
    return (
      <section>
        <button type="button" onClick={() => loadTodos()} disabled={isLoading}>
          Load snapshot
        </button>
        &nbsp;
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchProps
)(TodoActions);
