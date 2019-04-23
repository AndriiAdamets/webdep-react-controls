import React from 'react';
import PropTypes from 'prop-types';
import { PAGINATION_MAX_PAGES, PAGINATION_PAGE_SIZES } from '../../constants/pagination';

import Header from './Header';
import Body from './Body';
const Table = (props) => {
  return (
    <div className="wrc-table">
      <table className="wrc-table__table wrc-table">
        <Header config={props.config} />
        <Body {...props} />
      </table>
    </div>
  );
};

Table.propTypes = {
  /** Table columns description */
  config: PropTypes.arrayOf(PropTypes.shape({
    /** Key of item object, with should display in cell */
    accessor: PropTypes.string,
    /** Column header */
    title: PropTypes.string,
    /** Will add sorting botton if sortable is true */
    sortable: PropTypes.bool,
    /** Function, which get item, config as argument and return dom of cell */
    componentFn: PropTypes.func,
  })),
  /** If you want to hide some columns, you shold send array of visible columns accessors */
  visibleColumns: PropTypes.arrayOf(PropTypes.string),
  /** Function, which return addon class name for row and get item object as argument */
  rowClassFn: PropTypes.func,
  /** Table pagination information */
  pagination: PropTypes.shape({
    /** Number of current page */
    page: PropTypes.number,
    /** Items count on page */
    perPage: PropTypes.number,
    /** Items total count */
    total: PropTypes.number,
    /** Array of page sizes */
    pageSizes: PropTypes.arrayOf(PropTypes.number),
  }),
  /** Table data */
  data:PropTypes.arrayOf(PropTypes.object),
};

Table.defaultProps = {
  config: [],
  data: [],
  pagination: {
    page: 1,
    perPage: PAGINATION_PAGE_SIZES[0],
    total: 0,
    pageSizes: PAGINATION_PAGE_SIZES,
  }
}

export default Table;