import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

const Header = ({ onClose, children }) => (
  <div className="wrc-dialog__header">
    <h4 className="wrc-dialog__title">{children}</h4>
    {!!onClose && (
      <Button status="link" className="wrc-dialog__button-close"
        onClick={onClose}>
        Close
      </Button>
    )}
  </div>
);

Header.propTypes = {
  onClose: PropTypes.func
};

export default Header;
