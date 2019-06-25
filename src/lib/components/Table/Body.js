import React from 'react';
import Row from './Row';

const Body = ({tbodyClassName, data, ...otherProps}) => (
  <tbody className={tbodyClassName}>
    {data.map((item, index) => (
      <Row item={item} key={index} {...otherProps} />
    ))}
  </tbody>
);

export default Body;