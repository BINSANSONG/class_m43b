import React, { Component } from 'react'

class SearchBar extends Component {
  state = { keyword: '' }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="ui segment container">
        <form className="ui form">
          <label htmlFor="keyword">Search!</label>
          <input
           id="keyword" 
           type="text"
           onChange={e => this.setState({ keyword: e.target.value.toUpperCase() })}
           value={this.state.keyword}
          />
        </form>
      </div>
    )
  }
}
export default SearchBar;