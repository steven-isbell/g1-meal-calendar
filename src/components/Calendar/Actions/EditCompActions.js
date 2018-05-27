import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const editCompActions = ({
  handleChildState,
  editEvent,
  edit,
  handleEventEdit
}) => [
  <FlatButton
    label="Exit"
    primary={true}
    onClick={() =>
      handleChildState({
        editEvent: !editEvent,
        edit: !edit,
        selectedEvent: {}
      })
    }
  />,
  <FlatButton label="Submit" primary={true} onClick={handleEventEdit} />
];

export default editCompActions;
