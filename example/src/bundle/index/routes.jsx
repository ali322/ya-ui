import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Index from './module/app.jsx'
import Example from '../example/app.jsx'

const routes = (
    <Route path="/">
        <IndexRoute component={Index} />
        <Route path="/example/:name" component={Example} />
    </Route>
)

export default routes
