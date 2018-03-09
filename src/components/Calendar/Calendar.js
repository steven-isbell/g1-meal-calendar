import React, { Component, Fragment } from "react";
import axios from "axios";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import styled from "styled-components";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";

import Instructions from "../Instructions/Instructions";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const CalendarContainer = styled.div`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 20px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      open: false,
      editEvent: false,
      edit: false,
      selectedDate: {},
      selectedEvent: {},
      meal_title: "",
      desc: "",
      loading: false,
      snackMessage: "",
      openSnack: false
    };
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.handleEventCancel = this.handleEventCancel.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
  }
  async componentDidMount() {
    const buttons = document.querySelectorAll(".rbc-btn-group");
    const buttonsToRemove = buttons[1].childNodes;
    buttonsToRemove.forEach(
      (button, idx) =>
        idx
          ? (button.style.display = "none")
          : (button.style.borderRadius = "5px")
    );
    buttons[0].childNodes[0].click();
    buttons[0].childNodes[1].innerText = "previous";
    try {
      const res = await axios("/api/events");
      this.setState({ events: res.data });
    } catch (err) {
      console.error(err);
    }
  }
  async handleEventCancel() {
    const res = await axios.delete(`/api/event/${this.state.selectedEvent.id}`);
    this.setState({
      events: res.data,
      editEvent: !this.state.editEvent,
      openSnack: !this.openSnack,
      snackMessage: "Cancellation Successful"
    });
  }
  handleEventSelect(event) {
    console.log(event);
    this.setState({ editEvent: !this.state.editEvent, selectedEvent: event });
  }
  async handleEventEdit() {
    const {
      meal_title,
      desc,
      selectedEvent,
      edit,
      openSnack,
      editEvent
    } = this.state;

    const title = meal_title || selectedEvent.title;
    const meal_desc = desc || selectedEvent.desc;

    const res = await axios.patch(`/api/event/${selectedEvent.id}`, {
      title,
      meal_desc
    });

    this.setState({
      edit: !edit,
      editEvent: !editEvent,
      events: res.data,
      openSnack: !openSnack,
      snackMessage: "Event Successfully Updated"
    });
  }
  async handleEventSubmit() {
    const title = document.getElementById("title-input").value;
    const meal_desc = document.getElementById("desc-input").value;
    const { start, end } = this.state.selectedDate;

    const res = await axios.post("/api/events", {
      title,
      meal_desc,
      start,
      end
    });
    this.setState({
      events: res.data,
      open: !this.state.open,
      openSnack: !this.state.openSnack,
      snackMessage: "Signup Successful!"
    });
  }
  handleSlotSelect(info) {
    const exists = this.state.events.findIndex(event =>
      moment(info.start).isSame(event.start)
    );
    if (exists !== -1) {
      this.setState({
        openSnack: true,
        snackMessage: "Date Taken. Please Choose Another."
      });
      return;
    }
    this.setState({ open: !this.state.open, selectedDate: info });
  }
  render() {
    const {
      open,
      editEvent,
      selectedEvent,
      events,
      edit,
      openSnack,
      snackMessage
    } = this.state;

    const actions = [
      <FlatButton
        label="NeverMind"
        primary={true}
        onClick={() => this.setState({ open: !open })}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleEventSubmit}
      />
    ];

    const editActions = [
      <FlatButton
        label="NeverMind"
        primary={true}
        onClick={() => this.setState({ editEvent: !editEvent })}
      />,
      <FlatButton
        label="Cancel Meal"
        primary={true}
        onClick={this.handleEventCancel}
      />,
      <FlatButton
        label="Edit Meal"
        primary={true}
        onClick={() => this.setState({ edit: !edit })}
      />
    ];

    const editCompActions = [
      <FlatButton
        label="NeverMind"
        primary={true}
        onClick={() => this.setState({ editEvent: !editEvent, edit: !edit })}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleEventEdit}
      />
    ];

    const inputDialog = (
      <Dialog
        title="Enter Information"
        actions={edit ? editCompActions : actions}
        modal={true}
        open={edit ? edit : open}
      >
        <InputContainer>
          <TextField
            style={{ width: "50%" }}
            hintText="Your Name"
            id="title-input"
            onChange={event =>
              this.setState({ meal_title: event.target.value })
            }
          />
          <TextField
            style={{ width: "50%" }}
            hintText="Instructions, directions, time, etc."
            floatingLabelText="Dinner Information"
            floatingLabelFixed={true}
            multiLine
            id="desc-input"
            onChange={event => this.setState({ desc: event.target.value })}
          />
        </InputContainer>
      </Dialog>
    );

    return (
      <Fragment>
        <Title>G1 Missionary Meal Calendar</Title>
        <CalendarContainer>
          <BigCalendar
            events={events}
            selectable
            onSelectEvent={e => this.handleEventSelect(e)}
            onSelectSlot={info => this.handleSlotSelect(info)}
            onSelecting={e => this.handleSelecting(e)}
            popup
            style={{ height: "50vh", width: "90vw", margin: "0 auto" }}
          />
        </CalendarContainer>
        {inputDialog}
        {!edit ? (
          <Dialog
            title="Meal Information"
            actions={editActions}
            modal={true}
            open={editEvent}
          >
            {selectedEvent.title && (
              <p>
                Dinner will be provided by{" "}
                {selectedEvent.title.endsWith("'s") ||
                selectedEvent.title.endsWith("s'") ||
                selectedEvent.title.endsWith("es")
                  ? `the ${selectedEvent.title}`
                  : selectedEvent.title}
              </p>
            )}
            <p>They left the following instructions: {selectedEvent.desc}</p>
          </Dialog>
        ) : (
          inputDialog
        )}
        <Snackbar
          open={openSnack}
          message={snackMessage}
          autoHideDuration={3000}
          onRequestClose={() => this.setState({ openSnack: !openSnack })}
        />
        <Instructions />
      </Fragment>
    );
  }
}

export default Calendar;
