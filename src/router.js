import React, {PropTypes} from "react";
import {Router, Route, IndexRoute} from "dva/router";
import Home from "./routes/Home";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import Orders from './routes/Orders'
import CountOperation from './routes/CountOperation'

//
export default function ({history}) {
    return (
        <Router history={history}>
            <Route path="/" component={Home}>
                <IndexRoute component={CountOperation}/>
                <Route path="count" component={CountOperation} />
                <Route path="orders" component={Orders} />
            </Route>
            <Route path="/login" component={Login}/>
            <Route path="*" component={NotFound}/>
        </Router>
    )
}
