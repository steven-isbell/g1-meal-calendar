import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

const Actions = ({ handleChildState, handleEventSubmit, open }) => [
  <FlatButton
    label="Exit"
    primary={true}
    onClick={() => handleChildState({ open: !open })}
    key="exit"
  />,
  <FlatButton
    label="Submit"
    primary={true}
    onClick={handleEventSubmit}
    key="submit"
  />
];

Actions.propTypes = {
  handleChildState: PropTypes.func.isRequired,
  handleEventSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default Actions;
