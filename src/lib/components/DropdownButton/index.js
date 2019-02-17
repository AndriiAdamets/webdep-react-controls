import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import DropdownButtonOptionsList from './DropdownButtonOptionsList';
import DropdownButtonOption from './DropdownButtonOption';
import getElementCouplingPoint from '../../helpers/getElementCouplingPoint';

// Component for button which open dropdown by click
export default class DropdownButton extends Component {
  static propTypes = {
    buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]),
    options: PropTypes.array,
    optionNameFn: PropTypes.func,
    nameAccessor: PropTypes.string,
    valueAccessor: PropTypes.string,
  }

  static defaultProps = {
    nameAccessor: 'name',
    valueAccessor: 'id',
  };

  state = { isOpen: false };
    constructor(props) {
      super(props);
      this.button = createRef();
    }
  handleOpenDropdown = () => {
    this.setState({isOpen: true});
    document.addEventListener('click', this.handleCloseDropdown);
  }

  handleCloseDropdown = () => {
    this.setState({isOpen: false});
    document.removeEventListener('click', this.handleCloseDropdown);
  }
  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleCloseDropdown);
  }

  get isOptionObject() {
    const { options } = this.props;
    if (!options.length) {
      return false;
    }
    return ['string', 'number'].indexOf(typeof options[0]) === -1;
  };

  get options() {
    const { options, nameAccessor, valueAccessor } = this.props;
    if(!!this.isOptionObject) {
      return options;
    }
    return this.props.options.map(option => {
      return {
        [nameAccessor]: option,
        [valueAccessor]: option,
      };
    });
  }

  render() {
    const { buttonContent, options, optionNameFn, nameAccessor, valueAccessor, onSelect, ...btnProps } = this.props;
    const { isOpen } = this.state;
    return (
      <Button ref={this.button} {...btnProps} onClick={this.handleOpenDropdown}>
        {buttonContent}
        {!!isOpen && (
          <DropdownButtonOptionsList style={{...getElementCouplingPoint(this.button.current)}}>
            {this.options.map((option, index) => (
              <DropdownButtonOption key={option[valueAccessor]} value={option[valueAccessor]} onSelect={onSelect}>
                {optionNameFn ? optionNameFn(options[index]) : option[nameAccessor]}
              </DropdownButtonOption>
            ))}
          </DropdownButtonOptionsList>
        )}
      </Button>
    );
  }
}