const AuxSelect = ({ authenticated, handleAuxChange }) => {
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

export default AuxSelect;
