import React, { Component } from 'react'

class SearchBar extends Component {
  render() {
    return (
      <div className="ui segment container">
        <form className="ui form">
          <label htmlFor="keyword">Search!</label>
          <input id="keyword" type="text"/>
        </form>
      </div>
    )
  }
}
export default SearchBar;