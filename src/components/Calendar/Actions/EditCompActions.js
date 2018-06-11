import React from 'react';
import PropTypes from 'prop-types';
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

EditCompActions.propTypes = {
  handleChildState: PropTypes.func.isRequired,
  handleEventEdit: PropTypes.func,
  editEvent: PropTypes.bool,
  edit: PropTypes.bool
};

export default EditCompActions;
