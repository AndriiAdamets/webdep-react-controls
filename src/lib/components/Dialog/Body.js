import React from 'react';
import classnames from 'classnames';

const Body = ({ children, form, style }) => (
  <div className={classnames('wrc-dialog__body', { 'wrc-dialog__body--form': !!form })}
    style={style}>
    {children}
  </div>
);

export default Body;