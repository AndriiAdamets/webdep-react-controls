import React, { forwardRef } from 'react';
import classnames from 'classnames';
const Caret = forwardRef(({light}, ref) => (
  <div ref={ref} className={classnames('wrc-caret', {['wrc-caret--light']: !!light})}></div>
));

export default Caret;