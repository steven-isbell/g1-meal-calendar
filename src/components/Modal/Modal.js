import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({ children }) => {
  return createPortal(children, document.getElementById('portal'));
};

Modal.propTypes = {
  children: PropTypes.node.isRequired
};

export default Modal;
