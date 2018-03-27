import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      type: ['album', 'artist', 'playlist', 'track'],
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleQueryChange(e) {
    this.setState({
      query: e.target.value,
    });
  }

  handleSearch(e) {
    this.props.searchSpotify(
      this.state.query,
      this.state.type,
    );
    e.preventDefault();
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song Title" onChange={this.handleQueryChange} />
        <a
          onClick={this.handleSearch}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          SEARCH
        </a>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchSpotify: PropTypes.func.isRequired,
};

export default SearchBar;
