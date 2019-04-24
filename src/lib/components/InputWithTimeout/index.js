import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';

// import DefaultInput from './DefaultInput';

/**
 * InputWithTimeout component uses for calling onChange after some pouse (
 * like input with autocomplete. It will not send ajax request on server
 * everytime, when user enter symbol)
 */
export default class InputWithTimeout extends Component {
  static propTypes = {
    /** Count of miliseconds, which delay onChange functionrun */
    timeout: PropTypes.number,
    /** Function, which run after some timeout */
    onChange: PropTypes.func,
  };

  static defaultProps = {
    timeout: 0,
  }

  state = {
    value: '',
  };

  constructor(props) {
    super(props);
    this.input = createRef();
  }

  handleChange = (e) => {
    const { timeout, onChange } = this.props;
    this.setState({ value: e.target.value });
    if(!!this.timeout) {
      clearTimeout(this.timeout);
    }

    e.persist();
    this.timeout = setTimeout(() => {
      if(!!onChange) {
        onChange(e.target.value);
      }
    }, timeout);
  }

  render() {
    const { value } = this.state;
    return (
      <Input onChange={this.handleChange} value={value} />
    );
  }
}
