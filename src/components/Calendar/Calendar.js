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
      selectedDate: {},
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
    console.log("FIRST", event);
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
  handleSlotSelect(info) {
    console.log(info);
    this.setState({ open: !this.state.open, selectedDate: info });
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.setState({ open: !this.state.open })}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleEventSubmit}
      />
    ];
    return (
      <Fragment>
        <Title>G1 Missionary Meal Calendar</Title>
        <CalendarContainer>
          <BigCalendar
            events={this.state.events}
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
          open={this.state.open}
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
      </Fragment>
    );
  }
}

export default Calendar;
