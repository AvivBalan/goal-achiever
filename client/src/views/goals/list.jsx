import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import sdk from '../../services/api-sdk';
import './goals.css';

const GoalList = (props) => {
    const [goals, setGoals] = useState(null);

    useEffect(() => {
        if (!goals) {
            sdk.goals.get().then(setGoals);
        }
    });

    return (
        <>
            <h1>Goal List</h1>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="strech"
                spacing={4}
            >
                {goals?
                    <>
                        {goals.map(goal => {
                            const dueDate = new Date(goal.dueDate);
                            return (
                                <Card className='goal-item'>
                                    <h4>Name: {goal.name}</h4>
                                    <p>Status: {goal.completed? 'Completed' : 'Incomplete'}</p>
                                    <p>Due date: {dueDate.toLocaleDateString('en-il')}</p>
                                    <p>Description: {goal.description}</p>
                                    <Link to={`${props.match.path}/${goal.id}`}>
                                        <Button variant="contained">View</Button>
                                    </Link>
                                </Card>
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

export default GoalList;