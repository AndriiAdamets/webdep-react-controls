import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { WRCThemeContext } from '../Theme';

const Textarea = forwardRef(({ className, invalid, ...inputProps }, ref) => {
  const { inputClassName } = (useContext(WRCThemeContext).theme.textarea || {});

  return (
    <textarea {...inputProps} className={classnames(inputClassName, className, {
      [`${inputClassName}--invalid`]: !!invalid,
      [`${className}--invalid`]: !!className && !!invalid,
    })} ref={ref} />
  );
});

Textarea.propTypes = {
  invalid: PropTypes.bool,
}


export default Textarea;
