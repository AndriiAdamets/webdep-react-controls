import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { PAGINATION_MAX_PAGES, PAGINATION_PAGE_SIZES } from '../../constants/pagination';
import { WRCThemeContext } from '../Theme';

import Header from './Header';
import Body from './Body';

const tableClassNames = [ 'tableClassName', 'theadClassName', 'tbodyClassName', 'thClassName', 'tdClassName', 'trClassName',];

function getClassName(context, props, key) {
  return props[key] !== undefined ? props[key] : context[key]
}

const Table = (props) => {

  const context = useContext(WRCThemeContext).theme.table || {};
  const classNames = tableClassNames.reduce((res, key) => {
    return {...res, [key]: getClassName(context, props, key)}
  }, {})

  return (
    <div>
      <table className={classNames.tableClassName}>
        <Header {...props} {...classNames} />
        <Body {...props} {...classNames} />
      </table>
    </div>
  );
};

Table.propTypes = {
  /** table tag className */
  tableClassName: PropTypes.string,
  /** thead tag className */
  theadClassName: PropTypes.string,
  /** tbody tag className */
  tbodyClassName: PropTypes.string,
  /** th tag className */
  thClassName: PropTypes.string,
  /** td tag className */
  tdClassName: PropTypes.string,
  /** tr tag className */
  trClassName: PropTypes.string,

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
  },
}

export default Table;