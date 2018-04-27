import Chance from 'chance';
import Playlist from './Playlist';
import React from 'react';
import { expect } from '../../util/chai';
import { shallow } from 'enzyme';

const chance = new Chance();

describe('Playlist', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      playlistName: chance.name(),
      playlist: chance.n(chance.word, 7),
      onRemoval: () => {},
      onSave: () => {},
      onNameChange: () => {},
    };
    wrapper = shallow(<Playlist
      playlist={props.playlist}
      playlistName={props.playlistName}
    />);
  });

  it('should have a playlist of songs', () => {
    expect(wrapper.find('div')).to.have.className('Playlist');
  });

  // it('should update input to the correct value', () => {
  //   const inputText = chance.word();
  //   wrapper.instance().handleNameChange(inputText);
  //   expect(wrapper).to.have.state('playListName').to.equal(inputText);
  // });
});
