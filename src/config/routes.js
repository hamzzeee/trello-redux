import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Tasks from './../components/Tasks';

function Routes(props) {
    return(
        <Router>
            <div className="rootDiv">
                <Route exact path="/" render={() => (<Redirect to="/tasks" />)} />
                <Route exact path="/tasks" component={Tasks} />
            </div>
        </Router>
    );
}

export default Routes;