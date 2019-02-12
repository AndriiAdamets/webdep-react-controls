import React from 'react';
import PropTypes from 'prop-types';

import NavButtons from './NavButtons';

const Paginator = (props) => (
  <div className="wrc-paginator">
    <div className="wrc-pagination__page-info">
    </div>
    <nav role="navigation">
      <NavButtons {...props} />
    </nav>
  </div>
);

Paginator.propTypes = {
  showSideButtons: PropTypes.bool,
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  startButtonContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  endButtonContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

Paginator.defaultProps = {
  showSideButtons: true,
  startButtonContent: <span>&laquo;</span>,
  endButtonContent: <span>&raquo;</span>
}

export default Paginator;