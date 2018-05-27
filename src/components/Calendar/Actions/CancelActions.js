import React from 'react';
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
  />,
  <FlatButton label="Yes" secondary={true} onClick={handleEventCancel} />
];

export default CancelActions;
