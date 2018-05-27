const InputDialog = ({ edit, open, selectedDate }) => (
  <Dialog
    title="Enter Information"
    actions={edit ? editCompActions : actions}
    modal={true}
    open={edit ? edit : open}
    className="modal"
  >
    {moment(this.state.selectedDate.start).day() === 1 &&
      aux === 5 && (
        <p style={{ margin: '10px 0 0 0' }}>
          P-Day: Ride needed in lieu of meal.
        </p>
      )}
    <InputContainer>
      <TextField
        style={{ width: '90%' }}
        hintText={aux === 5 ? 'Your Name' : 'Event Title'}
        id="title-input"
        onChange={event => this.setState({ meal_title: event.target.value })}
      />
      <TextField
        style={{ width: '90%' }}
        hintText="Description"
        multiLine
        id="desc-input"
        onChange={event => this.setState({ desc: event.target.value })}
      />
    </InputContainer>
  </Dialog>
);
