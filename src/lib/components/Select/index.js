import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Input from '../Input';
import SelectOptionsList from './SelectOptionsList';
import SelectOption from './SelectOption';

import getElementCouplingPoint from '../../helpers/getElementCouplingPoint';

const openSelectKeys = [' ', 'ArrowUp', 'ArrowDown'];
const closeSelectKeys = ['Escape'];
const scrollButtons = [' ', 'ArrowUp', 'ArrowDown'];
const selectItemKeys = [' ', 'Enter'];

export default class Select extends Component {
  // TODO: Add search
  // TODO: Add tests
  static propTypes = {
    options: PropTypes.array,
    enableSearch: PropTypes.bool,
    optionNameFn: PropTypes.func,
    nameAccessor: PropTypes.string,
    valueAccessor: PropTypes.string,
    triggerClassName: PropTypes.string,
    optionsListClassName: PropTypes.string,
  };

  static defaultProps = {
    nameAccessor: 'name',
    valueAccessor: 'id',
    optionsListClassName: 'wrc-select__options-list'
  };

  state = {
    isOptionsVisible: false,
    search: '',
  };

  constructor(props) {
    super(props);
    this.trigger = createRef();
    this.optionsList = createRef();
    this.control = createRef();
    this.searchInput = createRef();
  };

  get isOptionObject() {
    const { options } = this.props;
    if (!options.length) {
      return false;
    }
    return ['string', 'number'].indexOf(typeof options[0]) === -1;
  };

  open = () => {
    this.setState({ isOptionsVisible: true, focusedIndex: 0, search: '' }, () => {
      if(!!this.props.enableSearch) {
        this.searchInput.current.focus();
      }
    });
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleKeyDownClosed);
    document.addEventListener('keydown', this.hendleKeyDownOpened);
    document.addEventListener('click', this.handleDocumentClick);
  };

  close = () => {
    document.removeEventListener('keydown', this.hendleKeyDownOpened);
    document.removeEventListener('click', this.handleDocumentClick);
    this.setState({ isOptionsVisible: false });
  };

  handleDocumentClick = (e) => {
    if(e.target !== this.searchInput.current) {
      document.removeEventListener('click', this.handleDocumentClick);
      this.close();
    }
  }

  handleOptionFocus = (value) => {
    const { valueAccessor } = this.props;
    const focusedIndex = this.displayedOptions.findIndex(item => item[valueAccessor] == value);
    this.setState({ focusedIndex });
  };

  handleSelectOption = (value) => {
    let event = new Event('select', { bubbles: true});
    event.simulated = true;
    this.control.current.value = value;
    this.control.current.dispatchEvent(event);
    this.close();
    this.trigger.current.focus();
    if(!!this.props.onChange) {
      this.props.onChange(event);
    }
  };

  handleKeyDownClosed = (e) => {
    if(scrollButtons.indexOf(e.key) > -1) {
      e.preventDefault();
    }
    if (openSelectKeys.indexOf(e.key) > -1) {
      this.open();
    }
  };

  hendleKeyDownOpened = (e) => {
    if(scrollButtons.indexOf(e.key) > -1) {
      e.preventDefault();
    }
    const { focusedIndex, } = this.state;
    const { valueAccessor } = this.props;
    if(e.key === 'ArrowDown') {
      this.setState({focusedIndex: Math.min(focusedIndex + 1, this.displayedOptions.length - 1)});
    } else if(e.key === 'ArrowUp') {
      this.setState({focusedIndex: Math.max(focusedIndex - 1, 0)});
    } else if(closeSelectKeys.indexOf(e.key) > -1) {
      this.close();
      this.trigger.current.focus();
      document.addEventListener('keydown', this.handleKeyDownClosed);
    } else if (selectItemKeys.indexOf(e.key) > -1) {
      this.handleSelectOption(this.displayedOptions[focusedIndex][valueAccessor]);
      this.close();
      this.trigger.current.focus();
      document.addEventListener('keydown', this.handleKeyDownClosed);
    }
  };

  handleFocus = (e) => {
    document.addEventListener('keydown', this.handleKeyDownClosed);
  };

  handleBlur = (e) => {
    document.removeEventListener('keydown', this.handleKeyDownOpened);
    document.removeEventListener('keydown', this.handleKeyDownClosed);
  }

  handleTriggerClick = (e) => {
    e.preventDefault();
    this.open();
  }

  handleChangeSearch = ({target}) => this.setState({ search: target.value, })

  get options() {
    if(this.isOptionObject) {
      return this.props.options;
    }
    const { nameAccessor, valueAccessor } = this.props;
    return this.props.options.map(option => {
      return {
        [nameAccessor]: option,
        [valueAccessor]: option,
      };
    });
  };

  get displayedOptions() {
    const { nameAccessor, optionNameFn } = this.props;
    const { search } = this.state;
    if(!search) {
      return this.options;
    }
    const reg = RegExp(`(^${search})|\\s(${search})`);
    if(!!optionNameFn) {
      return this.options.filter(option => {
        const name = optionNameFn(option);
        return reg.test(name.toLowerCase());
      });
    }
    return this.options.filter(option => reg.test(option[nameAccessor].toLowerCase()));
  };

  get value() {
    return this.control.current ? this.control.current.value : this.props.value;
  };

  get selectedOptionName() {
    const { nameAccessor, valueAccessor, options, optionNameFn } = this.props;
    if(!this.isOptionObject) {
      return this.value || ' ';
    }
    const optionIndex = options.findIndex(option => option[valueAccessor] == this.value);
    if(optionIndex === -1) {
      return ' ';
    }
    if(!!optionNameFn) {
      return optionNameFn(options[optionIndex]);
    }
    return options[optionIndex][nameAccessor];
  };

  get triggerContent() {
    if(this.value === undefined || this.value === '') {
      return (
        <div className="wrc-select__placeholder">{this.props.placeholder}</div>
      );
    }
    return (
      <div className="wrc-select__value">
        {this.selectedOptionName}
      </div>
    );
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDownOpened);
    document.removeEventListener('keydown', this.handleKeyDownClosed);
    document.removeEventListener('click', this.handleDocumentClick);
  };

  render() {
    const { nameAccessor, valueAccessor, value, enableSearch, triggerClassName, optionNameFn } = this.props;
    const { isOptionsVisible, focusedIndex, search } = this.state;
    return (
      <div className="wrc-select">
        <div className={classnames('wrc-select__trigger', triggerClassName)}
          tabIndex={0} ref={this.trigger} onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.handleTriggerClick} >
          {this.triggerContent}
          <div className="wrc-select__caret"></div>
        </div>
        {!!isOptionsVisible && (
          <SelectOptionsList style={{...getElementCouplingPoint(this.trigger.current)}} ref={this.optionsList}>
            {!!enableSearch && (
              <Input ref={this.searchInput} value={search} onChange={this.handleChangeSearch} />
            )}
            {this.displayedOptions.map((option, index) => (
              <SelectOption key={option[valueAccessor]} value={option[valueAccessor]}
                focused={index === focusedIndex} selected={option[valueAccessor] == value}
                onFocus={this.handleOptionFocus} onSelect={this.handleSelectOption}>
                {optionNameFn ? optionNameFn(option) : option[nameAccessor]}
              </SelectOption>
            ))}
          </SelectOptionsList>
        )}
        <select className="wrc-select__control" value={value} onChange={() =>{}} ref={this.control}>
          <option key="empty-item"></option>
          {this.options.map(option => (
            <option key={option[valueAccessor]} value={option[valueAccessor]}>
              {option[nameAccessor] || option[valueAccessor]}
            </option>
          ))}
        </select>
      </div>
    );
  };
}