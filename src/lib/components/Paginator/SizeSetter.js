import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';

class SizeSetter extends Component {
  static propTypes = {
    selectLabel: PropTypes.string,
    onChange: PropTypes.func,
    sizes: PropTypes.arrayOf(PropTypes.number),
    size: PropTypes.number,
  }

  handleChange = ({target}) => {
    if(!!this.props.onChange) {
      this.props.onChange({size: Number(target.value), page: 1,});
    }
  }
  render() {
    const { sizes, size, selectLabel } = this.props;
    return (
      <div className="wrc-paginator__page-size-setter-container">
        <Select options={sizes} value={size}  onChange={this.handleChange}
          triggerClassName="wrc-paginator__page-size-setter"/>
        <div className="wrc-paginator__page-size-label">{selectLabel}</div>
      </div>
    )
  }
}

export default SizeSetter;