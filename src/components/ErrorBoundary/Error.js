import React from 'react';
import PropTypes from 'prop-types';

import ImageLoader from '../ImageLoader/ImageLoader';
import hotdog from '../../assets/running_hotdog.gif';

const ErrorBoundaryFallbackComponent = ({ componentStack, error }) => (
  <div>
    <ImageLoader
      srcLoaded={hotdog}
      style={{ height: '100vh', width: '100vw' }}
    />
    <div
      style={{
        width: '250px',
        position: 'absolute',
        top: '30vh',
        left: '15vw',
        zIndex: '100'
      }}
    >
      <p>
        We ran into an error, please refresh the page or click{' '}
        <a href="https://g1-meals.now.sh">here.</a> If the issue persists,
        please try again later.
      </p>
    </div>
  </div>
);

ErrorBoundaryFallbackComponent.propTypes = {
  componentStack: PropTypes.string,
  error: PropTypes.object
};

export default ErrorBoundaryFallbackComponent;
