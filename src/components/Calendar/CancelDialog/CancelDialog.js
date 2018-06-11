import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';

import CancelActions from '../Actions/CancelActions';

import ImageLoader from '../../ImageLoader/ImageLoader';
import missionaries from '../../../assets/missionarymeal.jpg';

const CancelDialog = ({
  cancellation,
  aux,
  selectedEvent,
  handleEventCancel,
  handleChildState
}) => (
  <Dialog
    title="Are You Sure?"
    open={cancellation}
    actions={
      <CancelActions
        handleEventCancel={handleEventCancel}
        handleChildState={handleChildState}
        cancellation={cancellation}
      />
    }
    modal={true}
    className="modal"
  >
    {aux === 5 && (
      <div className="flex">
        <ImageLoader srcLoaded={missionaries} />
        <p>A Hungry Missionary Is A Sad Missionary</p>
        {moment(new Date())
          .add(24, 'hours')
          .isAfter(selectedEvent.start) && (
          <p>
            It is less than 24 hours until this appointment; if cancelling,
            please inform the missionaries or WML.
          </p>
        )}
      </div>
    )}
  </Dialog>
);

CancelDialog.propTypes = {
  cancellation: PropTypes.bool,
  aux: PropTypes.number,
  selectedEvent: PropTypes.object,
  handleEventCancel: PropTypes.func.isRequired,
  handleChildState: PropTypes.func.isRequired
};

export default CancelDialog;
