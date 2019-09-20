import React from 'react';
import SearchBox from './components/SearchBox';
import Map from './components/Map';

import './App.css';
import { searchByName, searchByVehicle, HistoryRecord } from './api';

class App extends React.Component<{}, {
  results: HistoryRecord[]
  mode: string
}>{
  state = {
    results: [],
    mode: 'Driver' as const
  }

  handleOnQuery = async (query: string) => {
    const search = this.state.mode === 'Driver'
      ? searchByName
      : searchByVehicle

    this.setState({ results: await search(query) })
  }

  handleSwitchQueryMode: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target
    if (value === this.state.mode) return

    this.setState({ mode: value, results: [] })
  }

  renderSwitch = () => {
    const MODE = 'mode'
    const modes = [
      { value: 'Driver', label: 'Driver' },
      { value: 'Vehicle', label: 'Vehicle Id' }
    ] as const

    return modes.map(
      ({ value, label }) => 
      <div style={{ display: "inline"}}>
          <label key={value}>
          <input
            onChange={this.handleSwitchQueryMode}
            type='radio'
            name={MODE}
            value={value}
            checked={value === this.state.mode}
          />
          {label}
        </label>
      </div>
    )
  }

  render() {
    return (
      <div className='vertical-list'>
        <SearchBox key={this.state.mode} onQuery={this.handleOnQuery} />
        {this.renderSwitch()}
        {/* <Results historyEntries={this.state.results} /> */}
        <Map isMarkerShown location={this.state.results}  />
      </div>
    )
  }
}

/**
 * Display list of history event
 * @params historyEntries an array of history events
 */
const Results = (props: {
  historyEntries: HistoryRecord[]
}) => {
  console.log(props.historyEntries)

  return <div>
    {props.historyEntries.map(entry => <HistoryListItem key={entry.id} {...entry} />)}
  </div>
}

const HistoryListItem = (props: HistoryRecord) => {
  return <div>
    <p> Driver Name: {props.name}</p>
  </div>
}

export default App;