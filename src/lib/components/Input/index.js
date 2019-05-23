import React, { forwardRef } from 'react';
import classnames from 'classnames';
const Input = ({ className, invalid, ...inputProps }, ref) => (
  <input {...inputProps} className={classnames('wrc-input', className, {
    'wrc-input--invalid': !!invalid,
    [`${className}--invalid`]: !!className && !!invalid,
  })} ref={ref} />
);


export default forwardRef(Input);
