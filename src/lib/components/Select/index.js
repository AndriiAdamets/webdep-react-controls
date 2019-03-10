import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Caret from '../Caret';
import SelectOptionsList from './SelectOptionsList';

const openSelectKeys = [' ', 'ArrowUp', 'ArrowDown'];
const scrollButtons = [' ', 'ArrowUp', 'ArrowDown'];

export default class Select extends Component {
  // TODO: Add tests
  static propTypes = {
    /** Select options list */
    options: PropTypes.array,
    /** If it is true, then search input will be displayed */
    enableSearch: PropTypes.bool,
    /** Function to customize displaying select options in options list */
    optionNameFn: PropTypes.func,
    /** If don't use optionNameFn, nameAccessor shold be key of option Name */
    nameAccessor: PropTypes.string,
    /** Key, which contain value of option object */
    valueAccessor: PropTypes.string,
    /** Class name of div, which display select placeholder or selected value */
    triggerClassName: PropTypes.string,
    /** Class name of item in select options list */
    optionsListClassName: PropTypes.string,
    /** Function, which get search input value, current option and select props, which should return true if option satisfies the search conditions */
    searchFn: PropTypes.func,
  };

  static defaultProps = {
    nameAccessor: 'name',
    valueAccessor: 'id',
    optionsListClassName: 'wrc-select__options-list',
    searchFn: function(search, option, props) {
      const regexPart = search.toLowerCase();
      const reg = RegExp(`(^${regexPart})|\\s(${regexPart})`);
      const { optionNameFn, nameAccessor } = props;
      if(!!optionNameFn) {
        return reg.test(optionNameFn(option).toLowerCase());
      }
      return reg.test(option[nameAccessor].toLowerCase());
    }
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
    this.setState({ isOptionsVisible: true, });
    document.addEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleKeyDown);
  };

  close = (closedByKey) => {
    document.removeEventListener('click', this.handleDocumentClick);
    this.setState({ isOptionsVisible: false });
    if(closedByKey) {
      this.trigger.current.focus();
    }
  };

  handleDocumentClick = (e) => {
    if(e.target !== this.searchInput.current) {
      this.close();
    }
  }

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

  handleKeyDown = (e) => {
    if(scrollButtons.indexOf(e.key) > -1) {
      e.preventDefault();
    }
    if (openSelectKeys.indexOf(e.key) > -1) {
      this.open();
    }
  };

  handleFocus = (e) => {
    document.addEventListener('keydown', this.handleKeyDown);
  };

  handleBlur = (e) => {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleTriggerClick = (e) => {
    e.preventDefault();
    this.open();
  }

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

  get value() {
    return this.control.current ? this.control.current.value : this.props.value;
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
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleDocumentClick);
  };

  render() {
    const { nameAccessor, valueAccessor, value, enableSearch, triggerClassName, optionNameFn, searchFn } = this.props;
    const { isOptionsVisible,} = this.state;
    return (
      <div className="wrc-select">
        <div className={classnames('wrc-select__trigger', triggerClassName)}
          tabIndex={0} ref={this.trigger} onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.handleTriggerClick} >
          {this.triggerContent}
          <Caret />
        </div>
        {!!isOptionsVisible && (
          <SelectOptionsList {...this.props}
            onSelect={this.handleSelectOption}
            searchFn={searchFn}
            onClose={this.close}
            anchor={this.trigger.current}
            value={this.value}
            ref={this.optionsList} options={this.options} />
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