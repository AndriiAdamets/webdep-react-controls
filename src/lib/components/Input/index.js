import React, { forwardRef } from 'react';
import classnames from 'classnames';
const Input = ({ className, invalid, formControl, ...inputProps }, ref) => (
  <input {...inputProps} className={classnames('wrc-input', {
    'wrc-input--invalid': !!invalid
  })} ref={ref} />
);

export default forwardRef(Input);