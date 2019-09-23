import React from 'react';
import SearchBox from './components/SearchBox';
import Map from './components/Map';
import ResultList from './components/ResultList';

import './App.css';
import { searchByName, searchByVehicle, HistoryRecord } from './api';

class App extends React.Component<{}>{
  state = {
    results: [],
    mode: 'Driver' as const
  } as {
    results: HistoryRecord[]
    mode: string
  }

  handleOnQuery = async (query: string = '') => {
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

  componentDidMount() {
    this.handleOnQuery()
    // query for everything
  }

  renderSwitch = () => {
    const MODE = 'mode'
    const modes = [
      { value: 'Driver', label: 'Driver' },
      { value: 'Vehicle', label: 'Vehicle Id' }
    ] as const

    return modes.map(
      ({ value, label }) =>
        <div key={value}>
          <label>
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
      <div className='container--horizontal'>
        <aside className='container--vertical'>
          <SearchBox key={this.state.mode} onQuery={this.handleOnQuery} />
          {this.renderSwitch()}
          <div className='results--list'>
            <ResultList historyRecords={this.state.results} />
          </div>
        </aside>
        <div className='results--map'>
          <Map historyRecords={this.state.results}  />
        </div>
      </div>
    )
  }
}

export default App;