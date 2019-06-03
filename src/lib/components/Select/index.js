import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Caret from '../Caret';
import SelectOptionsList from './SelectOptionsList';
import MultiselectValue from './multiselectValue';
import isChildOf from '../../helpers/isChildOf';

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
    multiple: PropTypes.bool,
  };

  static defaultProps = {
    nameAccessor: 'name',
    valueAccessor: 'id',
    multiple: false,
    options: [],
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
    if (!options || !options.length) {
      return false;
    }
    return ['string', 'number'].indexOf(typeof options[0]) === -1;
  };

  isValueSelected = (value) => {
    if(this.props.multiple) {
      return this.value.indexOf(value.toString()) > -1;
    }
    return this.value == value;
  }

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
    if(!isChildOf(e.target, this.optionsList.current.container.current)) {
      this.close();
    }
  }

  handleSelectOption = (value) => {
    let event = new Event('select', { bubbles: true});
    event.simulated = true;
    if(this.props.multiple) {
      const index = this.value.findIndex(v => v == value);
      let newValue;
      // Remove selected value from multiselect value if it already selected
      if(index > -1) {
        newValue = [].concat(
          this.value.slice(0, index),
          this.value.slice(index + 1)
        );
      } else {
        // Transform value to string because option
        newValue = [].concat(this.value, value.toString());
      }
      [].forEach.call(this.control.current.options, option => {
        option.selected = newValue.indexOf(option.value) > -1;
      });
    } else {
      this.control.current.value = value;
      this.close();
      this.trigger.current.focus();
    }
    this.control.current.dispatchEvent(event);
    if(!!this.props.onChange) {
      this.props.onChange(event, this.value);
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
    if(!!this.control.current) {
      if(this.props.multiple) {
        return [].filter.call(this.control.current.options, ({selected}) => !!selected)
          .map(({value}) => value);
      }
      return this.control.current.value || this.props.value;
    }
    return this.props.value;
  };

  get triggerContent() {
    const { valueAccessor, nameAccessor, multiple, optionNameFn } = this.props;
    if(this.value === undefined || !(this.value + '').length) {
      return (
        <div className="wrc-select__placeholder">{this.props.placeholder}</div>
      );
    }
    if(multiple) {
      return (
        <div className="wrc-select__multiple-values">
          {this.value.map(val => {
            const option = this.options.filter(o => o[valueAccessor] == val)[0];
            return (
              <MultiselectValue option={option} nameAccessor={nameAccessor}
                optionNameFn={optionNameFn} key={option[valueAccessor]}
                valueAccessor={valueAccessor} onUnselect={this.handleSelectOption}
                />
            );
            })}
        </div>
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
    const { nameAccessor, valueAccessor, value, enableSearch, triggerClassName, optionNameFn, searchFn, multiple, } = this.props;
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
            isSelectedFn={this.isValueSelected}
            searchFn={searchFn}
            onClose={this.close}
            anchor={this.trigger.current}
            value={this.value}
            ref={this.optionsList} options={this.options} />
        )}
        <select className="wrc-select__control" value={value} multiple={multiple} onChange={() =>{}} ref={this.control}>
          <option key="empty-item"></option>
          {this.options.map(option => (
            <option key={option[valueAccessor]} value={option[valueAccessor]}>
              {optionNameFn ? optionNameFn(option) : option[nameAccessor] || option[valueAccessor]}
            </option>
          ))}
        </select>
      </div>
    );
  };
}