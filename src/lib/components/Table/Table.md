```js
<Table
  config={[{title:'First Name', accessor: 'first_name'}, {title: 'Last Name', accessor: 'last_name', style: {width: '100px'}, componentFn: ({item}) => (<div><b>Last Name: </b>{item.last_name}</div>)}]}
  data={[{first_name: 'John', last_name: 'Week'}, {first_name: 'Anton', last_name: 'Baton'}]} rowClassFn={(item => item.last_name === 'Week' ? 'week' : 'nock')} />
```

Sortable Column
```js
<Table
  config={[{title:'First Name', accessor: 'first_name', sortable: true, filterComponentFn: ()=> (<Input />) }, {title: 'Last Name', accessor: 'last_name', style: {width: '100px'}, componentFn: ({item}) => (<div><b>Last Name: </b>{item.last_name}</div>)}]}
  data={[{first_name: 'John', last_name: 'Week'}, {first_name: 'Anton', last_name: 'Baton'}]} rowClassFn={(item => item.last_name === 'Week' ? 'week' : 'nock')} sorting={{column: 'first_name', direction: 'desc'}} />
```