import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';

import EditActions from '../Actions/EditActions';

const MealInfoDialog = ({
  selectedEvent,
  aux,
  authenticated,
  editEvent,
  handleChildState,
  cancellation,
  edit
}) => (
  <Dialog
    title={
      aux === 5
        ? moment(selectedEvent.start).day() !== 1
          ? 'Meal Information'
          : 'Ride Information'
        : 'Activity Information'
    }
    actions={
      aux === 5 || authenticated ? (
        <EditActions
          cancellation={cancellation}
          handleChildState={handleChildState}
          editEvent={editEvent}
          edit={edit}
        />
      ) : (
        [
          <FlatButton
            label="Exit"
            primary={true}
            onClick={() =>
              handleChildState({ editEvent: !editEvent, selectedEvent: {} })
            }
          />
        ]
      )
    }
    modal={true}
    open={editEvent}
    className="modal"
  >
    {aux === 5 ? (
      moment(selectedEvent.start).day() !== 1 && selectedEvent.title ? (
        <p>
          Dinner will be provided by{' '}
          {selectedEvent.title.endsWith("'s") ||
          selectedEvent.title.endsWith("s'") ||
          selectedEvent.title.endsWith('es')
            ? `the ${selectedEvent.title}`
            : selectedEvent.title}
        </p>
      ) : (
        moment(selectedEvent.start).day() === 1 &&
        selectedEvent.title && (
          <p>
            Your ride will be provided by{' '}
            {selectedEvent.title.endsWith("'s") ||
            selectedEvent.title.endsWith("s'") ||
            selectedEvent.title.endsWith('es')
              ? `the ${selectedEvent.title}`
              : selectedEvent.title}{' '}
          </p>
        )
      )
    ) : (
      <p>Activity Title: {selectedEvent.title}</p>
    )}
    {aux === 5 ? (
      <p>
        They left the following instructions: {selectedEvent.desc || 'None'}
      </p>
    ) : (
      <p>Activity Description: {selectedEvent.desc || 'None'}</p>
    )}
  </Dialog>
);

MealInfoDialog.propTypes = {
  selectedEvent: PropTypes.object,
  aux: PropTypes.number,
  authenticated: PropTypes.bool,
  editEvent: PropTypes.bool,
  handleChildState: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  cancellation: PropTypes.bool
};

export default MealInfoDialog;
