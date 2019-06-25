```js
<WRCThemeProvider theme={{table: {
    ascButtonContent: '↑',
    descButtonContent: '↓',
    noDirectionButtonContent: '↕',
    tableClassName: 'table themed-table'
    }, button: {buttonClassName: 'btn', sizeLabels: {small: 'sm', medium: 'md', large: 'lg',}},
  }}>
  <Button>Hello</Button>
  <Button state="danger" outline={true}>Hello</Button>
  <Table
    config={[{title:'First Name', accessor: 'first_name', sortable: true,}, {title: 'Last Name', accessor: 'last_name', style: {width: '100px'}, componentFn: ({item}) => (<div><b>Last Name: </b>{item.last_name}</div>)}]}
    data={[{first_name: 'John', last_name: 'Week'}, {first_name: 'Anton', last_name: 'Baton'}]} rowClassFn={(item => item.last_name === 'Week' ? 'week' : 'nock')} sorting={{column: 'first_name', direction: 'desc'}} />
</WRCThemeProvider>
```