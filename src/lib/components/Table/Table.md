```js
<Table
  config={[{title:'First Name', accessor: 'first_name'}, {title: 'Last Name', accessor: 'last_name', componentFn: ({item}) => (<div><b>Last Name: </b>{item.last_name}</div>)}]}
  data={[{first_name: 'John', last_name: 'Week'}, {first_name: 'Anton', last_name: 'Baton'}]} />
```