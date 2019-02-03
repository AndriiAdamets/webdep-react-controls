import React from 'react';
import renderer from 'react-test-renderer';
import { Card } from '../src/lib';

test('Panel', () => {
  const component = renderer.create(
    <Card>
      <Card.Header>
        <Card.Title>
          Card Title
        </Card.Title>
      </Card.Header>
      <Card.Body>
        Card Body
      </Card.Body>
    </Card>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});