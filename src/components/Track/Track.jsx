import React from 'react';
import PropTypes from 'prop-types';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(e) {
    this.props.onAdd(this.props.track);
  }

  removeTrack(e) {
    this.props.onRemoval(this.props.track);
  }

  renderAction() {
    if (this.props.isPlaylistTrack) {
      return (
        <a
          className="Track-action"
          onClick={this.removeTrack}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
        -
        </a>);
    }
    return (
      <a
        className="Track-action"
        onClick={this.addTrack}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
      >
      +
      </a>);
  }

  render() {
    return (
      <div key={this.props.track.id} className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

Track.propTypes = {
  track: PropTypes.object, // TODO: change this to a shape
  onAdd: PropTypes.func.isRequired,
  onRemoval: PropTypes.func.isRequired,
  isPlaylistTrack: PropTypes.bool.isRequired,
};

Track.defaultProps = {
  track: {},
};

export default Track;
