import React, { forwardRef } from 'react';
import classnames from 'classnames';
const Input = ({ className, invalid, ...inputProps }, ref) => (
  <input {...inputProps} className={classnames('wrc-input', {
    'wrc-input--invalid': !!invalid
  })} ref={ref} invalid={invalid} />
);

Input.defaultProps={
  invalid: false,
}

export default forwardRef(Input);
