var index_1 = require('../index');
var assert = require('assert');
var method;
(function (method) {
    method[method["get"] = 0] = "get";
    method[method["post"] = 1] = "post";
})(method || (method = {}));
describe('route-methods', function () {
    var normalRoute = {
        route: '/yep/its/normal/:id',
        methods: [
            [method.get, 'OK'][method.post, 'Posted']]
    };
    it('returns pre formatted routes', function () {
        assert.deepEqual(index_1.flattenRoute(normalRoute), [normalRoute]);
    });
    var simpleRoute = {
        '/dogs': [[
                method.get, 'many dogs']],
    };
    it('returns route with alt route', function () {
        assert.deepEqual(index_1.flattenRoute(simpleRoute), [{
                route: '/dogs',
                methods: [[method.get, 'many dogs']] }]);
    });
    var complexRoute = {
        '/cats': {
            _methods: [[
                    method.get, 'all cats']],
            mine: [[
                    method.get, 'my cat',
                    method.post, 'a new cat']],
            ':id': [[
                    method.get, 'a special cat']]
        } };
    it('can parse a complex route', function () {
        assert.deepEqual(index_1.flattenRoute(complexRoute), [
            { route: '/cats', methods: [[method.get, 'all cats']] },
            { route: '/cats/mine', methods: [[method.get, 'my cat', method.post, 'a new cat']] },
            { route: '/cats/:id', methods: [[method.get, 'a special cat']] }
        ]);
    });
    var newNestedRoute = {
        '/hamsters': {
            '/fish': [[
                    method.post, 'hamsters bite']]
        }
    };
    it('will reset the route when a forward slash is in the first position', function () {
        assert.deepEqual(index_1.flattenRoute(newNestedRoute), [{
                route: '/fish',
                methods: [[method.post, 'hamsters bite']] }]);
    });
});
//# sourceMappingURL=spec.js.map