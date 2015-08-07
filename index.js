/// <reference path="typings/typings.d.ts" />
var r = require('ramda');
exports.subRoutes = function (routes) {
    var makeRoute = function (key) {
        return key[0] === '/'
            ? key
            : key !== '_methods'
                ? routes[0] + '/' + key
                : routes[0];
    };
    return r.is(Array, routes[1])
        ? { route: routes[0],
            methods: routes[1] }
        : r.pipe(r.toPairs, r.map(function (pair) { return [makeRoute(pair[0]), pair[1]]; }), r.map(exports.subRoutes))(routes[1]);
};
exports.flattenAltRoute = r.pipe(r.toPairs, r.reduce(function (acc, pairs) { return acc.concat(exports.subRoutes(pairs)); }, []));
exports.flattenRoute = function (routeDefinition) {
    return r.has('route', routeDefinition) && r.has('methods', routeDefinition)
        ? [routeDefinition]
        : exports.flattenAltRoute(routeDefinition);
};
//# sourceMappingURL=index.js.map