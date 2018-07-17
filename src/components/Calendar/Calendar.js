import React, { Component, Fragment } from 'react';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';

import Instructions from '../Instructions/Instructions';
import AuxSelect from './AuxSelect/AuxSelect';
import AuthInput from './AuthInput/AuthInput';
import MealInfoDialog from './MealInfoDialog/MealInfoDialog';
import InputDialog from './InputDialog/InputDialog';
import CancelDialog from './CancelDialog/CancelDialog';
import Modal from '../Modal/Modal';
import ErrorComponent from '../ErrorBoundary/Error';

import {
  Title,
  CalendarContainer,
  FlexedContainer
} from '../../styledComponents';

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
      enterAuth: false,
      didErr: false,
      meal_title: '',
      desc: '',
      snackMessage: '',
      aux: 5
    };
  }

  async componentDidMount() {
    const buttons = document.querySelectorAll('.rbc-btn-group');
    const buttonsToRemove = buttons[1].childNodes;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      buttonsToRemove.forEach(
        (button, idx) =>
          !idx || idx === 2
            ? (button.style.borderRadius = '5px')
            : (button.style.display = 'none')
      );
    } else {
      buttonsToRemove.forEach(
        (button, idx) =>
          idx
            ? (button.style.display = 'none')
            : (button.style.borderRadius = '5px')
      );
    }
    buttons[0].childNodes[0].click();
    buttons[0].childNodes[1].innerText = 'prev';
    try {
      const { data: events } = await axios('/api/events/5');
      this.setState({ events });
    } catch (err) {
      console.log(err);
      this.setState({ didErr: true });
    }
  }

  handleEventCancel = async () => {
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
  };

  handleEventEdit = async () => {
    const { meal_title, desc, selectedEvent, edit, openSnack } = this.state;

    const title = meal_title || selectedEvent.title;
    const meal_desc = desc || selectedEvent.desc;

    await axios.patch(`/api/event/${this.state.aux}/${selectedEvent.id}`, {
      title,
      meal_desc
    });
    const { data: events } = await axios.get(`/api/events/${this.state.aux}`);

    this.setState({
      edit: !edit,
      events,
      openSnack: !openSnack,
      snackMessage: 'Event Successfully Updated'
    });
  };

  handleEventSubmit = async () => {
    const {
      meal_title: title,
      desc: meal_desc,
      selectedDate: { start, end },
      aux
    } = this.state;
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
  };

  validateSelection = info => {
    const isBefore = moment(info.start).isBefore(moment().subtract(1, 'd'));

    if (isBefore) {
      this.setState({
        openSnack: true,
        snackMessage: 'This Day Has Passed'
      });
      return;
    }
    if (this.state.aux !== 6) {
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
    }
    return true;
  };

  handleSlotSelect = info => {
    const valid = this.validateSelection(info);
    if (valid) this.setState({ open: !this.state.open, selectedDate: info });
  };

  handleAuxChange = async (event, index, value) => {
    const { data: events } = await axios(`/api/events/${value}`);
    this.setState({ events, aux: value });
  };

  handleChildState = state => {
    this.setState(state);
  };

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
      authenticated,
      selectedDate,
      enterAuth,
      didErr
    } = this.state;
    return (
      <Fragment>
        <div>
          <Title>G1 Calendar</Title>
          <FlexedContainer id="break">
            <AuxSelect
              handleAuxChange={this.handleAuxChange}
              aux={aux}
              authenticated={authenticated}
            />
            {enterAuth && (
              <AuthInput
                authenticated={authenticated}
                handleChildState={this.handleChildState}
              />
            )}
            {!enterAuth && (
              <FlatButton
                label="Admin"
                primary={true}
                onClick={() => this.setState({ enterAuth: !enterAuth })}
              />
            )}
          </FlexedContainer>
        </div>
        <CalendarContainer>
          <BigCalendar
            events={events}
            selectable
            onSelectEvent={e =>
              this.handleChildState({
                editEvent: !this.state.editEvent,
                selectedEvent: e
              })
            }
            onSelectSlot={info => this.handleSlotSelect(info)}
            onSelecting={e => this.handleSelecting(e)}
            popup
            style={{ height: '50vh', width: '90vw', margin: '0 auto' }}
            id="calendar"
          />
        </CalendarContainer>
        <InputDialog
          edit={edit}
          open={open}
          selectedDate={selectedDate}
          handleChildState={this.handleChildState}
          handleEventEdit={this.handleEventEdit}
          handleEventSubmit={this.handleEventSubmit}
          editEvent={editEvent}
          aux={aux}
        />
        <MealInfoDialog
          selectedEvent={selectedEvent}
          aux={aux}
          authenticated={authenticated}
          editEvent={editEvent}
          handleChildState={this.handleChildState}
          edit={edit}
        />
        <CancelDialog
          cancellation={cancellation}
          aux={aux}
          selectedEvent={selectedEvent}
          handleChildState={this.handleChildState}
          handleEventCancel={this.handleEventCancel}
        />
        <Snackbar
          open={openSnack}
          message={snackMessage}
          autoHideDuration={3000}
          onRequestClose={() => this.setState({ openSnack: !openSnack })}
        />
        <Instructions isAuthenticated={authenticated} />
        {didErr && (
          <Modal>
            <div
              style={{
                height: '100vh',
                width: '100vw',
                position: 'absolute',
                top: '0',
                left: '0',
                zIndex: '100'
              }}
            >
              <ErrorComponent />
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default Calendar;
