## Summary

`route-methods` creates a list of routes and their methods from a nested
structure. This makes it easier to create nested APIs.

`route-methods` was originally created to work with autoroute-base libraries
like `autoroute-express-promise`.

## Installation

Install with `npm`:

```
npm install --save route-methods
```

## Project Status

- Beta
- Active (August 10, 2015)

## Examples

```js
enum method { get, post }

const normalRoute = {
    route: '/yep/its/normal/:id',
    methods: [
        [ method.get,   'OK' ]
        [ method.post,  'Posted' ]]
}

flattenRoute(normalRoute) // => [normalRoute]

const simpleRoute = {
    '/dogs': [[
        method.get, 'many dogs' ]],
}

flattenRoute(simpleRoute)
// =>
// [{
//     route: '/dogs',
//     methods: [[method.get, 'many dogs']]
// }]

const complexRoute = {
    '/cats': {
        _methods: [[
            method.get,     'all cats' ]],
        mine: [[
            method.get,     'my cat',
            method.post,    'a new cat' ]],
        ':id': [[
            method.get,     'a special cat' ]]
}}

flattenRoute(complexRoute)
// =>
// [
//     {route: '/cats', methods: [[method.get, 'all cats']]},
//     {route: '/cats/mine', methods: [[ method.get, 'my cat', method.post, 'a new cat' ]]},
//     {route: '/cats/:id', methods: [[ method.get, 'a special cat' ]]}
// ]

const newNestedRoute = {
    '/hamsters': {
        '/fish': [[
            method.post,    'hamsters bite' ]]
    }
}

flattenRoute(newNestedRoute)
// =>
// [{
//    route: '/fish',
//    methods: [[ method.post, 'hamsters bite' ]]}])
// })
```

## API

```js
import {subRoutes, flattenAltRoute, flattenRoute} from 'route-methods'
```

where `RouteDefinition` is

```js
interface RouteDefinition<T, S> {
    /**
    * Route name, e.g., route: "/api/myroute/:id"
    */
    route: string
    /**
    * E.g., methods: [
    *   [method.get, req => myFunctionThatReturnsAPromiseGet(req.params["theIdName"])],
    *   [method.delete, req => myFunctionThatReturnsAPromiseDelete(req.params["theIdName"])]
    * ]
    */
    methods: [[T, S]]
}
```

**`subRoutes <T, S>(routes: [string, any]): RouteDefinition<T, S>[]`**

where `routes`

Tuple, [route, child routes and/or route methods]

**`flattenAltRoute <T, S>(nestedRoutes: any): RouteDefinition<T, S>[]`**

where `nestedRoutes` has the form seen the examples. Can be a mixture of the
different examples.

**`flattenRoute <T, S>(routeDefinition: any): RouteDefinition<T, S>[]`**

where `routeDefinition` can be the same argument in `flattenAltRoute` or the
`normalRoute` seen the examples.
