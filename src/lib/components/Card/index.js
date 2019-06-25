import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { WRCThemeContext } from '../Theme';
import CardHeader from './CardHeader';
import CardTitle from './CardTitle';
import CardBody from './CardBody';

const Card = ({ className, ...props }) => {
  const context = useContext(WRCThemeContext).theme.card || {};
  const divClassName = classnames(context.className, className);
  return (
    <section {...props} className={divClassName} />
  );
};

Card.propTypes = {
  /** card class */
  className: PropTypes.string,
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;

export default Card;