import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
/** Badge component */
const Badge = forwardRef(({children, likePill, className, state}, ref) => (
  <div ref={ref} className={classnames('wrc-badge', `wrc-badge--${state}`, {
    ['wrc-badge--pill']: !!likePill,
  }, className)}>
    {children}
  </div>
));

Badge.propTypes = {
  /** Badge content */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  /** Bange background */
  state: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']),
  /** Is badge looks like pill (with rounded angles) */
  likePill: PropTypes.bool,
  /** Addition className */
  className: PropTypes.string,
};

Badge.defaultProps = {
  state: 'secondary',
  likePill: false,
}

export default Badge;