import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class ModalOverlay extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.overlay = createRef();
  }

  get dom() {
    const { isOpen, children } = this.props;
    if (!isOpen) {
      return null;
    }

    return (
      <div className="wrc-dialog-overlay" key="dialog-overlay"
        ref={this.overlay}
        onDoubleClick={this.handleDBClick}>{children}</div>
    );
  }

  componentWillReceiveProps({ isOpen }) {
    if (isOpen) {
      document.body.classList.add('body-with-open-modal');
      document.addEventListener('keydown', this.handleKeydown);
      document.addEventListener('touchmove', this.handleDisableScrollTablet);
    } else {
      document.body.classList.remove('body-with-open-modal');
      document.removeEventListener('keydown', this.handleKeydown);
      document.removeEventListener('touchmove', this.handleDisableScrollTablet);
    }
  }

  handleKeydown = ({ key }) => {
    const { onClose } = this.props;
    if (key === 'Escape') {
      onClose();
    }
  }

  handleDisableScrollTablet = (e) => {
    e.preventDefault();
  }

  handleDBClick = ({ target }) => {
    const { onClose } = this.props;
    if (target === this.overlay.current) {
      onClose();
    }
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="dialog"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        {this.dom}
      </ReactCSSTransitionGroup>
    );
  }
}
