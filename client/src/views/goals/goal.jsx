import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import sdk from '../../services/api-sdk';
import CardContent from '@mui/material/CardContent';

const Goal = props => {
    const [goal, setGoal] = useState(null);

    useEffect(() => {
        if (!goal) {
            sdk.goals.getById(props.match.params.goalId, {include: 'steps'}).then(setGoal);
        }
    });
    return (
        <>
        <h1>Goal</h1>
        <Card className='goal-card'>
            {goal? 
                <CardContent>
                    <h2>Name: {goal.name}</h2>
                    <p>Status: {goal.completed? 'Completed' : 'Incomplete'}</p>
                    <p>Due date: {new Date(goal.dueDate).toLocaleDateString('en-il')}</p>
                    <p>Description: {goal.description}</p>
                </CardContent>
            :
                <CircularProgress/>
            }
        </Card>
            {goal?
                <>
                    <h1>Steps</h1>
                    {!goal.steps.length? <h3>No steps</h3>: null}
                    <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="strech"
                    spacing={2}
                    >
                        {goal.steps.map(step => (
                            <Card key={`step-${step.id}`}>
                                <h3>Name: {step.name}</h3>
                                <p>Status: {step.completed? 'Completed' : 'Incomplete'}</p>
                                <p>Due date: {new Date(step.dueDate).toLocaleDateString('en-il')}</p>
                                <p>Description: {step.description}</p>
                            </Card>
                        ))}
                    </Stack>
                </>
            : null}
        </>
    );
};

export default Goal;