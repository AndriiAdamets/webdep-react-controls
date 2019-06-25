import React, { forwardRef } from 'react';
import classnames from 'classnames';
const Cell = (props, ref) => {
  const { column, item, className, children, tdClassName } = props;
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
    <td className={classnames(tdClassName, className)} style={style} ref={ref}>
      {content}
    </td>
  )
};

export default forwardRef(Cell);