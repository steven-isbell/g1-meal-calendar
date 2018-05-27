const CancelActions = [
  <FlatButton
    label="No"
    primary={true}
    onClick={() =>
      this.setState({
        cancellation: !cancellation,
        selectedEvent: {}
      })
    }
  />,
  <FlatButton label="Yes" secondary={true} onClick={this.handleEventCancel} />
];

export default CancelActions;
