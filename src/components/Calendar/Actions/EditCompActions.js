import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const EditCompActions = ({
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
    key="exit"
  />,
  <FlatButton
    label="Submit"
    primary={true}
    onClick={handleEventEdit}
    key="submit"
  />
];

export default EditCompActions;
