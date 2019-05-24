import React, { Component } from 'react';
import Button from '../Button';
import { WRCThemeContext } from '../Theme';

class SortingButton extends Component {
  static contextType = WRCThemeContext;

  handleClick = () => {
    const { column, sorting, onSortChange, } = this.props;
    let direction = 'desc';
    if(column.accessor === sorting.column) {
      direction = sorting.direction === 'desc' ? 'asc' : 'desc';
    }
    onSortChange(column.accessor, direction);
  }

  get content() {
    const { column, sorting } = this.props;
    const noDirectionButtonContent = this.props.noDirectionButtonContent || this.context.theme.table.noDirectionButtonContent;
    const ascButtonContent = this.props.ascButtonContent || this.context.theme.table.ascButtonContent;
    const descButtonContent = this.props.descButtonContent || this.context.theme.table.descButtonContent;
    if(!column.sortable) {
      return null;
    }
    if(sorting.column !== column.accessor) {
      return noDirectionButtonContent;
    }
    return sorting.direction === 'asc' ? ascButtonContent : descButtonContent;
  }

  render() {
    return (
      <Button state="link" className="wrc-table__sort-indicator" onClick={this.handleClick}>
        { this.content }
      </Button>
    );
  }
}


export default SortingButton;