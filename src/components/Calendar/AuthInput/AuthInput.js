import React, { Fragment } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const AuthInput = (authenticated, pass, handleChildState) => {
  return !authenticated ? (
    <Fragment>
      <TextField
        onChange={({ target }) => handleChildState({ pass: target.value })}
        id="pass"
        style={{ marginRight: '15px' }}
        hintText="Auxillary Leader Password"
      />
      <RaisedButton
        id="pass"
        primary={true}
        label={'Submit'}
        onClick={() =>
          pass === process.env.REACT_APP_PASS
            ? handleChildState({ authenticated: true })
            : (document.getElementById('pass').style.border = '2px solid red')
        }
      />
    </Fragment>
  ) : (
    <p>You May Now Make Edits</p>
  );
};

export default AuthInput;
