import React, { forwardRef } from 'react';
import classnames from 'classnames';
const Cell = (props, ref) => {
  const { column, item, className, children } = props;
  const { componentFn, accessor, style } = column;
  let content;
  if (!!children) {
    content = children;
  } else if (!!componentFn) {
    content = componentFn(props);
  } else {
    content = item[accessor];
  }
  return (
    <td className={classnames('wrc-table__cell', className)} ref={ref}>
      {content}
    </td>
  )
};

export default forwardRef(Cell);