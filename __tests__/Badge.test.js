import React from 'react';
import renderer from 'react-test-renderer';
import { Badge } from '../src/lib';

test('Badge', () => {
  const component = renderer.create(
    <Badge>Badge</Badge>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Badge like pill', () => {
  const component = renderer.create(
    <Badge likePill={true}>Badge like pill</Badge>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});