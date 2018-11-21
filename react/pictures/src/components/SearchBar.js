import React, { Component } from 'react'

class SearchBar extends Component {
  state = { keyword: '' }

  componentDidUpdate() {
    console.log(this.state);
  }

  removeBadWords(input) {
    this.setState({ keyword: input }, () => {
      if(/.*fool.*/i.test(this.state.keyword)) {
        this.setState({ 
          keyword: this.state.keyword.replace(/fool/i, 'NOPE') 
        })
      }
    });
  }

  render() {
    return (
      <div className="ui segment container">
        <form className="ui form">
          <label htmlFor="keyword">Search!</label>
          <input
           id="keyword" 
           type="text"
           onChange={e => this.removeBadWords(e.target.value)}
           value={this.state.keyword}
          />
        </form>
      </div>
    )
  }
}
export default SearchBar;