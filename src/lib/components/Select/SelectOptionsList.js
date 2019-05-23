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
    const { options, value, valueAccessor, } = this.props;
    const focusedIndex = Math.max(options.findIndex(option => option[valueAccessor] == value), 0);
    document.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('resize', this.handleResizeWindow);

    this.setState({
      search: '',
      focusedIndex,
      style: {...getElementCouplingPoint(this.props.anchor)}
    }, this.scrollToFocusedOption);
    if(!!this.searchInput.current) {
      this.searchInput.current.focus();
    }
  }

  componentDidUpdate() {
    this.scrollToFocusedOption();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('resize', this.handleResizeWindow);
  }

  handleChangeSearch = ({target}) => this.setState({ search: target.value, focusedIndex: 0, });
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
      e.preventDefault();
      this.setState({focusedIndex: Math.min(focusedIndex + 1, this.displayedOptions.length - 1)});
    } else if(e.key === 'ArrowUp') {
      e.preventDefault();
      this.setState({focusedIndex: Math.max(focusedIndex - 1, 0)});
    } else if (closeSelectKeys.indexOf(e.key) > -1) {
      onClose(true);
    }
  }

  handleResizeWindow = () => {
    const { anchor } = this.props;
    this.setState({style: getElementCouplingPoint(anchor)});
  }

  scrollToFocusedOption() {
    const { focusedIndex } = this.state;
    const list = this.list.current;
    const focusedOption = list.children[focusedIndex];
    if(focusedOption.offsetTop < list.scrollTop) {
      list.scrollTo(0, focusedOption.offsetTop);
    } else if (focusedOption.offsetTop + focusedOption.offsetHeight > list.scrollTop + list.offsetHeight) {
      list.scrollTo(0, focusedOption.offsetTop + focusedOption.offsetHeight - list.offsetHeight);
    }
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