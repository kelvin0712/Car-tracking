import React from 'react';
import SearchBox from './components/SearchBox';

import './App.css';
import { searchByName, HistoryRecord, searchByVehicle } from './api';

class App extends React.Component<{}, {
  results: HistoryRecord[]
}>{
  state = {
    results: []
  }

  handleOnQuery = async (query: string) => {
    const results = await searchByName(query)
    this.setState({ results })
  }

  render() {
    return <div className='vertical-list'>
      <SearchBox onQuery={this.handleOnQuery} />
      <Results historyEntries={this.state.results} />
    </div>
  }
}

const Results = (props: {
  historyEntries: HistoryRecord[]
}) => <div>
  {props.historyEntries.map(entry => <HistoryListItem {...entry} />)}
</div>

const HistoryListItem = (props: HistoryRecord) => {
  return <div>{props.driverName}</div>
}

export default App;