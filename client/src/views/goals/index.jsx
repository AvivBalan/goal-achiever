import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GoalList from './list';
import Goal from './goal';

const Goals = (props) => (
    <Switch>
        <Route path={`${props.match.path}/:goalId`} exact component={Goal}/>
        <Route path="" exact component={GoalList}/>    
    </Switch>
);

export default Goals;