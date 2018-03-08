import React, { Component, Fragment } from "react";
import axios from "axios";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import styled from "styled-components";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

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
      title: "",
      desc: ""
    };
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
  }
  async componentDidMount() {
    try {
      const res = await axios("/api/getEvents");
      this.setState({ events: res.data });
    } catch (err) {
      console.error(err);
    }
  }
  handleEventSelect(event) {
    console.log(event);
    this.setState({ editEvent: !this.state.editEvent, selectedEvent: event });
  }
  async handleEventSubmit() {
    const title = document.getElementById("title-input").value;
    const meal_desc = document.getElementById("desc-input").value;
    const { start, end } = this.state.selectedDate;

    const res = await axios.post("/api/addEvent", {
      title,
      meal_desc,
      start,
      end
    });
    this.setState({ events: res.data, open: !this.state.open });
  }
  handleEventEdit() {}
  handleSlotSelect(info) {
    console.log(info);
    this.setState({ open: !this.state.open, selectedDate: info });
  }
  render() {
    const { open, editEvent, selectedEvent, events, edit } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
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
        label="Cancel"
        primary={true}
        onClick={() => this.setState({ editEvent: !editEvent })}
      />,
      <FlatButton
        label="Edit Event"
        primary={true}
        onClick={() => this.setState({ edit: !edit })}
      />
    ];
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
            style={{ height: "50vh" }}
          />
        </CalendarContainer>
        <Dialog
          title="Enter Information"
          actions={actions}
          modal={true}
          open={open}
        >
          <InputContainer>
            <TextField
              style={{ width: "50%" }}
              hintText="Your Name"
              id="title-input"
            />
            <TextField
              style={{ width: "50%" }}
              hintText="Instructions, directions, time, etc."
              floatingLabelText="Dinner Information"
              floatingLabelFixed={true}
              multiLine
              id="desc-input"
            />
          </InputContainer>
        </Dialog>
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
          <p>{selectedEvent.desc}</p>
        </Dialog>
      </Fragment>
    );
  }
}

export default Calendar;
