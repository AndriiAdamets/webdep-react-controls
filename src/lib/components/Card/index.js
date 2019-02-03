import React from 'react';
import PropTypes from 'prop-types';

import CardHeader from './CardHeader';
import CardTitle from './CardTitle';
import CardBody from './CardBody';

const Card = (props) => (
  <section {...props} />
);

Card.propTypes = {
  /** card class */
  className: PropTypes.string,
}

Card.defaultProps = {
  className: 'wrc-card',
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;

export default Card;