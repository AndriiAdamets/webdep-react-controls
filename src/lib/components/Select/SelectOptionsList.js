import React, { createRef } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import OptionsList from '../OptionsList';
import SelectOption from './SelectOption';

import getPortalContainer from '../../helpers/getPortalContainer';
import getElementCouplingPoint from '../../helpers/getElementCouplingPoint';

const closeSelectKeys = ['Escape'];

export default class SelectOptionsList extends OptionsList {

  constructor(props) {
    super(props);
    this.searchInput = createRef();
    this.state = {
      search: '',
      focusedIndex: 0,
      style: getElementCouplingPoint(props.anchor),
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('resize', this.handleResizeWindow);
    this.setState({ search: '', focusedIndex: 0, style: {...getElementCouplingPoint(this.props.anchor)}});
    if(!!this.searchInput.current) {
      this.searchInput.current.focus();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('resize', this.handleResizeWindow);
  }

  handleChangeSearch = ({target}) => this.setState({search: target.value});
  handleOptionFocus = (value) => {
    const { valueAccessor } = this.props;
    const focusedIndex = this.displayedOptions.findIndex(item => item[valueAccessor] == value);
    this.setState({ focusedIndex });
  };

  handleKeyDown = (e) => {
    const { focusedIndex } = this.state;
    const { valueAccessor, onSelect, enableSearch, onClose } = this.props;
    if(e.key === ' ' && !enableSearch || e.key === 'Enter') {
      e.preventDefault();
      onSelect(this.displayedOptions[focusedIndex][valueAccessor]);
    }else if(e.key === 'ArrowDown') {
      this.setState({focusedIndex: Math.min(focusedIndex + 1, this.displayedOptions.length - 1)});
    } else if(e.key === 'ArrowUp') {
      this.setState({focusedIndex: Math.max(focusedIndex - 1, 0)});
    } else if (closeSelectKeys.indexOf(e.key) > -1) {
      onClose(true);
    }
  }

  handleResizeWindow = () => {
    const { anchor } = this.props;
    this.setState({style: getElementCouplingPoint(anchor)});
  }

  get displayedOptions() {
    const { options, searchFn } = this.props;
    const { search } = this.state;
    if(!search) {
      return options;
    }
    return options.filter(option => searchFn(search, option, this.props));
  }

  render() {
    const { enableSearch, optionNameFn, className, valueAccessor, nameAccessor, value, onSelect, } = this.props;
    const { focusedIndex, style } = this.state;
    console.log({style});
    return createPortal((
      <div style={style}  ref={this.container}
        className={classnames('options wrc-select__options', className)}>
        {!!enableSearch && (
          <Input ref={this.searchInput} value={this.state.search} onChange={this.handleChangeSearch} />
        )}
        <ul className="options__list wrc-select__options-list" ref={this.list}>
          {this.displayedOptions.map((option, index) => (
            <SelectOption key={option[valueAccessor]} value={option[valueAccessor]}
              focused={index === focusedIndex} selected={option[valueAccessor] == value}
              onFocus={this.handleOptionFocus} onSelect={onSelect}>
              {optionNameFn ? optionNameFn(option) : option[nameAccessor]}
            </SelectOption>
          ))}
        </ul>
      </div>
    ), getPortalContainer());
  }
}