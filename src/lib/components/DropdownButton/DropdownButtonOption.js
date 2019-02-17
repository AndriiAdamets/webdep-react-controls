import React, { Component, createRef } from 'react';


export default class DropdownButtonOption extends Component {
  constructor(props) {
    super(props);
    this.dom = createRef();
  }
  handleClick = () => this.props.onSelect(this.props.value);
  handleMouseEnter = () => this.dom.current.classList.add('wrc-dropdown-button__option--focused');
  handleMouseLeave = () => this.dom.current.classList.remove('wrc-dropdown-button__option--focused');

  render() {
    const { children } = this.props;
    return (
      <li className="wrc-dropdown-button__option" ref={this.dom}
        onClick={this.handleClick} onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>{children}</li>
    );
  }
}
