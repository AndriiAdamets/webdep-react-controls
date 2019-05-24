import React from 'react';
import PropTypes from 'prop-types';

import SortButton from './SortButton';
const TableHeader = (props) => (
  <thead className="wrc-table__header">
    <tr>
      {props.config.map((column) => (
        <th className="wrc-table__cell wrc-table__cell--header" key={column.accessor || column.title}>
          {column.title}
          {!!column.sortable && (<SortButton {...props} column={column} />)}
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
