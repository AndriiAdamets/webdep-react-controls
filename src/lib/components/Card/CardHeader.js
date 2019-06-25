import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { WRCThemeContext } from '../Theme';

const CardHeader = (props) => {
  const context = useContext(WRCThemeContext).theme.card || {};
  const className = classnames(context.headerClassName, props.className);
  return (<div {...props} className={className} />);
};

CardHeader.propTypes = {
  /* Card header class */
  className: PropTypes.string,
  /* Card header content */
  children: PropTypes.any,
};


export default CardHeader;