import React from 'react';
import renderer from 'react-test-renderer';
import { Table } from '../src/lib';

const config = [
  {title:'First Name', accessor: 'first_name'},
  {title: 'Last Name', accessor: 'last_name', componentFn: ({item}) => (<div><b>Last Name: </b>{item.last_name}</div>)}
];

const data = [
  {first_name: 'John', last_name: 'Week'},
  {first_name: 'Anton', last_name: 'Baton'},
];

test('Table with componentFn', () => {
  const component = renderer.create(
    <Table config={config} data={data} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});