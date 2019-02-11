import React from 'react';
import Row from './Row';

const Body = ({config, data}) => (
  <tbody className="wrc-table__body">
    {data.map((item, index) => (
      <Row item={item} config={config} key={index} />
    ))}
  </tbody>
);

export default Body;