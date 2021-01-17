import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../screens/HomePage';
import NotFound from '../screens/NotFound'



const BaseRouter = () => (
    <React.Fragment>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route component={NotFound} />
        </Switch>

    </React.Fragment>
)
export default BaseRouter;