import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
const Textarea = forwardRef(({ className, invalid, ...inputProps }, ref) => (
  <textarea {...inputProps} className={classnames('wrc-textarea', className, {
    'wrc-textarea--invalid': !!invalid,
    [`${className}--invalid`]: !!className && !!invalid,
  })} ref={ref} />
));

Textarea.propTypes = {
  invalid: PropTypes.bool,
}


export default Textarea;
