import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Cell from './Cell';
// import { config } from 'rx';
export default class Row extends Component {
  handleClick = (e) => {
    this.props.onClick(this.props.item);
  }
  render() {
    const { item, config, onClick, className } = this.props;
    return (
      <tr className={classnames('wrc-table__row', className)}
        onClick={!!onClick ? this.props.handleClick : undefined}>
        {config.map(colConfig => (
          <Cell item={item} column={colConfig} key={colConfig.accessor || colConfig.title} />
        ))}
      </tr>
    )
  }
}