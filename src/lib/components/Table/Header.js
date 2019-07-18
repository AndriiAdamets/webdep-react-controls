import React from 'react';
import PropTypes from 'prop-types';
import SortButton from './SortButton';

const TableHeader = ({ theadClassName, thClassName, ...props}) => {
  const hasFilters = !!props.config.filter(({filterComponentFn}) => !!filterComponentFn).length;
  return (
    <thead className={theadClassName}>
    {!!hasFilters && (
      <tr>
        {props.config.map(column => (
          <td key={column.accessor || column.title}>{column.filterComponentFn ? column.filterComponentFn(column) : null}</td>
        ))}
      </tr>
    )}
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
};

TableHeader.propTypes = {
  config: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    accessor: PropTypes.string,
  })),
}

export default TableHeader;
