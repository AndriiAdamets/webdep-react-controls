Button Colors:

```js
<div>
  <Button>Default button</Button>
  <Button state="secondary">Secondary button</Button>
  <Button state="success">Success button</Button>
  <Button state="danger">Danger button</Button>
  <Button state="warning">Warning button</Button>
  <Button state="info">Info button</Button>
  <Button state="light">Light button</Button>
  <Button state="dark">Dark button</Button>
  <Button state="link">Like Link Button</Button>
</div>
```
Disabled Buttons:

```js
<div>
  <Button disabled>Default button</Button>
  <Button disabled state="secondary">Secondary button</Button>
  <Button disabled state="success">Success button</Button>
  <Button disabled state="danger">Danger button</Button>
  <Button disabled state="warning">Warning button</Button>
  <Button disabled state="info">Info button</Button>
  <Button disabled state="light">Light button</Button>
  <Button disabled state="dark">Dark button</Button>
  <Button disabled state="link">Disabled Like Link Button</Button>
</div>
```

Button sizes:

```js
<div>
  <Button size="small">Small button</Button>
  <Button>Default button</Button>
  <Button size="big">Big button</Button>
</div>
```

Links:

```js
  <div>
    <Button type="link" href="http://google.com">Default Link</Button>
    <Button type="link" href="http://google.com" state="secondary">Secondary Link</Button>
    <Button type="link" href="http://google.com" state="success">Success Link</Button>
    <Button type="link" href="http://google.com" state="danger">Danger Link</Button>
    <Button type="link" href="http://google.com" state="warning">Warning Link</Button>
    <Button type="link" href="http://google.com" state="info">Info Link</Button>
    <Button type="link" href="http://google.com" state="light">Light Link</Button>
    <Button type="link" href="http://google.com" state="dark">Dark Link</Button>
    <Button type="link" href="http://google.com" state="link">Like Link Link</Button>
  </div>
```

Button click handler:

```js
function handleClick() {
  alert('I am clicked!');
}
<div>
  <Button onClick={handleClick}>Click me</Button>
</div>
```