import React from 'react';
import PropTypes from 'prop-types';

export default function VideoCard({ src }) {
  return (<iframe
    data-testid="video"
    width="340"
    height="250"
    src={ src }
    title="YouTube video player"
  />);
}
VideoCard.propTypes = {
  src: PropTypes.string,
}.isRequired;
