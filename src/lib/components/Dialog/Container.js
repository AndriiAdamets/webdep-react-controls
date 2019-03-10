import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Container extends Component {
  static propTypes = {
    size: PropTypes.oneOf(['small', 'default', 'large'])
  };

  static defaultProps = {
    size: 'default'
  };

  render() {
    const { children, size, className } = this.props;
    return (
      <ReactCSSTransitionGroup
        transitionName="dialog"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        <div className={classnames('wrc-dialog', `wrc-dialog--${size}`, className)}
          key="dialog-container">
          {children}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
