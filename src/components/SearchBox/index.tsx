import React from 'react';
import './SearchBox.scss';

export default class SearchBox extends React.Component<{
  onQuery(query: string): void
}> {
  inputRef = React.createRef<HTMLInputElement>()

  /**
   * Handle on click of search box
   */
  handleOnClick = () => {
    const { current } = this.inputRef
    if (current) this.props.onQuery(current.value)
  }

  render() {
    return (
      <div className='SearchBox'>
        <input type="text" ref={this.inputRef} />
        <button onClick={this.handleOnClick}>SEARCH</button>
      </div>
    )
  }
}
