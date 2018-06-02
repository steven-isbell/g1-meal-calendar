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
    key={1}
  />,
  <FlatButton
    label="Yes"
    secondary={true}
    onClick={handleEventCancel}
    key={2}
  />
];

export default CancelActions;
