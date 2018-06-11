import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

const CancelActions = ({
  handleEventCancel,
  handleChildState,
  cancellation
}) => [
  <FlatButton
    label="No"
    primary={true}
    onClick={() =>
      handleChildState({
        cancellation: !cancellation,
        selectedEvent: {}
      })
    }
    key="No"
  />,
  <FlatButton
    label="Yes"
    secondary={true}
    onClick={handleEventCancel}
    key="Yes"
  />
];

CancelActions.propTypes = {
  handleEventCancel: PropTypes.func.isRequired,
  handleChildState: PropTypes.func.isRequired,
  cancellation: PropTypes.bool
};

export default CancelActions;
