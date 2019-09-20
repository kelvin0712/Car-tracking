import React from 'react';
import './SearchBox.scss';

export default class SearchBox extends React.Component<{
  onQuery(query: string): void
}> {
  inputRef = React.createRef<HTMLInputElement>()

  handleOnClick = () => {
    const { current } = this.inputRef
    if (current) this.props.onQuery(current.value)
  }

  render() {
    return (
    <div className='horizontal-layout'>
      <input type="text" ref={this.inputRef} />
      <button onClick={this.handleOnClick}>SEARCH</button>
    </div>
    )
  }
}
