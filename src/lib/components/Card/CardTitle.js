import React from 'react';
import PropTypes from 'prop-types';
const CardTitle = (props) => (
  <h3 {...props} />
);

CardTitle.propTypes = {
  /* Card title class */
  className: PropTypes.string,
  /* Card title content */
  children: PropTypes.any,
}

CardTitle.defaultProps = {
  className: 'wrc-card__title',
};

export default CardTitle;