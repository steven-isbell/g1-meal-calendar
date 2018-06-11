import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const AuxSelect = ({ aux, authenticated, handleAuxChange }) => {
  return (
    authenticated && (
      <SelectField
        onChange={handleAuxChange}
        value={aux}
        style={{ marginRight: '15px' }}
      >
        <MenuItem value={5} primaryText="Missionary" />
        <MenuItem value={1} primaryText="Elders Quorum" />
        <MenuItem value={4} primaryText="Relief Society" />
        <MenuItem value={3} primaryText="Young Men" />
        <MenuItem value={2} primaryText="Young Women" />
      </SelectField>
    )
  );
};

AuxSelect.propTypes = {
  aux: PropTypes.number,
  authenticated: PropTypes.bool,
  handleAuxChange: PropTypes.func.isRequired
};

export default AuxSelect;
