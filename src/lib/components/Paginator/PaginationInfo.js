import React from 'react';
import PropTypes from 'prop-types';
const PaginationInfo = ({page, size, total}) => {
  const firstRecord = (page - 1) * size + + 1;
  const lastRecord = Math.min(firstRecord + size - 1, total);
  return `${firstRecord} to ${lastRecord} of ${total}`;
}

PaginationInfo.propTypes = {
  page: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}

export default PaginationInfo;