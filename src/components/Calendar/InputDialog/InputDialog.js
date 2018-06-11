import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import moment from 'moment';

import { InputContainer } from '../../../styledComponents';
import EditCompActions from '../Actions/EditCompActions';
import Actions from '../Actions/Actions';

const InputDialog = ({
  edit,
  open,
  selectedDate,
  handleChildState,
  handleEventEdit,
  handleEventSubmit,
  editEvent,
  aux
}) => (
  <Dialog
    title="Enter Information"
    actions={
      edit ? (
        <EditCompActions
          handleChildState={handleChildState}
          handleEventEdit={handleEventEdit}
          editEvent={editEvent}
          edit={edit}
        />
      ) : (
        <Actions
          handleChildState={handleChildState}
          handleEventSubmit={handleEventSubmit}
          open={open}
        />
      )
    }
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

InputDialog.propTypes = {
  edit: PropTypes.bool,
  open: PropTypes.bool,
  editEvent: PropTypes.bool,
  selectedDate: PropTypes.object,
  handleChildState: PropTypes.func.isRequired,
  handleEventEdit: PropTypes.func.isRequired,
  handleEventSubmit: PropTypes.func.isRequired,
  aux: PropTypes.number
};

export default InputDialog;
