import React, { Component, createRef } from 'react';
import classnames from 'classnames';
export default class OptionsList extends Component {
  constructor(props) {
    super(props);
    this.container = createRef();
    this.list = createRef();
  }

  // componentDidMount() {
  //   const className = classnames('options-list--open', {
  //     [`${this.props.className}--open`]: !!this.props.className
  //   });
  //   this.container.classList.add(className);
  // }

  // handleClose = () => {
  //   this.container.classList.remove('options-list--open');
  //   if(!!this.props.className) {
  //     container.className.remove(`${this.props.className}--open`);
  //   }
  // }

  render() {
    const { children, className } = this.props;
    return (
      <div className="options" ref={this.container}>
        <ul className={classnames('options__list', className)} ref={this.list}>
          {children}
        </ul>
      </div>
    );
  }
}