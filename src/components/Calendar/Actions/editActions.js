import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const EditActions = ({ handleChildState, editEvent, cancellation, edit }) => [
  <FlatButton
    label="Exit"
    primary={true}
    onClick={() =>
      handleChildState({ editEvent: !editEvent, selectedEvent: {} })
    }
    key="exit"
  />,
  <FlatButton
    label="Cancel"
    secondary={true}
    onClick={() =>
      handleChildState({
        editEvent: !editEvent,
        cancellation: !cancellation
      })
    }
    key="cancel"
  />,
  <FlatButton
    label="Edit"
    primary={true}
    onClick={() => handleChildState({ edit: !edit, editEvent: !editEvent })}
    key="edit"
  />
];

export default EditActions;
