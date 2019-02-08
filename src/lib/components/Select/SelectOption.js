import React, { Component } from 'react';
import classnames from 'classnames';

export default class SelectOption extends Component {
  handleClick = () => this.props.onSelect(this.props.value);
  handleMouseEnter = () => this.props.onFocus(this.props.value);

  render() {
    const { children, focused, selected, } = this.props;
    return (
      <li className={classnames('wrc-select__option', {
        'wrc-select__option--focused': focused,
        'wrc-select__option--selected': selected,
      })} onClick={this.handleClick} onMouseEnter={this.handleMouseEnter}>{children}</li>
    );
  }
}
