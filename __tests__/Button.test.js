import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../src/lib';

test('Button', () => {
  const component = renderer.create(
    <Button>Button</Button>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});