import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal, } from 'react-dom';
import classnames from 'classnames';

import getPortalContainer from '../../helpers/getPortalContainer';
import getElementCouplingPoint from '../../helpers/getElementCouplingPoint';
/**
 * Component add tooltip to its children on hover
 */
export default class Tooltip extends Component {
  // TODO: Make tooltip visible from props; Add tests for components with createPortal
  static propTypes = {
    /** Is tooltip on top or on bottom from target */
    position: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
    /** Tooltip background color */
    state: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']),
    /** Tooltip message */
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
    bodyStyle: PropTypes.object,
  };

  static defaultProps = {
    position: 'top',
    state: 'dark',
  };

  state = {
    isTooltipVisible: false
  };

  get bodyPosition() {
    if (!this.trigger) {
      return {};
    }
    const {left, top } = getElementCouplingPoint(this.trigger, this.props.position);
    return { left, top, };
  }

  get content() {
    const { body } = this.props;
    if (typeof body === 'string') {
      return (
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
      );
    }
    return body;
  }

  get body() {
    const { body, state, position, bodyStyle } = this.props;
    const { isTooltipVisible } = this.state;

    if (!!body && (!!isTooltipVisible)) {
      return createPortal(
        (<div ref={(div) => this.tooltipBody = div}
          role="tooltip"
          className={classnames(
            'wrc-tooltip__body',
            [`wrc-tooltip__body--${state}`],
            [`wrc-tooltip__body--${position}`]
          )}
          style={{ ...this.bodyPosition, ...bodyStyle }}>
          {this.content}
        </div >),
        getPortalContainer()
      );
    }
    return null;
  }

  handleMouseEnter = () => {
    this.setState({ isTooltipVisible: true });
  }

  handleMouseLeave = () => {
    this.setState({ isTooltipVisible: false });
  }

  render() {
    const { children, className, style, visible } = this.props;
    return (
      <div className={classnames('wrc-tooltip', className)} style={style}
        ref={div => this.trigger = div}
        onMouseEnter={(visible === undefined) ? this.handleMouseEnter : undefined}
        onMouseLeave={(visible === undefined) ? this.handleMouseLeave : undefined}>
        {children}
        {this.body}
      </div>
    );
  }
}

