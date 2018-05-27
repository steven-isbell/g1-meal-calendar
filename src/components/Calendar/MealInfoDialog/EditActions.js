const EditActions = () => [
  <FlatButton
    label="Exit"
    primary={true}
    onClick={() => this.setState({ editEvent: !editEvent, selectedEvent: {} })}
  />,
  <FlatButton
    label="Cancel"
    secondary={true}
    onClick={() =>
      this.setState({
        editEvent: !editEvent,
        cancellation: !cancellation
      })
    }
  />,
  <FlatButton
    label="Edit"
    primary={true}
    onClick={() => this.setState({ edit: !edit })}
  />
];
