const Actions = () => [
  <FlatButton
    label="Exit"
    primary={true}
    onClick={() => this.setState({ open: !open })}
  />,
  <FlatButton label="Submit" primary={true} onClick={this.handleEventSubmit} />
];

export default Actions;
