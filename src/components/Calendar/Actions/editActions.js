import React from 'react';
import PropTypes from 'prop-types';
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

EditActions.propTypes = {
  handleChildState: PropTypes.func.isRequired,
  editEvent: PropTypes.bool,
  cancellation: PropTypes.bool,
  edit: PropTypes.bool
};

export default EditActions;
