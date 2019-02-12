import React from 'react';
import PropTypes from 'prop-types';

import PaginationInfo from './PaginationInfo';
import SizeSetter from './SizeSetter';
import NavButtons from './NavButtons';

const Paginator = (props) => {
  if (props.total < props.sizes[0]) {
    return null;
  }
  const Info = props.pageInfoComponent;
  return (
    <div className="wrc-paginator">
      <div className="wrc-paginator__page-info">
        {!!props.showPaginationInfo && (
          <Info {...props} />
        )}
        <SizeSetter {...props} />
      </div>
      <nav role="navigation">
        <NavButtons {...props} />
      </nav>
    </div>
  )
};

Paginator.propTypes = {
  showSideButtons: PropTypes.bool,
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  showPaginationInfo: PropTypes.bool,
  onChange: PropTypes.func,
  startButtonContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  endButtonContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  pageInfoComponent: PropTypes.func,
};

Paginator.defaultProps = {
  showPaginationInfo: true,
  showSideButtons: true,
  startButtonContent: <span>&laquo;</span>,
  endButtonContent: <span>&raquo;</span>,
  selectLabel: 'entries per page',
  pageInfoComponent: PaginationInfo,
}

export default Paginator;