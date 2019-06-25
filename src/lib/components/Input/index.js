import React, { forwardRef, useContext } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { WRCThemeContext } from '../Theme';

const Input = forwardRef(({ className, invalid, ...inputProps }, ref) => {
  const { inputClassName } = (useContext(WRCThemeContext).theme.input || {});

  return(
    <input {...inputProps} className={classnames(inputClassName, className, {
      [`${inputClassName}--invalid`]: !!invalid,
      [`${className}--invalid`]: !!className && !!invalid,
    })} ref={ref} />
  );
});

Input.propTypes = {
  invalid: PropTypes.bool,
}


export default Input;
