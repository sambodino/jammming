import React from 'react';
import Chance from 'chance';
import { mount } from 'enzyme';
import Playlist from './Playlist';

const chance = new Chance();

describe('Playlist', () => {
  let props;
  let mountedPlaylist;
  const playlist = () => {
    if (!mountedPlaylist) {
      mountedPlaylist = mount(<Playlist {...props} />);
    }
    return mountedPlaylist;
  };

  beforeEach(() => {
    props = {
      playlistName: chance.name(),
      playlist: [chance.word(), chance.word()],
      onRemoval: () => {},
      onSave: () => {},
      onNameChange: () => {},
    };
    mountedPlaylist = undefined;
  });

  it('renders a div', () => {
    const divs = playlist().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
});
