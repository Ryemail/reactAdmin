import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './layout/';

import Login from './pages/login/';

const router = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login}></Route>
        </Switch>
    </HashRouter>
);
export default router;