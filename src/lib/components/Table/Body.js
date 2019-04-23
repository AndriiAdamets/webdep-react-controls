import React from 'react';
import Row from './Row';

const Body = ({data, ...otherProps}) => (
  <tbody className="wrc-table__body">
    {data.map((item, index) => (
      <Row item={item} key={index} {...otherProps} />
    ))}
  </tbody>
);

export default Body;