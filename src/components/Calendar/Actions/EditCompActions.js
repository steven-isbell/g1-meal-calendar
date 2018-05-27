const EditCompActions = () => [
  <FlatButton
    label="Exit"
    primary={true}
    onClick={() =>
      this.setState({
        editEvent: !editEvent,
        edit: !edit,
        selectedEvent: {}
      })
    }
  />,
  <FlatButton label="Submit" primary={true} onClick={this.handleEventEdit} />
];

export default EditCompActions;
