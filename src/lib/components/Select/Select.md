Options as strings
```js
<Select placeholder="Some Placeholder" enableSearch={true} options={[
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Very very very very very very very very very very very very very very very very very very very very very very very very very very very very very Long name',
]} />
```
Options as objects
```js
<Select placeholder="Some Placeholder" options={[
  { id: 1, name: 'One', },
  { id: 2, name: 'Two', },
  { id: 3, name: 'Three', },
  { id: 4, name: 'Four', },
  { id: 5, name: 'Five', },
  { id: 6, name: 'Very very very very very very very very very very very very very very very very very very very very very very very very very very very very very Long name', }
]} />
```
Select with search
```js
<Select placeholder="Some Placeholder" enableSearch={true} options={[
  { id: 2, first_name: 'John', last_name: 'Week' },
  { id: 1, first_name: 'John', last_name: 'Smith' },
  { id: 3, first_name: 'Bruce', last_name: 'Wayne' },
  { id: 4, first_name: 'Clark', last_name: 'Kent' },
  { id: 5, first_name: 'Peter', last_name: 'Parker' },
  { id: 6, first_name: 'Antony', last_name: 'Stark' }
]} optionNameFn={(item => `${item.first_name} ${item.last_name}`)} />
```