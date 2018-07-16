import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const AuxSelect = ({ aux, authenticated, handleAuxChange }) => {
  return (
    <SelectField
      onChange={handleAuxChange}
      value={aux}
      style={{ marginRight: '15px' }}
    >
      <MenuItem value={5} primaryText="Missionary Meals" />
      <MenuItem value={6} primaryText="Missionary Splits" />
      {authenticated && (
        <Fragment>
          <MenuItem value={1} primaryText="Elders Quorum" />
          <MenuItem value={4} primaryText="Relief Society" />
          <MenuItem value={3} primaryText="Young Men" />
          <MenuItem value={2} primaryText="Young Women" />
        </Fragment>
      )}
    </SelectField>
  );
};

AuxSelect.propTypes = {
  aux: PropTypes.number,
  authenticated: PropTypes.bool,
  handleAuxChange: PropTypes.func.isRequired
};

export default AuxSelect;
