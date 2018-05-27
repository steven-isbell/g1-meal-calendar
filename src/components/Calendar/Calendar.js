import React, { Component, Fragment } from 'react';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import Instructions from '../Instructions/Instructions';
import ImageLoader from '../ImageLoader/ImageLoader';
import {
  Title,
  CalendarContainer,
  InputContainer,
  FlexedContainer
} from '../../styledComponents';
import missionaries from '../../assets/missionarymeal.jpg';
import AuxSelect from './AuxSelect/AuxSelect';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      selectedEvent: {},
      selectedDate: {},
      open: false,
      editEvent: false,
      edit: false,
      loading: false,
      openSnack: false,
      cancellation: false,
      authenticated: false,
      pass: '',
      meal_title: '',
      desc: '',
      snackMessage: '',
      aux: 5
    };

    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.handleEventCancel = this.handleEventCancel.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
    this.validateSelection = this.validateSelection.bind(this);
    this.handleAuxChange = this.handleAuxChange.bind(this);
  }

  async componentDidMount() {
    const buttons = document.querySelectorAll('.rbc-btn-group');
    const buttonsToRemove = buttons[1].childNodes;
    buttonsToRemove.forEach(
      (button, idx) =>
        idx
          ? (button.style.display = 'none')
          : (button.style.borderRadius = '5px')
    );
    buttons[0].childNodes[0].click();
    buttons[0].childNodes[1].innerText = 'prev';
    try {
      const { data: events } = await axios('/api/events/5');
      this.setState({ events });
    } catch (err) {
      console.error(err);
    }
  }

  async handleEventCancel() {
    await axios.delete(
      `/api/event/${this.state.aux}/${this.state.selectedEvent.id}`
    );
    const { data: events } = await axios.get(`/api/events/${this.state.aux}`);
    this.setState({
      events,
      cancellation: !this.state.cancellation,
      openSnack: !this.state.openSnack,
      snackMessage: 'Cancellation Successful'
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

    await axios.patch(`/api/event/${selectedEvent.id}`, {
      title,
      meal_desc
    });
    const { data: events } = await axios.get(`/api/events/${this.state.aux}`);

    this.setState({
      edit: !edit,
      editEvent: !editEvent,
      events,
      openSnack: !openSnack,
      snackMessage: 'Event Successfully Updated'
    });
  }

  async handleEventSubmit() {
    const title = document.getElementById('title-input').value;
    const meal_desc = document.getElementById('desc-input').value;
    const { start, end } = this.state.selectedDate;
    const { aux } = this.state;
    const { data: events } = await axios.post('/api/events', {
      title,
      meal_desc,
      start,
      end,
      aux
    });
    this.setState({
      events,
      open: !this.state.open,
      openSnack: !this.state.openSnack,
      snackMessage: 'Signup Successful!'
    });
  }

  validateSelection(info) {
    const isBefore = moment(info.start).isBefore(moment().subtract(1, 'd'));

    if (isBefore) {
      this.setState({
        openSnack: true,
        snackMessage: 'This Day Has Passed'
      });
      return;
    }

    const exists = this.state.events.findIndex(event =>
      moment(info.end).isSame(moment(event.start))
    );

    if (exists !== -1) {
      this.setState({
        openSnack: true,
        snackMessage: 'Date Taken. Please Choose Another.'
      });
      return;
    }
    return true;
  }

  handleSlotSelect(info) {
    const valid = this.validateSelection(info);
    if (valid) this.setState({ open: !this.state.open, selectedDate: info });
  }

  async handleAuxChange(event, index, value) {
    const { data: events } = await axios(`/api/events/${value}`);
    this.setState({ events, aux: value });
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
      cancellation,
      aux,
      authenticated
    } = this.state;

    return (
      <Fragment>
        <div>
          <Title>G1 Calendar</Title>
          <FlexedContainer id="break">
            <AuxSelect
              authenticated={authenticated}
              handleAuxChange={this.handleAuxChange}
            />
            {!authenticated ? (
              <Fragment>
                <TextField
                  onChange={({ target }) =>
                    this.setState({ pass: target.value })
                  }
                  id="pass"
                  style={{ marginRight: '15px' }}
                  hintText="Auxillary Leader Password"
                />
                <RaisedButton
                  id="pass"
                  primary={true}
                  label={'Submit'}
                  onClick={() =>
                    this.state.pass === process.env.REACT_APP_PASS
                      ? this.setState({ authenticated: true })
                      : (document.getElementById('pass').style.border =
                          '2px solid red')
                  }
                />
              </Fragment>
            ) : (
              <p>You May Now Make Edits</p>
            )}
          </FlexedContainer>
        </div>
        <CalendarContainer>
          <BigCalendar
            events={events}
            selectable
            onSelectEvent={e => this.handleEventSelect(e)}
            onSelectSlot={info => this.handleSlotSelect(info)}
            onSelecting={e => this.handleSelecting(e)}
            popup
            style={{ height: '50vh', width: '90vw', margin: '0 auto' }}
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
        <Instructions isAuthenticated={authenticated} />
      </Fragment>
    );
  }
}

export default Calendar;
