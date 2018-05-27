import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const EditActions = (handleChildState, editEvent, cancellation) => [
  <FlatButton
    label="Exit"
    primary={true}
    onClick={() =>
      handleChildState({ editEvent: !editEvent, selectedEvent: {} })
    }
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
  />,
  <FlatButton
    label="Edit"
    primary={true}
    onClick={() => handleChildState({ edit: !edit })}
  />
];
