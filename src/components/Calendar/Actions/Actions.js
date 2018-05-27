import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const Actions = ({ handleChildState, handleEventSubmit, open }) => [
  <FlatButton
    label="Exit"
    primary={true}
    onClick={() => handleChildState({ open: !open })}
  />,
  <FlatButton label="Submit" primary={true} onClick={handleEventSubmit} />
];

export default Actions;
