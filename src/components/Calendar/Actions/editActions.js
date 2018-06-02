import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const EditActions = ({ handleChildState, editEvent, cancellation, edit }) => [
  <FlatButton
    label="Exit"
    primary={true}
    onClick={() =>
      handleChildState({ editEvent: !editEvent, selectedEvent: {} })
    }
    key={1}
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
    key={2}
  />,
  <FlatButton
    label="Edit"
    primary={true}
    onClick={() => handleChildState({ edit: !edit })}
    key={3}
  />
];

export default EditActions;
