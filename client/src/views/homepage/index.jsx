import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import sdk from '../../services/api-sdk';

import './homepage.css';

const Homepage = () => {
    const [goals, setGoals] = useState(null);

    useEffect(() => {
        if (!goals) {
            sdk.goals.get({"include": "steps"}).then(setGoals);
        }
    });

    return (
        <>
            <h1>Homepage</h1>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
            >
                {goals?
                    <>
                        {goals.map(goal => {
                            const dueDate = new Date(goal.dueDate);
                            return (
                                <Paper className='next-step' elevation={6}>
                                    <h4>Name: {goal.name}</h4>
                                    <p>Status: {goal.completed? 'Completed' : 'Incomplete'}</p>
                                    <p>Due date: {dueDate.toLocaleDateString('en-il')}</p>
                                    <p>Description: {goal.description}</p>
                                    {goal.steps[0]? <p>First Step: {goal.steps[0].name}, {goal.steps[0].description}</p> : null}
                                </Paper>
                            );
                        })}
                        {!goals.length? <h2>No goals</h2> : null}
                    </>
                :
                    <CircularProgress/>
                }
            </Stack>
        </>
    );
};

export default Homepage;