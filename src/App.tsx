import React from 'react';
import SearchBox from './components/SearchBox';
import Map from './components/map/map';

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

  componentDidMount() {
   
  }

  render() {
    return (
      <div className='vertical-list'>
        <SearchBox onQuery={this.handleOnQuery} />
        <Results historyEntries={this.state.results} />  
        <Map isMarkerShown  />  
      </div>
    )
  }
}
/**
 * Display details of one history event
 * @params historyEntries an array of history events
 */
const Results = (props: {
  historyEntries: HistoryRecord[]
}) => {
  console.log(props.historyEntries)

  return <div>
    {props.historyEntries.map(entry => <HistoryListItem {...entry} />)}
  </div>
}

const HistoryListItem = (props: HistoryRecord) => {
  return <div>{props.name}</div>
}

export default App;