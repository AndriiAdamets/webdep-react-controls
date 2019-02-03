import React from 'react';
import PropTypes from 'prop-types';

const CardBody = (props) => (
  <div {...props} />
);

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