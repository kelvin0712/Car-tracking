import React from 'react';
import SearchBox from './components/SearchBox';
import Map from './components/Map';
import ResultList from './components/ResultList';
import CurrentActivity from './components/CurrentActivity';
import { searchByName, searchByVehicle, HistoryRecord } from './api';

import './App.css';

interface State {
  results: HistoryRecord[],
  showCurrentOnMap?: boolean,
  mode: string
}

class App extends React.Component<{}, State>{
  state = {
    results: [],
    mode: 'Driver' as const
  } as State

  /**
   * Handle on query input from users and pass the result to the local state 
   * @param query input 
   * @returns void
   */
  handleOnQuery = async (query: string = '') => {
    const search = this.state.mode === 'Driver'
      ? searchByName
      : searchByVehicle

    this.setState({ results: await search(query) })
  }

  /**
   * Switching search mode between vehicle id and driver name
   * emprty the results array in local state 
   * @param event 
   * @returns void 
   */
  handleSwitchQueryMode: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target
    if (value === this.state.mode) return

    this.setState({ mode: value, results: [] })
  }

  resultsAreFromOnlyOneDriver = () => {
    const ids = this.state.results.map(_ => _.firstName)
    // use firstName as id to make it simple,
    // I don't have time to refactor this to driverId
    const uniqueIds = [ ...new Set(ids) ]

    return uniqueIds.length === 1
  }

  getCurrentActivity = () => {
    const [ mostRecent ] = this.state.results

    return mostRecent
  }


  /**
   * When the component first mount into the DOM, 
   * run the query to fetch all data from database
   */
  componentDidMount() {
    this.handleOnQuery()
  }

  /**
   * A function that create a switch button on the user interface 
   */
  renderSwitch = () => {
    const MODE = 'mode'
    const modes = [
      { value: 'Driver', label: 'Driver' },
      { value: 'Vehicle', label: 'Vehicle Id' }
    ] as const

    return modes.map(
      ({ value, label }) =>
        <div key={value} style={{paddingLeft: "1rem"}}>
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

  /**
   * Handle toggle button to show the current location of the driver 
   */
  handleToggleCurrent = () => {
    this.setState(state => (
      { showCurrentOnMap: !state.showCurrentOnMap }
    ))
  }

  render() {
    const currentActivity = this.getCurrentActivity()

    return (
      <div className='container--horizontal'>
        <aside className='container--vertical'>
          <SearchBox key={this.state.mode} onQuery={this.handleOnQuery} />
          {this.renderSwitch()}
          {(this.resultsAreFromOnlyOneDriver() && currentActivity)
            ? <CurrentActivity
                {...currentActivity}
                onClick={this.handleToggleCurrent}
              />
            : null
          }
          <div className='results--list'>
            <ResultList historyRecords={this.state.results} />
          </div>
        </aside>
        <div className='results--map'>
          <Map
            markerForId={
              (this.state.showCurrentOnMap && currentActivity)
                ? currentActivity.id
                : undefined
            }
            historyRecords={this.state.results}
          />
        </div>
      </div>
    )
  }
}

export default App;