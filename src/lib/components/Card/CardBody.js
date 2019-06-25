import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { WRCThemeContext } from '../Theme';

const CardBody = (props) => {
  const context = useContext(WRCThemeContext).theme.card || {};
  const className = classnames(context.headerClassName, props.className);
  return ( <div {...props} className={className} />)};

CardBody.propTypes = {
  /* Card body class */
  className: PropTypes.string,
  /* Card body content */
  children: PropTypes.any,
};

CardBody.defaultProps = {
  className: 'wrc-card__body',
}

export default CardBody;