import React from 'react';
import PropTypes from 'prop-types';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(e) {
    this.props.onAdd(this.props.track);
  }

  render() {
    return (
      <div key={this.props.track.id} className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a
          className="Track-action"
          onClick={this.addTrack}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
        +
        </a>
      </div>
    );
  }
}

Track.propTypes = {
  track: PropTypes.object, // TODO: change this to a shape
  onAdd: PropTypes.func.isRequired,
};

Track.defaultProps = {
  track: {},
};

export default Track;
