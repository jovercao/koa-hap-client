# koa-hap-client

koa-hap-client is the ajax library for Hap protocol.
it's use with server-side [koa-hap](http://github.com/jovercao/koa-hap) as suite.
to build hap application as quickly.

## quick start

### install

```bash
npm install koa-hap-client

```

### use in browser

```js
// file: /api/hello.js

// Hap Service "hello" binding to url "/api/hello".
export async index({ name }) {
  return `Hello ${name}!`
}

```

```html
<!-- call the hap service, url: "/api/hello", params: { name: "World" }. -->
  <script src="node_modules/koa-hap-client/dist/hap.js"></script>
  <script>
    // create api caller.
    var api = hap('/api', {
      //...with axios options
    })

    api.hello({ name: 'World' }).then(function (result) {
      document.write(result); // Hello World!
    }).catch(function (err) {
      document.write(err);
    });

    //// and you can use default axios options aslo.
    ////hap.api.hello({ name: 'World' }).then((result)=> {
    ////  document.write(result);
    ////}).catch(function (err) {
    ////  document.write(err);
    ////});

  </script>
```

### use in node or webpack

```js
import hap from 'koa-hap-client';

const api = hap('/api', {});
async () => {
  let result = await api.hello({ name: 'World' });

  //// or with then default axios options
  //// result = hap.api.hello({ name: 'World' });
}
```

## examples
pls see [koa-hap-example](http://github.com/jovercao/koa-hap-example)


## doc

### with axios config

hap(baseUrl, config)

| param  | type| descript  |
|---|---|---|
| baseUrl  | string  | the hap service url |
| config | object | [axios request config](http://github.com/axios/axios#request-config) |

return hap with config.

### `.` operator

then `.` operator is auto transform member path to url like this:
```js

////hap.a.b.c.d.e({})
//// POST /a/b/c/d/e {}

const api = hap('/api', {})

api.example.hello({ name: "World" })
// POST /api/example/hello { "name": "World" }

```
