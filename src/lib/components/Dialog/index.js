import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Overlay from './Overlay';
import Container from './Container';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';


/**
 * Dialog is component for modals realization
 */
export default class Dialog extends Component {
  static propTypes = {
    /** is dialog open */
    isOpen: PropTypes.bool,
    /** Callback for onOpen */
    onOpen: PropTypes.func,
    /** Callback for onClose */
    onClose: PropTypes.func,
    /** Dialog width */
    size: PropTypes.oneOf(['small', 'default', 'large'])
  }

  state = {
    isOpen: false,
  }

  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });
  /**
   * Hide scroll when dialog is open
   * @param {object} nextProps component props
   */
  componentWillReceiveProps(nextProps) {
    document.body.classList.toggle('body--with-dialog', nextProps.isOpen);

    if (!this.props.isOpen && !!nextProps.isOpen && (typeof nextProps.onOpen === 'function')) {
      nextProps.onOpen(nextProps);
    }
  }

  get isOpen() {
    const { isOpen } = this.props;
    return isOpen === undefined ? this.state.isOpen : isOpen;
  }

  get onClose() {
    const { onClose } = this.props;
    return onClose === undefined ? this.close : onClose;
  }

  render() {
    return (
      <Overlay {...this.props} isOpen={this.isOpen} onClose={this.onClose}>
        <Container {...this.props} isOpen={this.isOpen} onClose={this.onClose}>
        </Container>
      </Overlay>
    );
  }
  static Header = Header;
  static Body = Body;
  static Footer = Footer;
}
