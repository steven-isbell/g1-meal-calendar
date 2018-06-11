import React from 'react';
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

export default Actions;
