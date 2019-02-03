import React from 'react';
import PropTypes from 'prop-types';
const CardHeader = (props) => (
  <div {...props} />
);

CardHeader.propTypes = {
  /* Card header class */
  className: PropTypes.string,
  /* Card header content */
  children: PropTypes.any,
};

CardHeader.defaultProps = {
  className: 'wrc-card__header',
};

export default CardHeader;