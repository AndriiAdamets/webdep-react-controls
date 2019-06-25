import React from 'react';
import classnames from 'classnames';
import Cell from './Cell';

const Row = ({item, config, onClick, className, rowClassFn, trClassName, tdClassName}) => {
  const rowAddonClass = rowClassFn ? rowClassFn(item) : null;
  const handleClick = onClick ? (e) => { onClick(this.props.item); } : undefined;
  return (
    <tr className={classnames(trClassName, className, rowAddonClass)}
      onClick={handleClick}>
      {config.map(colConfig => (
        <Cell item={item} column={colConfig} key={colConfig.accessor || colConfig.title} tdClassName={tdClassName} />
      ))}
    </tr>
  );
}

export default Row;