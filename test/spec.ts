import {flattenRoute} from '../index'
import assert = require('assert')

enum method { get, post }

describe('route-methods', () => {

    const normalRoute = {
        route: '/yep/its/normal/:id',
        methods: [
            [ method.get,   'OK' ]
            [ method.post,  'Posted' ]]
    }


    it('returns pre formatted routes', () => {
        assert.deepEqual(flattenRoute(normalRoute), [normalRoute])
    })

    const simpleRoute = {
        '/dogs': [[
            method.get, 'many dogs' ]],
    }

    it('returns route with alt route', () => {
        assert.deepEqual(flattenRoute(simpleRoute), [{
            route: '/dogs',
            methods: [[method.get, 'many dogs']] }])
    })

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

    it('can parse a complex route', () => {
        assert.deepEqual(flattenRoute(complexRoute), [
            {route: '/cats', methods: [[method.get, 'all cats']]},
            {route: '/cats/mine', methods: [[ method.get, 'my cat', method.post, 'a new cat' ]]},
            {route: '/cats/:id', methods: [[ method.get, 'a special cat' ]]}
        ])
    })

    const newNestedRoute = {
        '/hamsters': {
            '/fish': [[
                method.post,    'hamsters bite' ]]
        }
    }

    it('will reset the route when a forward slash is in the first position', () => {
        assert.deepEqual(flattenRoute(newNestedRoute), [{
            route: '/fish',
            methods: [[ method.post, 'hamsters bite' ]]}])
    })

})