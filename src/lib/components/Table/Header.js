import React from 'react';
import PropTypes from 'prop-types';
import SortButton from './SortButton';

const TableHeader = ({ theadClassName, thClassName, ...props}) => (
  <thead className={theadClassName}>
    <tr>
      {props.config.map((column) => (
        <th className={thClassName} key={column.accessor || column.title}>
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
