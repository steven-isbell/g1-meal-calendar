import React, { Component, Fragment } from "react";
import axios from "axios";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";

import Instructions from "../Instructions/Instructions";
import ImageLoader from "../ImageLoader/ImageLoader";
import {
  Title,
  CalendarContainer,
  InputContainer
} from "../../styledComponents";
import missionaries from "../../assets/missionarymeal.jpg";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

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
      openSnack: false,
      cancellation: false
    };
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.handleEventCancel = this.handleEventCancel.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
    this.validateSelection = this.validateSelection.bind(this);
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
    buttons[0].childNodes[1].innerText = "prev";
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
      cancellation: !this.state.cancellation,
      openSnack: !this.state.openSnack,
      snackMessage: "Cancellation Successful"
    });
  }

  handleEventSelect(event) {
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

  validateSelection(info) {
    const isBefore = moment(info.start).isBefore(moment().subtract(1, "d"));

    if (isBefore) {
      this.setState({
        openSnack: true,
        snackMessage: "This Day Has Passed"
      });
      return;
    }

    const exists = this.state.events.findIndex(event =>
      moment(info.end).isSame(moment(event.start))
    );

    if (exists !== -1) {
      this.setState({
        openSnack: true,
        snackMessage: "Date Taken. Please Choose Another."
      });
      return;
    }
    return true;
  }

  handleSlotSelect(info) {
    const valid = this.validateSelection(info);
    if (valid) this.setState({ open: !this.state.open, selectedDate: info });
  }

  render() {
    const {
      open,
      editEvent,
      selectedEvent,
      events,
      edit,
      openSnack,
      snackMessage,
      cancellation
    } = this.state;

    const actions = [
      <FlatButton
        label="Exit"
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
        label="Exit"
        primary={true}
        onClick={() =>
          this.setState({ editEvent: !editEvent, selectedEvent: {} })
        }
      />,
      <FlatButton
        label="Cancel Meal"
        secondary={true}
        onClick={() =>
          this.setState({
            editEvent: !editEvent,
            cancellation: !cancellation
          })
        }
      />,
      <FlatButton
        label="Edit Meal"
        primary={true}
        onClick={() => this.setState({ edit: !edit })}
      />
    ];

    const editCompActions = [
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
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleEventEdit}
      />
    ];

    const cancelActions = [
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
      <FlatButton
        label="Yes"
        secondary={true}
        onClick={this.handleEventCancel}
      />
    ];

    const inputDialog = (
      <Dialog
        title="Enter Information"
        actions={edit ? editCompActions : actions}
        modal={true}
        open={edit ? edit : open}
        className="modal"
      >
        {moment(this.state.selectedDate.start).day() === 1 && (
          <p style={{ margin: "10px 0 0 0" }}>
            P-Day: Ride needed in lieu of meal.
          </p>
        )}
        <InputContainer>
          <TextField
            style={{ width: "90%" }}
            hintText="Your Name"
            id="title-input"
            onChange={event =>
              this.setState({ meal_title: event.target.value })
            }
          />
          <TextField
            style={{ width: "90%" }}
            hintText="Time, Place, Etc."
            floatingLabelText="Information"
            floatingLabelFixed={true}
            multiLine
            id="desc-input"
            onChange={event => this.setState({ desc: event.target.value })}
          />
        </InputContainer>
      </Dialog>
    );

    const cancelDialog = (
      <Dialog
        title="Are You Sure?"
        open={cancellation}
        actions={cancelActions}
        modal={true}
        className="modal"
      >
        <div className="flex">
          <ImageLoader srcLoaded={missionaries} />
          <p>A Hungry Missionary Is A Sad Missionary</p>
          {moment(new Date())
            .add(24, "hours")
            .isAfter(selectedEvent.start) && (
            <p>
              It is less than 24 hours until this appointment; if cancelling,
              please inform the missionaries or WML.
            </p>
          )}
        </div>
      </Dialog>
    );

    const mealInfoDialog = (
      <Dialog
        title={
          moment(this.state.selectedDate.start).day() !== 1
            ? "Meal Information"
            : "Ride Information"
        }
        actions={editActions}
        modal={true}
        open={editEvent}
        className="modal"
      >
        {selectedEvent.title &&
          moment(this.state.selectedDate.start).day() !== 1 && (
            <p>
              Dinner will be provided by{" "}
              {selectedEvent.title.endsWith("'s") ||
              selectedEvent.title.endsWith("s'") ||
              selectedEvent.title.endsWith("es")
                ? `the ${selectedEvent.title}`
                : selectedEvent.title}
            </p>
          )}
        {moment(this.state.selectedDate.start).day() === 1 && (
          <p>
            Your ride will be provided by{" "}
            {selectedEvent.title.endsWith("'s") ||
            selectedEvent.title.endsWith("s'") ||
            selectedEvent.title.endsWith("es")
              ? `the ${selectedEvent.title}`
              : selectedEvent.title}{" "}
          </p>
        )}
        <p>They left the following instructions: {selectedEvent.desc}</p>
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
            id="calendar"
          />
        </CalendarContainer>
        {inputDialog}
        {!edit ? mealInfoDialog : inputDialog}
        {cancelDialog}
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
