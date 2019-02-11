import React from 'react';
import PropTypes from 'prop-types';
const TableHeader = ({config}) => (
  <thead className="wrc-table__header">
    <tr>
      {config.map(({accessor, title}) => (
        <th className="wrc-table__cell wrc-table__cell--header" key={accessor || title}>
          {title}
        </th>
      ))}
    </tr>
  </thead>
);

TableHeader.propTypes = {
  config: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    accessor: PropTypes.string,
  })),
}

export default TableHeader;