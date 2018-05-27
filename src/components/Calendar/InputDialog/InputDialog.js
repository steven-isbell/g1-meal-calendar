import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import moment from 'moment';

import { InputContainer } from '../../../styledComponents';
import editCompActions from '../Actions/editCompActions';
import actions from '../Actions/actions';

const InputDialog = ({ edit, open, selectedDate, handleChildState }) => (
  <Dialog
    title="Enter Information"
    actions={edit ? editCompActions : actions}
    modal={true}
    open={edit ? edit : open}
    className="modal"
  >
    {moment(selectedDate.start).day() === 1 &&
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
        onChange={event => handleChildState({ meal_title: event.target.value })}
      />
      <TextField
        style={{ width: '90%' }}
        hintText="Description"
        multiLine
        id="desc-input"
        onChange={event => handleChildState({ desc: event.target.value })}
      />
    </InputContainer>
  </Dialog>
);
