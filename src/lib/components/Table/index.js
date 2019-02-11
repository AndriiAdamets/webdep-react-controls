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
        <Body config={props.config} data={props.data} />
      </table>
    </div>
  );
};

Table.propTypes = {
  config: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.string,
    title: PropTypes.string,
    sortable: PropTypes.bool,
    componentFn: PropTypes.func,
  })),
  visibleColumns: PropTypes.arrayOf(PropTypes.string),
  pagination: PropTypes.shape({
    page: PropTypes.number,
    perPage: PropTypes.number,
    total: PropTypes.number,
    pageSizes: PropTypes.arrayOf(PropTypes.number),
    maxDisplayedPages: PropTypes.number,
  }),
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
    maxDisplayedPages: PAGINATION_MAX_PAGES,
  }
}

export default Table;