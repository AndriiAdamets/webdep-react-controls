import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';

class PaginationButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    pageNum: PropTypes.number,
  }

  handleClick = () => {
    this.props.onClick(this.props.pageNum);
  }

  render() {
    const { current, pageNum, children } = this.props;
    return (
      <Button state="link" className={classnames('wrc-paginator__page-button', {
        'wrc-paginator__page-button--current': !!current
      })} disabled={current}>
        {children || pageNum}
      </Button>
    );
  };
}


const NavButtons = (props) => {
  const { page, size, total, maxPages, onChange, showSideButtons, startButtonContent, endButtonContent} = props;
  const pagesTotal = Math.ceil(total / size);
  if (pagesTotal <= 1) {
    return null;
  }
  let minPage = Math.max(page - Math.floor(maxPages / 2), 1);
  let maxPage = minPage + maxPages - 1;
  if (maxPage > pagesTotal) {
    maxPage = pagesTotal;
    minPage = Math.max(pagesTotal - maxPages, 1);
  }

  const buttons = Array.apply(null, { length: maxPage - minPage + 1 }).map((value, i) => {
    const index = minPage + i;

    return (
      <PaginationButton key={`pagination-button-${index}`}
        onClick={onChange} current={index === page} pageNum={index} />
    );
  });
  return (
    <Fragment>
      {!!showSideButtons && (
        <PaginationButton key={`pagination-button-first`}
          onClick={onChange} current={page === 1} pageNum={1}>
          {startButtonContent}
        </PaginationButton>
      )}
      {buttons}
      {!!showSideButtons && (
        <PaginationButton key={`pagination-button-last`}
          onClick={onChange} current={page === pagesTotal} pageNum={pagesTotal}>
          {endButtonContent}
        </PaginationButton>
      )}
    </Fragment>
  );
};

NavButtons.propTypes = {
  page: PropTypes.number,
  size: PropTypes.number,
  total: PropTypes.number,
  maxPages: PropTypes.number,
  onchange: PropTypes.func,
  url: PropTypes.string,
};

export default NavButtons;