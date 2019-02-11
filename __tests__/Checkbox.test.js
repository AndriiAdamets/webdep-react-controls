import React from 'react';
import renderer from 'react-test-renderer';
import { Checkbox } from '../src/lib';

test('Checkbox', () => {
  const component = renderer.create(
    <Checkbox label="Checkbox" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});