import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class AuthInput extends Component {
  state = { pass: '' };
  handleAuthCheck = () => {
    if (this.state.pass === process.env.REACT_APP_PASS) {
      this.props.handleChildState({ authenticated: true });
    } else {
      this.passInput.input.style.border = '2px solid red';
    }
  };
  render() {
    console.log(this.passInput);
    const { authenticated } = this.props;
    return !authenticated ? (
      <Fragment>
        <TextField
          onChange={({ target }) => this.setState({ pass: target.value })}
          id="pass"
          style={{ marginRight: '15px' }}
          hintText="Auxiliary Leader Password"
          ref={node => (this.passInput = node)}
          onKeyPress={e => e.key === 'Enter' && this.handleAuthCheck(e)}
        />
        <RaisedButton
          id="pass"
          primary={true}
          label={'Submit'}
          onClick={this.handleAuthCheck}
        />
      </Fragment>
    ) : (
      <p>You May Now Make Edits</p>
    );
  }
}

// const AuthInput = ({ authenticated }) => {
//   return !authenticated ? (
//     <Fragment>
//       <TextField
//         onChange={({ target }) => handleChildState({ pass: target.value })}
//         id="pass"
//         style={{ marginRight: '15px' }}
//         hintText="Auxiliary Leader Password"
//       />
//       <RaisedButton
//         id="pass"
//         primary={true}
//         label={'Submit'}
//         onClick={() =>
//           pass === process.env.REACT_APP_PASS
//             ? handleChildState({ authenticated: true })
//             : (document.getElementById('pass').style.border = '2px solid red')
//         }
//       />
//     </Fragment>
//   ) : (
//     <p>You May Now Make Edits</p>
//   );
// };

AuthInput.propTypes = {
  authenticated: PropTypes.bool,
  handleChildState: PropTypes.func.isRequired
};

export default AuthInput;
